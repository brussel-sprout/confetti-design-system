import React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { generateTimeTicks, formatTime, getPixelsPerMinute } from '../../../utils/timelineUtils'

interface TimelineAxisProps {
  timeScale?: '30min' | '15min' | '5min'
  startTime?: string
  endTime?: string
  onTimeClick?: (time: string, event: React.MouseEvent) => void
  className?: string
}

export const TimelineAxis: React.FC<TimelineAxisProps> = ({ 
  timeScale = '30min',
  startTime = '09:00',
  endTime = '23:00',
  onTimeClick,
  className
}) => {
  const { majorTicks, minorTicks } = generateTimeTicks(startTime, endTime, timeScale)
  const pixelsPerMinute = getPixelsPerMinute(timeScale)
  
  // Calculate total height based on time range
  const start = new Date(`2000-01-01T${startTime}:00`)
  const end = new Date(`2000-01-01T${endTime}:00`)
  const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
  const totalHeight = totalMinutes * pixelsPerMinute

  return (
    <div className={cn(
      "w-24 bg-background border-r border-border flex flex-col relative",
      className
    )}>
      <div className="sticky top-0 bg-background border-b border-border p-3 z-10">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock size={16} />
          <span>Timeline</span>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-visible" style={{ height: `${totalHeight}px` }}>
        {/* Render major ticks with labels */}
        {majorTicks.map((time) => {
          const timeDate = new Date(`2000-01-01T${time}:00`)
          const minutesFromStart = (timeDate.getTime() - start.getTime()) / (1000 * 60)
          const top = minutesFromStart * pixelsPerMinute
          const displayTime = formatTime(time)
          
          return (
            <div
              key={`major-${time}`}
              className="absolute flex items-center"
              style={{ 
                top: `${top}px`,
                left: 0,
                right: '-100vw', // Extend far beyond the sidebar
                width: '100vw' // Full viewport width to ensure ticks extend across timeline
              }}
            >
              {/* Time label positioned in the left sidebar */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                <span className="text-xs font-medium text-foreground bg-background px-1">
                  {displayTime}
                </span>
              </div>
              
              {/* Horizontal tick line extending from sidebar across the timeline */}
              <div 
                className="absolute left-0 h-px bg-border"
                style={{ 
                  top: '50%',
                  width: '100vw' // Full width to extend across timeline
                }}
              />
            </div>
          )
        })}
        
        {/* Render minor ticks without labels */}
        {minorTicks.map((time) => {
          const timeDate = new Date(`2000-01-01T${time}:00`)
          const minutesFromStart = (timeDate.getTime() - start.getTime()) / (1000 * 60)
          const top = minutesFromStart * pixelsPerMinute
          
          return (
            <div
              key={`minor-${time}`}
              className="absolute flex items-center"
              style={{ 
                top: `${top}px`,
                left: 0,
                right: '-100vw', // Extend far beyond the sidebar
                width: '100vw' // Full viewport width to ensure ticks extend across timeline
              }}
              onClick={onTimeClick ? (e) => onTimeClick(time, e) : undefined}
            >
              {/* Horizontal tick line extending from sidebar across the timeline */}
              <div 
                className="absolute left-0 h-px bg-border/50"
                style={{ 
                  top: '50%',
                  width: '100vw' // Full width to extend across timeline
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
