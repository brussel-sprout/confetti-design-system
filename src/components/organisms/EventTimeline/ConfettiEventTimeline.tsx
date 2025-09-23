import React, { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { Clock, Cake, Plus, Trash2, Pencil, Calendar, Users, MapPin } from "lucide-react";
import { cn } from '../../../utils/cn'
import { Button } from '../../atoms/Button'
import { Card } from '../../molecules/Card'
import { SearchInput } from '../../atoms/SearchInput'
import { Select } from '../../atoms/Select'

import type { TimelineEvent } from '../../molecules/TimelineItem'

// Utility functions
function addMin(d: Date, m: number) { 
  const x = new Date(d); 
  x.setMinutes(x.getMinutes() + m); 
  return x; 
}

function minutesBetween(a: Date, b: Date) { 
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000)); 
}

function clamp(n: number, lo: number, hi: number) { 
  return Math.max(lo, Math.min(hi, n)); 
}

// Constants
const MAX_EVENTS = 200;
const AXIS_WIDTH = 72;
const TRACK_GAP_X = 10;

// Interfaces
interface PlacedEvent { 
  ev: TimelineEvent; 
  top: number; 
  height: number; 
  col: number; 
  colsInCluster: number; 
}

export interface EventTimelineProps {
  events: TimelineEvent[]
  onAddEvent?: () => void
  onEditEvent?: (event: TimelineEvent) => void
  onDeleteEvent?: (eventId: string) => void
  onStatusChange?: (eventId: string, status: TimelineEvent['status']) => void
  title?: string
  subtitle?: string
  dayStart?: Date
  dayEnd?: Date
  showFilters?: boolean
  showSearch?: boolean
  showAddButton?: boolean
  className?: string
}

export interface TimeFilter {
  category?: 'all' | 'setup' | 'activity' | 'meal' | 'entertainment' | 'cleanup' | 'other'
  status?: 'all' | 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority?: 'all' | 'low' | 'medium' | 'high' | 'critical'
}

// Layout algorithm for overlapping events
function layoutEvents(
  events: TimelineEvent[],
  opts: { dayStart: Date; dayEnd: Date; minutesPerPx: number; trackWidth: number }
): { placed: PlacedEvent[]; milestones: TimelineEvent[] } {
  const durations = events.filter(e => e.type === "duration" && e.end) as TimelineEvent[];
  const milestones = events.filter(e => e.type === "milestone");
  const sorted = [...durations].sort((a, b) => 
    a.start.getTime() - b.start.getTime() || 
    (b.end!.getTime() - b.start.getTime()) - (a.end!.getTime() - a.start.getTime())
  );
  
  type Col = { endTime: number };
  let columns: Col[] = [];
  const placedRaw: (PlacedEvent & { clusterId: number })[] = [];
  let clusterId = 0;
  let active: { id: string; end: number }[] = [];
  
  for (const ev of sorted) {
    const startMs = ev.start.getTime();
    const endMs = ev.end!.getTime();
    
    active = active.filter(a => a.end > startMs);
    if (active.length === 0) {
      columns = [];
      clusterId += 1;
    }
    
    let colIdx = columns.findIndex(c => c.endTime <= startMs);
    if (colIdx === -1) { 
      columns.push({ endTime: endMs }); 
      colIdx = columns.length - 1; 
    } else { 
      columns[colIdx].endTime = endMs; 
    }
    
    active.push({ id: ev.id, end: endMs });
    
    const top = minutesBetween(opts.dayStart, ev.start) / opts.minutesPerPx;
    const height = clamp(minutesBetween(ev.start, ev.end!) / opts.minutesPerPx, 6, 99999);
    
    placedRaw.push({ ev, top, height, col: colIdx, colsInCluster: 0, clusterId });
  }
  
  const maxColsByCluster: Record<number, number> = {};
  for (const p of placedRaw) {
    maxColsByCluster[p.clusterId] = Math.max(maxColsByCluster[p.clusterId] || 0, p.col + 1);
  }
  
  const placed: PlacedEvent[] = placedRaw.map(p => ({ 
    ...p, 
    colsInCluster: maxColsByCluster[p.clusterId] 
  }));
  
  return { placed, milestones };
}

