import React from 'react'
import { cn } from '../../../utils/cn'
import { formatTime, generateTimeSlots } from '../../../utils/timelineUtils'
import type { TimeScale } from '../../../types/timeline'

export interface TimelineAxisProps {
  timeScale: TimeScale
  onTimeClick: (time: string, event: React.MouseEvent) => void
  startTime?: string
  endTime?: string
  className?: string
}

export const TimelineAxis: React.FC<TimelineAxisProps> = ({
  timeScale,
  onTimeClick,
  startTime = '09:00',
  endTime = '23:00',
  className = ''
}) => {
  // Generate time intervals based on scale
  const intervalMinutes = timeScale === '5min' ? 5 : timeScale === '15min' ? 15 : 30
  const timeSlots = generateTimeSlots(startTime, endTime, intervalMinutes)
  
  // Calculate height per slot based on scale
  const slotHeight = timeScale === '5min' ? 20 : timeScale === '15min' ? 30 : 30
  
  const handleTimeClick = (time: string, event: React.MouseEvent) => {
    onTimeClick(time, event)
  }
  
  return (
    <div className={cn('relative flex-shrink-0 w-20 bg-background border-r border-border', className)}>
      {/* Time slots */}
      {timeSlots.map((time, index) => {
        const [hours, minutes] = time.split(':').map(Number)
        const isHourMark = minutes === 0
        const isMainHour = isHourMark && hours % 2 === 0
        
        return (
          <div
            key={time}
            className={cn(
              'relative flex items-center justify-end pr-3 cursor-pointer transition-colors',
              'hover:bg-muted/50 active:bg-muted',
              'border-r-2 border-transparent hover:border-primary/30'
            )}
            style={{ height: `${slotHeight}px` }}
            onClick={(event) => handleTimeClick(time, event)}
          >
            {/* Time label */}
            <div
              className={cn(
                'text-xs font-medium transition-colors',
                isMainHour 
                  ? 'text-foreground text-sm font-semibold' 
                  : isHourMark 
                  ? 'text-foreground/80' 
                  : 'text-muted-foreground'
              )}
            >
              {isHourMark || timeScale === '5min' ? formatTime(time) : minutes.toString()}
            </div>
            
            {/* Tick mark */}
            <div 
              className={cn(
                'absolute right-0 bg-border',
                isMainHour 
                  ? 'w-4 h-0.5' 
                  : isHourMark 
                  ? 'w-3 h-px' 
                  : 'w-2 h-px'
              )}
            />
            
            {/* Major hour separator line */}
            {isMainHour && index > 0 && (
              <div className="absolute top-0 left-0 right-0 h-px bg-border/50" />
            )}
            
            {/* Click target area */}
            <div className="absolute inset-0 z-10" />
          </div>
        )
      })}
      
      {/* Scale indicator */}
      <div className="absolute bottom-2 left-1 right-1 text-center">
        <div className="text-xs text-muted-foreground bg-background/80 px-1 rounded">
          {timeScale}
        </div>
      </div>
    </div>
  )
}

TimelineAxis.displayName = 'TimelineAxis'