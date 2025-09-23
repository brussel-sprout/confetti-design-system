import { Calendar, Plus } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { cn } from '../../../utils/cn'
import { Button } from '../../atoms/Button'
import { SearchInput } from '../../atoms/SearchInput'
import { Select } from '../../atoms/Select'
import { Card } from '../../molecules/Card'
import { TimelineItem } from '../../molecules/TimelineItem'
import { TimelineAccess, useTimelinePosition } from '../../molecules/TimelineAccess'

import type { TimelineEvent } from '../../molecules/TimelineItem'

export interface TimeFilter {
        category?: 'all' | 'setup' | 'activity' | 'meal' | 'cleanup' | 'other'
        status?: 'all' | 'pending' | 'in-progress' | 'completed' | 'cancelled'
        priority?: 'all' | 'low' | 'medium' | 'high' | 'critical'
}

export interface EventTimelineProps {
        events: TimelineEvent[]
        onAddEvent?: () => void
        onEditEvent?: (event: TimelineEvent) => void
        onDeleteEvent?: (eventId: string) => void
        onStatusChange?: (eventId: string, status: TimelineEvent['status']) => void
        title?: string
        subtitle?: string
        showFilters?: boolean
        showSearch?: boolean
        showAddButton?: boolean
        className?: string
}

