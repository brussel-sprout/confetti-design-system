import React, { useState } from 'react'
import { Calendar, Users, Clock } from 'lucide-react'
import { TimelineContainer } from '../components/organisms/TimelineContainer'
import { EventCreationModal } from '../components/molecules/EventCreationModal'
import { SideDrawerModal } from '../components/molecules/SideDrawerModal'
import { PartyEvent } from '../types/timeline'
import { mockEvents } from '../data/mockEvents'

export const TimelinePage: React.FC = () => {
  const [events, setEvents] = useState<PartyEvent[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<PartyEvent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [createAtTime, setCreateAtTime] = useState<string>('')

  const handleEventCreate = (eventData: Omit<PartyEvent, 'id'>) => {
    const newEvent: PartyEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
    }
    setEvents(prev => [...prev, newEvent].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    ))
    setIsCreating(false)
  }

  const handleEventUpdate = (updatedEvent: PartyEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    setSelectedEvent(null)
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
    setSelectedEvent(null)
  }

  const handleTimelineClick = (time: string) => {
    setCreateAtTime(time)
    setIsCreating(true)
  }

  const stats = {
    totalEvents: events.length,
    milestones: events.filter(e => e.eventType === 'milestone').length,
    durationEvents: events.filter(e => e.eventType === 'duration').length,
    highPriority: events.filter(e => e.priority === 'high' || e.priority === 'critical').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Calendar className="text-primary" size={28} />
                Party Timeline
              </h1>
              <p className="text-muted-foreground mt-1">
                Interactive timeline for your birthday party planning
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalEvents}</div>
                <div className="text-xs text-muted-foreground">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.milestones}</div>
                <div className="text-xs text-muted-foreground">Milestones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.durationEvents}</div>
                <div className="text-xs text-muted-foreground">Duration Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{stats.highPriority}</div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="px-6 py-3">
          <div className="flex items-center gap-4 text-sm text-primary">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Click on timeline to add events</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Click on events for details</span>
            </div>
            <div className="text-primary/80">
              Overlapping events stack horizontally • Milestones appear as markers
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        <TimelineContainer
          events={events}
          onEventCreate={handleTimelineClick}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          timeScale="30min"
          startTime="14:00"
          endTime="02:00"
        />
      </div>

      {/* Modals */}
      <EventCreationModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onEventCreate={handleEventCreate}
        defaultTime={createAtTime}
      />

      <SideDrawerModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />
    </div>
  )
}