// Compute grid step based on selected event
function computeGridStepMinutes(focused?: TimelineEvent | null) {
  if (!focused) return 60;
  if (focused.type === "duration" && focused.end) {
    const dur = minutesBetween(focused.start, focused.end);
    if (dur <= 12) return 5;
    if (dur <= 60) return 15;
  }
  return 60;
}

// Build time ticks for the axis
function buildTicks(dayStart: Date, dayEnd: Date, stepMin: number) {
  const totalMin = minutesBetween(dayStart, dayEnd);
  const ticks: { t: Date; label: string }[] = [];
  for (let m = 0; m <= totalMin; m += stepMin) {
    const t = addMin(dayStart, m);
    const label = format(t, "h:mmaaa");
    ticks.push({ t, label });
  }
  return ticks;
}

export const ConfettiEventTimeline = React.forwardRef<HTMLDivElement, EventTimelineProps>(
  (
    {
      events,
      onAddEvent,
      onEditEvent,
      onDeleteEvent,
      title = 'Event Timeline',
      subtitle = 'Manage your party schedule and tasks',
      dayStart,
      dayEnd,
      showFilters = true,
      showSearch = true,
      showAddButton = true,
      className = '',
      ...props
    },
    ref
  ) => {
    // Set default day boundaries
    const base = new Date();
    const defaultDayStart = dayStart || new Date(base.getFullYear(), base.getMonth(), base.getDate(), 8, 0, 0);
    const defaultDayEnd = dayEnd || new Date(base.getFullYear(), base.getMonth(), base.getDate(), 22, 0, 0);

    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState<TimeFilter>({
      category: 'all',
      status: 'all',
      priority: 'all',
    })
    const [selected, setSelected] = useState<TimelineEvent | null>(null);
    const [creatorOpen, setCreatorOpen] = useState(false);
    const [draftTime, setDraftTime] = useState<Date | null>(null);

    // Filter and prepare events
    const filteredEvents = useMemo(() => {
      const filtered = events.filter((event) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          const matchesSearch =
            event.title.toLowerCase().includes(query) ||
            event.description?.toLowerCase().includes(query) ||
            event.location?.toLowerCase().includes(query)
          if (!matchesSearch) return false
        }

        // Category filter
        if (filters.category && filters.category !== 'all' && event.category !== filters.category) {
          return false
        }

        // Priority filter
        if (filters.priority && filters.priority !== 'all' && event.priority !== filters.priority) {
          return false
        }

        return true
      })

      return filtered.slice(0, MAX_EVENTS)
    }, [events, searchQuery, filters])

    // Calculate layout
    const gridStepMin = computeGridStepMinutes(selected);
    const minutesPerPx = gridStepMin <= 5 ? 1 : 2;
    const trackWidth = 840;
    
    const { placed, milestones } = useMemo(
      () => layoutEvents(filteredEvents, { dayStart: defaultDayStart, dayEnd: defaultDayEnd, minutesPerPx, trackWidth }),
      [filteredEvents, minutesPerPx, defaultDayStart, defaultDayEnd]
    );

    const totalMinutes = minutesBetween(defaultDayStart, defaultDayEnd);
    const totalHeight = Math.ceil(totalMinutes / minutesPerPx);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Event handlers
    const handleFilterChange = (key: keyof TimeFilter, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const clearSearch = () => {
      setSearchQuery('')
    }

    function onBackgroundClick(e: React.MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const y = e.clientY - rect.top;
      const mins = Math.round(y * minutesPerPx);
      const t = addMin(defaultDayStart, clamp(mins, 0, totalMinutes));
      setDraftTime(t);
      setCreatorOpen(true);
    }

    function createEventAt(time: Date, title: string) {
      const id = Math.random().toString(36).slice(2, 9);
      const newEv: TimelineEvent = { 
        id, 
        title, 
        type: "duration", 
        start: time, 
        end: addMin(time, 30), 
        color: "bg-rose-200",
        category: 'other',
        priority: 'medium'
      };
      onAddEvent?.();
      setSelected(newEv);
    }

    function createMilestoneAt(time: Date, title: string) {
      const id = Math.random().toString(36).slice(2, 9);
      const ms: TimelineEvent = { 
        id, 
        title, 
        type: "milestone", 
        start: time, 
        icon: <Cake className="h-3.5 w-3.5"/>,
        category: 'other',
        priority: 'medium'
      };
      onAddEvent?.();
      setSelected(ms);
    }

    function deleteEvent(id: string) {
      onDeleteEvent?.(id);
      setSelected(null);
    }

    const [draftTitle, setDraftTitle] = useState("New Event");

    // Mobile view for events list
    const mobileView = (
      <div className="md:hidden space-y-2">
        {filteredEvents.slice().sort((a,b) => a.start.getTime() - b.start.getTime()).map(ev => (
          <Card key={ev.id} onClick={() => setSelected(ev)} className="cursor-pointer">
            <div className="flex items-start gap-3 p-4">
              <div className="shrink-0 mt-0.5">
                {ev.type === "milestone" ? <Cake className="h-4 w-4"/> : <Clock className="h-4 w-4"/>}
              </div>
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-muted-foreground">
                  {format(ev.start, "h:mmaaa")} {ev.type === "duration" && ev.end ? `– ${format(ev.end, "h:mmaaa")}` : ""}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );

    // Desktop view with sophisticated timeline
    const desktopView = (
      <div className="hidden md:block">
        <div className="rounded-2xl border bg-background">
          <div className="relative grid" style={{ gridTemplateColumns: `${AXIS_WIDTH}px 1fr` }}>
            {/* Time axis */}
            <div className="border-r px-2 select-none relative" style={{ height: totalHeight }}>
              {buildTicks(defaultDayStart, defaultDayEnd, gridStepMin).map(({ t, label }, i) => {
                const top = Math.round(minutesBetween(defaultDayStart, t) / minutesPerPx);
                return (
                  <div key={i} className="absolute text-[12px] font-medium text-foreground" style={{ top }}>
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Events area */}
            <div className="relative" style={{ height: totalHeight }}>
              <div className="absolute inset-0" onClick={onBackgroundClick} ref={containerRef}>
                {/* Grid lines */}
                {buildTicks(defaultDayStart, defaultDayEnd, gridStepMin).map(({ t }, i) => {
                  const y = Math.round(minutesBetween(defaultDayStart, t) / minutesPerPx);
                  return (
                    <div key={i} className="absolute left-0 right-0 border-t border-muted" style={{ top: y }} />
                  );
                })}
              </div>

              {/* Milestones */}
              {milestones.map(ms => {
                const y = Math.round(minutesBetween(defaultDayStart, ms.start) / minutesPerPx);
                return (
                  <div key={ms.id} className="absolute left-0 right-0 z-20" style={{ top: y }}>
                    <div className="relative">
                      <div className="absolute inset-x-0 border-t-4 border-rose-500/80 shadow-[0_0_0_1px_rgba(244,63,94,0.2)]" />
                      <div className="absolute -left-[72px] -translate-y-1/2 flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-rose-600 text-white grid place-items-center shadow-md">
                          {ms.icon ?? <Cake className="h-4 w-4"/>}
                        </div>
                        <div className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
                          {ms.title}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {format(ms.start, "h:mmaaa")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Duration events */}
              {placed.map(p => {
                const clusterWidth = trackWidth;
                const colWidth = (clusterWidth - (p.colsInCluster - 1) * TRACK_GAP_X) / p.colsInCluster;
                const left = p.col * (colWidth + TRACK_GAP_X);
                return (
                  <div key={p.ev.id} className="absolute" style={{ top: p.top, left, width: colWidth, height: p.height }}>
                    <div 
                      className={cn(
                        "group h-full w-full cursor-pointer rounded-xl border p-2 shadow-sm transition hover:shadow-md",
                        p.ev.color ?? "bg-muted"
                      )} 
                      onClick={() => setSelected(p.ev)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="line-clamp-1 font-medium text-sm">{p.ev.title}</div>
                        <Pencil className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(p.ev.start, "h:mmaaa")} – {p.ev.end ? format(p.ev.end, "h:mmaaa") : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating add button */}
        {showAddButton && onAddEvent && (
          <div className="fixed bottom-6 right-6">
            <Button size="lg" className="rounded-full shadow-lg" onClick={() => { 
              setDraftTime(addMin(defaultDayStart, 180)); 
              setDraftTitle("New Event"); 
              setCreatorOpen(true); 
            }}>
              <Plus className="h-4 w-4 mr-2"/> Add Event
            </Button>
          </div>
        )}
      </div>
    );

    return (
      <div ref={ref} className={cn('w-full max-w-6xl mx-auto p-4 md:p-8', className)} {...props}>
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {format(defaultDayStart, "EEE, MMM d")} • {format(defaultDayStart, "h:mmaaa")}–{format(defaultDayEnd, "h:mmaaa")}
          </div>
        </header>

        {/* Filters and Search */}
        {(showFilters || showSearch) && (
          <Card className="p-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              {showSearch && (
                <div className="flex-1">
                  <SearchInput
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={clearSearch}
                    size="sm"
                  />
                </div>
              )}

              {showFilters && (
                <div className="flex gap-3">
                  <Select
                    placeholder="Category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    options={[
                      { value: 'all', label: 'All Categories' },
                      { value: 'setup', label: 'Setup' },
                      { value: 'activity', label: 'Activity' },
                      { value: 'meal', label: 'Meal' },
                      { value: 'entertainment', label: 'Entertainment' },
                      { value: 'cleanup', label: 'Cleanup' },
                      { value: 'other', label: 'Other' },
                    ]}
                    size="sm"
                  />
                  <Select
                    placeholder="Priority"
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    options={[
                      { value: 'all', label: 'All Priority' },
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'critical', label: 'Critical' },
                    ]}
                    size="sm"
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Timeline Views */}
        {filteredEvents.length === 0 ? (
          <Card className="p-8">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || Object.values(filters).some((f) => f !== 'all')
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first event to the timeline'}
              </p>
              {showAddButton && onAddEvent && (
                <Button onClick={onAddEvent} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Event
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <>
            {mobileView}
            {desktopView}
          </>
        )}

        {/* Event Detail Panel */}
        {selected && (
          <div className="fixed inset-y-0 right-0 w-[480px] bg-background border-l shadow-lg z-50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {selected.type === "milestone" ? <Cake className="h-4 w-4"/> : <Clock className="h-4 w-4"/>}
                <h2 className="text-lg font-semibold">{selected.title}</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
                ×
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground mb-6">
              {format(selected.start, "h:mmaaa")} {selected.type === "duration" && selected.end ? `– ${format(selected.end, "h:mmaaa")}` : ""}
            </div>

            <div className="space-y-6">
              {selected.description && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm">{selected.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
                <div className="space-y-2 text-sm">
                  {selected.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selected.location}</span>
                    </div>
                  )}
                  {selected.attendees && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{selected.attendees} people</span>
                    </div>
                  )}
                </div>
              </div>

              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tasks</h3>
                <div className="space-y-1">
                  {(selected.tasks ?? []).map(t => (
                    <div key={t.id} className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm">{t.title}</span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{t.status}</span>
                    </div>
                  ))}
                  {(!selected.tasks || selected.tasks.length === 0) && (
                    <div className="text-sm text-muted-foreground">No tasks linked.</div>
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Elements</h3>
                <div className="space-y-1">
                  {(selected.elements ?? []).map(el => (
                    <div key={el.id} className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm">{el.title}</span>
                      <span className="text-xs text-muted-foreground">{el.type}</span>
                    </div>
                  ))}
                  {(!selected.elements || selected.elements.length === 0) && (
                    <div className="text-sm text-muted-foreground">No elements linked.</div>
                  )}
                </div>
              </section>

              <section className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => deleteEvent(selected.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1"/> Delete
                </Button>
                {onEditEvent && (
                  <Button size="sm" onClick={() => onEditEvent(selected)}>
                    <Pencil className="h-3.5 w-3.5 mr-1"/> Edit
                  </Button>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ConfettiEventTimeline.displayName = 'ConfettiEventTimeline';