const EventTimeline = React.forwardRef<HTMLDivElement, EventTimelineProps>(
        (
                {
                        events,
                        onAddEvent,
                        onEditEvent,
                        onDeleteEvent,
                        title = 'Event Timeline',
                        subtitle = 'Manage your party schedule and tasks',
                        showFilters = true,
                        showSearch = true,
                        showAddButton = true,
                        className = '',
                        ...props
                },
                ref
        ) => {
                const [searchQuery, setSearchQuery] = useState('')
                const [filters, setFilters] = useState<TimeFilter>({
                        category: 'all',
                        status: 'all',
                        priority: 'all',
                })

                // Filter and sort events
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

                        // Sort by start time
                        return filtered.sort((a, b) => {
                                const timeA = a.startTime.split(':').map(Number)
                                const timeB = b.startTime.split(':').map(Number)
                                const minutesA = timeA[0] * 60 + timeA[1]
                                const minutesB = timeB[0] * 60 + timeB[1]
                                return minutesA - minutesB
                        })
                }, [events, searchQuery, filters])

                // Calculate overlap groups and stack indexes for horizontal positioning
                const eventsWithStackIndex = useMemo(() => {
                        if (filteredEvents.length === 0) return []

                        // Check if two events overlap
                        const eventsOverlap = (event1: TimelineEvent, event2: TimelineEvent): boolean => {
                                const createDate = (timeString: string) => {
                                        const [hours, minutes] = timeString.split(':').map(Number)
                                        const date = new Date()
                                        date.setHours(hours, minutes, 0, 0)
                                        return date
                                }

                                const start1 = createDate(event1.startTime)
                                const end1 = event1.endTime ? createDate(event1.endTime) : start1
                                const start2 = createDate(event2.startTime)
                                const end2 = event2.endTime ? createDate(event2.endTime) : start2

                                return start1 < end2 && end1 > start2
                        }

                        // Calculate stack indexes for overlapping events
                        const eventsWithStack: Array<TimelineEvent & { stackIndex: number }> = []
                        
                        filteredEvents.forEach((event) => {
                                let stackIndex = 0
                                
                                // Find the minimum stack index where this event doesn't overlap with existing events at that level
                                while (true) {
                                        const hasOverlapAtLevel = eventsWithStack.some(
                                                existingEvent => existingEvent.stackIndex === stackIndex && eventsOverlap(event, existingEvent)
                                        )
                                        
                                        if (!hasOverlapAtLevel) {
                                                break
                                        }
                                        stackIndex++
                                }
                                
                                eventsWithStack.push({ ...event, stackIndex })
                        })

                        return eventsWithStack
                }, [filteredEvents])

                // Calculate timeline stats
                const stats = useMemo(() => {
                        const total = events.length
                        const setupEvents = events.filter((e) => e.category === 'setup').length
                        const activityEvents = events.filter((e) => e.category === 'activity').length
                        const mealEvents = events.filter((e) => e.category === 'meal').length
                        const totalDuration = events.reduce((acc, event) => {
                                if (event.duration) return acc + event.duration
                                if (event.endTime) {
                                        const start = new Date(`2000-01-01T${event.startTime}:00`)
                                        const end = new Date(`2000-01-01T${event.endTime}:00`)
                                        return acc + (end.getTime() - start.getTime()) / (1000 * 60)
                                }
                                return acc + 30 // Default 30 minutes
                        }, 0)

                        return { total, setupEvents, activityEvents, mealEvents, totalDuration }
                }, [events])

                const handleFilterChange = (key: keyof TimeFilter, value: string) => {
                        setFilters((prev) => ({ ...prev, [key]: value }))
                }

                const clearSearch = () => {
                        setSearchQuery('')
                }

                const handlePrint = () => {
                        window.print()
                }

                return (
                        <div ref={ref} className={cn('w-full max-w-4xl mx-auto', className)} {...props}>
                                {/* Header */}
                                <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                                <div>
                                                        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                                                        <p className="text-muted-foreground">{subtitle}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                        <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                                                        />
                                                                </svg>
                                                                Print Schedule
                                                        </Button>
                                                        {showAddButton && onAddEvent && (
                                                                <Button onClick={onAddEvent} className="flex items-center gap-2">
                                                                        <Plus className="w-4 h-4" />
                                                                        Add Event
                                                                </Button>
                                                        )}
                                                </div>
                                        </div>

                                        {/* Stats Cards */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                <Card className="p-4">
                                                        <div className="text-center">
                                                                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                                                                <div className="text-sm text-muted-foreground">Total Events</div>
                                                        </div>
                                                </Card>
                                                <Card className="p-4">
                                                        <div className="text-center">
                                                                <div className="text-2xl font-bold text-info">{stats.setupEvents}</div>
                                                                <div className="text-sm text-muted-foreground">Setup Tasks</div>
                                                        </div>
                                                </Card>
                                                <Card className="p-4">
                                                        <div className="text-center">
                                                                <div className="text-2xl font-bold text-primary">{stats.activityEvents}</div>
                                                                <div className="text-sm text-muted-foreground">Activities</div>
                                                        </div>
                                                </Card>
                                                <Card className="p-4">
                                                        <div className="text-center">
                                                                <div className="text-2xl font-bold text-warning">{stats.mealEvents}</div>
                                                                <div className="text-sm text-muted-foreground">Meals</div>
                                                        </div>
                                                </Card>
                                        </div>

                                        {/* Filters and Search */}
                                        {(showFilters || showSearch) && (
                                                <Card className="p-4">
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
                                </div>

                                {/* Timeline */}
                                {eventsWithStackIndex.length === 0 ? (
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
                                        <div className="flex gap-6">
                                                {/* Timeline Access - Time increments */}
                                                <TimelineAccess 
                                                        startTime="09:00"
                                                        endTime="23:00"
                                                        incrementMinutes={30}
                                                        showLabels={true}
                                                />
                                                
                                                {/* Events Container */}
                                                <div className="flex-1 relative min-h-[800px]">
                                                        {eventsWithStackIndex.map((event, index) => {
                                                                const topPosition = useTimelinePosition(event.startTime, "09:00", 4)
                                                                return (
                                                                        <TimelineItem
                                                                                key={event.id}
                                                                                event={event}
                                                                                isFirst={index === 0}
                                                                                isLast={index === eventsWithStackIndex.length - 1}
                                                                                stackIndex={event.stackIndex}
                                                                                onEdit={onEditEvent}
                                                                                onDelete={onDeleteEvent}
                                                                                style={{
                                                                                        position: 'absolute',
                                                                                        top: `${topPosition}px`,
                                                                                        left: '0',
                                                                                        right: '0',
                                                                                        zIndex: 10
                                                                                }}
                                                                        />
                                                                )
                                                        })}
                                                </div>
                                        </div>
                                )}

                                {/* Quick Actions Footer */}
                                {eventsWithStackIndex.length > 0 && (
                                        <Card className="p-4 mt-6">
                                                <div className="flex items-center justify-between text-sm">
                                                        <div className="text-muted-foreground">
                                                                Showing {eventsWithStackIndex.length} of {events.length} events
                                                        </div>
                                                        <div className="text-muted-foreground">
                                                                Total Duration: {Math.round(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
                                                        </div>
                                                </div>
                                        </Card>
                                )}
                        </div>
                )
        }
)

EventTimeline.displayName = 'EventTimeline'

export { EventTimeline }
