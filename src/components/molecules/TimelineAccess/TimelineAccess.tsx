import React, { useState } from 'react'
import { cn } from '../../../utils/cn'

export interface TimelineAccessProps {
  startTime?: string // HH:MM format (e.g., "09:00")
  endTime?: string // HH:MM format (e.g., "22:00")
  incrementMinutes?: number // Time increment in minutes (e.g., 15 for 15-minute increments)
  className?: string
}

export interface TimeIncrement {
  time: string
  position: number // Pixel position from top
  isHour: boolean // Whether this is an hourly increment
  isHalfHour: boolean // Whether this is a half-hour increment
}

export const TimelineAccess: React.FC<TimelineAccessProps> = ({
  startTime = "09:00",
  endTime = "22:00", 
  incrementMinutes = 15,
  className = ''
}) => {
  const [hoveredTime, setHoveredTime] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
  
  // Calculate time increments
  const calculateTimeIncrements = (): TimeIncrement[] => {
    const increments: TimeIncrement[] = []
    
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    // Height per minute (we'll use 4px per minute as a reasonable scale)
    const pixelsPerMinute = 4
    
    for (let totalMinutes = startMinutes; totalMinutes <= endMinutes; totalMinutes += incrementMinutes) {
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      const position = (totalMinutes - startMinutes) * pixelsPerMinute
      const isHour = minutes === 0
      const isHalfHour = minutes === 30
      
      increments.push({
        time: timeString,
        position,
        isHour,
        isHalfHour
      })
    }
    
    return increments
  }

  const formatDisplayTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 || 12
    if (minutes === 0) {
      return `${displayHour} ${ampm}`
    } else {
      return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`
    }
  }

  const handleMouseEnter = (time: string, event: React.MouseEvent) => {
    setHoveredTime(time)
    setHoverPosition({ x: event.clientX, y: event.clientY })
  }

  const handleMouseLeave = () => {
    setHoveredTime(null)
    setHoverPosition(null)
  }

  const increments = calculateTimeIncrements()
  const totalHeight = increments.length > 0 ? increments[increments.length - 1].position + 80 : 400

  return (
    <>
      <div 
        className={cn('relative flex-shrink-0', className)}
        style={{ height: `${totalHeight}px`, width: '80px' }}
      >
        {/* Main timeline axis */}
        <div className="absolute right-0 top-0 w-px bg-border h-full" />
        
        {/* Time increments */}
        {increments.map((increment) => (
          <div
            key={increment.time}
            className="absolute flex items-center justify-end cursor-pointer group"
            style={{ 
              top: `${increment.position}px`,
              right: '0',
              width: '100%'
            }}
            onMouseEnter={(e) => handleMouseEnter(increment.time, e)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Time label - only show for hours */}
            {increment.isHour && (
              <div className="text-sm font-medium text-foreground mr-2">
                {formatDisplayTime(increment.time)}
              </div>
            )}
            
            {/* Tick mark */}
            <div 
              className={cn(
                'bg-border transition-all duration-150',
                increment.isHour 
                  ? 'w-3 h-px group-hover:w-4' // Hour tick
                  : increment.isHalfHour
                    ? 'w-2 h-px group-hover:w-3' // Half-hour tick
                    : 'w-1 h-px group-hover:w-2' // Quarter-hour tick
              )}
            />
          </div>
        ))}
      </div>
      
      {/* Hover tooltip */}
      {hoveredTime && hoverPosition && (
        <div
          className="fixed z-50 bg-background border border-border rounded-md px-2 py-1 text-sm font-medium shadow-lg pointer-events-none"
          style={{
            left: `${hoverPosition.x + 10}px`,
            top: `${hoverPosition.y - 30}px`
          }}
        >
          {formatDisplayTime(hoveredTime)}
        </div>
      )}
    </>
  )
}

// Hook to get position for a given time - used by TimelineItem components
export const useTimelinePosition = (
  time: string, 
  startTime: string = "09:00", 
  pixelsPerMinute: number = 4
): number => {
  const [timeHour, timeMin] = time.split(':').map(Number)
  const [startHour, startMin] = startTime.split(':').map(Number)
  
  const timeMinutes = timeHour * 60 + timeMin
  const startMinutes = startHour * 60 + startMin
  
  return (timeMinutes - startMinutes) * pixelsPerMinute
}

TimelineAccess.displayName = 'TimelineAccess'