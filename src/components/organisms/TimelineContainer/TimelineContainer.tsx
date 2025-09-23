import React, { useState, useMemo } from 'react'
import { cn } from '../../../utils/cn'
import { calculateEventPositions } from '../../../utils/timelineUtils'
import type { PartyEvent, TimeScale } from '../../../types/timeline'
import { TimelineAxis } from './TimelineAxis'
import { EventRenderer } from './EventRenderer'
import { SideDrawerModal } from './SideDrawerModal'
import { EventCreationModal } from './EventCreationModal'

export interface TimelineContainerProps {
  events: PartyEvent[]
  onEventCreate: (event: Omit<PartyEvent, 'id'>) => void
  onEventUpdate: (event: PartyEvent) => void
  onEventDelete: (eventId: string) => void
  timeScale?: TimeScale
  startTime?: string
  endTime?: string
  className?: string
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  events,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  timeScale = '30min',
  startTime = '09:00',
  endTime = '23:00',
  className = ''
}) => {
  // Internal state
  const [selectedEvent, setSelectedEvent] = useState<PartyEvent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [createAtTime, setCreateAtTime] = useState('09:00')

  // Calculate event positions using the utility function
  const eventPositions = useMemo(() => {
    return calculateEventPositions(events, timeScale, startTime, endTime)
  }, [events, timeScale, startTime, endTime])

  // Event handlers
  const handleTimeClick = (time: string, event: React.MouseEvent) => {
    setCreateAtTime(time)
    setIsCreating(true)
  }

  const handleEventClick = (event: PartyEvent) => {
    setSelectedEvent(event)
  }

  const handleEventCreate = (eventData: Omit<PartyEvent, 'id'>) => {
    onEventCreate(eventData)
    setIsCreating(false)
  }

  const handleEventUpdate = (event: PartyEvent) => {
    onEventUpdate(event)
    setSelectedEvent(event) // Update the selected event with new data
  }

  const handleEventDelete = (eventId: string) => {
    onEventDelete(eventId)
    setSelectedEvent(null)
  }

  const handleCloseModals = () => {
    setSelectedEvent(null)
    setIsCreating(false)
  }

  // Calculate container height based on time range
  const calculateContainerHeight = () => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)
    
    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute
    const totalMinutes = endTotalMinutes - startTotalMinutes
    
    // Calculate pixels per minute based on time scale
    const pixelsPerMinute = timeScale === '5min' ? 4 : timeScale === '15min' ? 2 : 1
    
    return totalMinutes * pixelsPerMinute + 100 // Add some padding
  }

  const containerHeight = calculateContainerHeight()

  return (
    <div className={cn('relative bg-background border border-border rounded-lg overflow-hidden', className)}>
      {/* Main timeline content */}
      <div className="flex">
        {/* Timeline axis */}
        <TimelineAxis
          timeScale={timeScale}
          onTimeClick={handleTimeClick}
          startTime={startTime}
          endTime={endTime}
        />
        
        {/* Events area */}
        <div 
          className="relative flex-1 bg-background overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          {/* Grid lines for visual reference */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical reference lines */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />
            <div className="absolute left-20 top-0 bottom-0 w-px bg-border/20" />
            <div className="absolute left-40 top-0 bottom-0 w-px bg-border/20" />
            
            {/* Horizontal hour lines */}
            {Array.from({ length: Math.floor((containerHeight) / 60) }, (_, i) => (
              <div 
                key={i}
                className="absolute left-0 right-0 h-px bg-border/10"
                style={{ top: `${i * 60}px` }}
              />
            ))}
          </div>
          
          {/* Events */}
          <div className="relative w-full h-full">
            {events.map((event) => {
              const position = eventPositions.get(event.id)
              if (!position) return null
              
              return (
                <EventRenderer
                  key={event.id}
                  event={event}
                  top={position.top}
                  height={position.height}
                  stackIndex={position.stackIndex}
                  isSelected={selectedEvent?.id === event.id}
                  onClick={() => handleEventClick(event)}
                />
              )
            })}
          </div>
          
          {/* Empty state */}
          {events.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="mb-2 text-lg">No events scheduled</div>
                <div className="text-sm">Click on a time slot to add your first event</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with controls */}
      <div className="border-t border-border px-4 py-2 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {events.length} event{events.length !== 1 ? 's' : ''} scheduled
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Duration Event</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Milestone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SideDrawerModal
        isOpen={!!selectedEvent}
        onClose={handleCloseModals}
        event={selectedEvent}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />

      <EventCreationModal
        isOpen={isCreating}
        onClose={handleCloseModals}
        onEventCreate={handleEventCreate}
        suggestedTime={createAtTime}
      />
    </div>
  )
}

TimelineContainer.displayName = 'TimelineContainer'