import React from 'react'
import { cn } from '../../../utils/cn'

export interface TimelineAccessProps {
  startTime?: string // HH:MM format (e.g., "09:00")
  endTime?: string // HH:MM format (e.g., "22:00")
  incrementMinutes?: number // Time increment in minutes (e.g., 30 for 30-minute increments)
  showLabels?: boolean
  className?: string
}

export interface TimeIncrement {
  time: string
  position: number // Pixel position from top
  isMajor: boolean // Whether this is a major increment (hour vs half-hour)
}

export const TimelineAccess: React.FC<TimelineAccessProps> = ({
  startTime = "09:00",
  endTime = "22:00", 
  incrementMinutes = 30,
  showLabels = true,
  className = ''
}) => {
  
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
      const isMajor = minutes === 0 // Major increments are on the hour
      
      increments.push({
        time: timeString,
        position,
        isMajor
      })
    }
    
    return increments
  }

  const formatDisplayTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 || 12
    return minutes === 0 ? `${displayHour}${ampm}` : `${displayHour}:${minutes.toString().padStart(2, '0')}${ampm}`
  }

  const increments = calculateTimeIncrements()
  const totalHeight = increments.length > 0 ? increments[increments.length - 1].position + 80 : 400

  return (
    <div 
      className={cn('relative flex-shrink-0', className)}
      style={{ height: `${totalHeight}px`, width: '120px' }}
    >
      {/* Main timeline axis */}
      <div className="absolute left-16 top-0 w-0.5 bg-border h-full" />
      
      {/* Time increments */}
      {increments.map((increment) => (
        <div
          key={increment.time}
          className="absolute flex items-center"
          style={{ 
            top: `${increment.position}px`,
            left: '0',
            width: '100%'
          }}
        >
          {/* Time label */}
          {showLabels && (
            <div className={cn(
              'text-xs font-medium mr-3 min-w-[40px] text-right',
              increment.isMajor ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {formatDisplayTime(increment.time)}
            </div>
          )}
          
          {/* Tick mark */}
          <div 
            className={cn(
              'bg-border',
              increment.isMajor 
                ? 'w-6 h-0.5' // Major tick (hour)
                : 'w-3 h-px'  // Minor tick (half-hour)
            )}
          />
          
          {/* Connection point for events */}
          <div className="w-2 h-2 bg-background border border-border rounded-full ml-1" />
        </div>
      ))}
      
      {/* Visual guides for alignment */}
      <div className="absolute left-20 top-0 w-px bg-border/30 h-full opacity-50" />
    </div>
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