import React, { useState, useMemo } from 'react'
import { PartyEvent } from '../../../types/timeline'
import { TimelineAxis } from '../../molecules/TimelineAxis'
import { EventRenderer } from '../../molecules/EventRenderer'
import { cn } from '../../../utils/cn'
import { calculateEventPositions, getPixelsPerMinute } from '../../../utils/timelineUtils'

interface TimelineContainerProps {
  events: PartyEvent[]
  onEventCreate?: (time: string) => void
  onEventUpdate?: (event: PartyEvent) => void
  onEventDelete?: (eventId: string) => void
  timeScale?: '30min' | '15min' | '5min'
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
  className
}) => {
  const [selectedEvent, setSelectedEvent] = useState<PartyEvent | null>(null)

  // Calculate overlap groups and event positions
//   const overlapGroups = useMemo(() => {
//     const internalEvents = events.map(event => ({
//       ...event,
//       startTime: new Date(`2000-01-01T${event.startTime}:00`),
//       endTime: event.endTime ? new Date(`2000-01-01T${event.endTime}:00`) : undefined
//     }))
//     return findOverlapGroups(internalEvents)
//   }, [events])

  const eventPositions = useMemo(() => {
    const positions = calculateEventPositions(events, timeScale, startTime, endTime)
    return Array.from(positions.entries()).map(([eventId, position]) => {
      const event = events.find(e => e.id === eventId)!
      return {
        event,
        top: position.top,
        height: position.height,
        stackIndex: position.stackIndex
      }
    })
  }, [events, timeScale, startTime, endTime])

  // Calculate total height for the timeline
  const totalHeight = useMemo(() => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
    const pixelsPerMinute = getPixelsPerMinute(timeScale)
    return totalMinutes * pixelsPerMinute
  }, [startTime, endTime, timeScale])

  const handleTimelineClick = (time: string) => {
    if (onEventCreate) {
      onEventCreate(time)
    }
  }

  const handleEventClick = (event: PartyEvent) => {
    setSelectedEvent(event)
  }

  return (
    <div className={cn(
      "relative bg-background rounded-lg shadow-sm border border-border p-6",
      className
    )}>
      <div className="flex">
        {/* Timeline axis - Left sidebar */}
        <div className="flex-shrink-0">
          <TimelineAxis 
            timeScale={timeScale}
            startTime={startTime}
            endTime={endTime}
            onTimeClick={onEventCreate ? handleTimelineClick : undefined}
          />
        </div>

        {/* Events area - Main content area */}
        <div className="flex-1 relative" style={{ height: `${totalHeight}px` }}>
          {eventPositions.map((position) => (
            <EventRenderer
              key={position.event.id}
              event={position.event}
              top={position.top}
              stackIndex={position.stackIndex}
              isSelected={selectedEvent?.id === position.event.id}
              onClick={() => handleEventClick(position.event)}
            />
          ))}
        </div>
      </div>

      {/* Event details panel - placeholder for future implementation */}
      {selectedEvent && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{selectedEvent.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {selectedEvent.startTime} {selectedEvent.endTime && `- ${selectedEvent.endTime}`}
          </p>
          {selectedEvent.description && (
            <p className="text-sm">{selectedEvent.description}</p>
          )}
          <div className="mt-4 flex gap-2">
            {onEventUpdate && (
              <button 
                className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                onClick={() => {
                  // Placeholder for edit functionality
                  console.log('Edit event:', selectedEvent.id)
                }}
              >
                Edit
              </button>
            )}
            {onEventDelete && (
              <button 
                className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90"
                onClick={() => {
                  onEventDelete(selectedEvent.id)
                  setSelectedEvent(null)
                }}
              >
                Delete
              </button>
            )}
            <button 
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
