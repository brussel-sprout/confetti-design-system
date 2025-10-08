import React from 'react'

export interface TimelineAxisProps {
  timeScale: '30min' | '15min' | '5min'
  onTimeClick: (time: string, event: React.MouseEvent) => void
  'data-id'?: string
}

export function TimelineAxis({
  timeScale,
  onTimeClick,
  'data-id': dataId,
}: TimelineAxisProps) {
  // Generate time slots based on the selected time scale
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9 // Start at 9 AM
    const endHour = 17 // End at 5 PM
    const intervals = {
      '30min': 30,
      '15min': 15,
      '5min': 5,
    }

    const intervalMinutes = intervals[timeScale]

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const timeString = formatTime(hour, minute)
        const isMajorTick = minute === 0 // Hour markers are major ticks
        slots.push({
          time: timeString,
          displayTime: formatDisplayTime(hour, minute),
          isMajorTick,
        })
      }
    }

    return slots
  }

  const formatTime = (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  const formatDisplayTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const displayMinute = minute.toString().padStart(2, '0')
    return `${displayHour}:${displayMinute} ${period}`
  }

  const timeSlots = generateTimeSlots()

  const handleTimeClick = (timeString: string, event: React.MouseEvent) => {
    onTimeClick(timeString, event)
  }

  const handleKeyDown = (timeString: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onTimeClick(timeString, event as any)
    }
  }

  return (
    <div
      className="flex flex-col bg-background border-r border-border min-w-[144px]"
      data-id={dataId}
      role="navigation"
      aria-label="Timeline axis for event creation"
    >
      <div className="sticky top-0 bg-background border-b border-border p-3 z-10">
        <h3 className="font-lora font-medium text-sm text-foreground">Time</h3>
      </div>
      <div className="flex-1">
        {timeSlots.map((slot, index) => (
          <div
            key={slot.time}
            className={`
              relative border-b border-border cursor-pointer transition-all duration-200
              hover:bg-muted hover:border-primary/20
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
              ${slot.isMajorTick ? 'h-12' : 'h-8'}
            `}
            onClick={(e) => handleTimeClick(slot.time, e)}
            onKeyDown={(e) => handleKeyDown(slot.time, e)}
            tabIndex={0}
            role="button"
            aria-label={`Create event at ${slot.displayTime}`}
          >
            <div className="absolute left-0 top-0 h-full w-full flex items-center px-3">
              <span
                className={`
                  font-inter text-xs transition-colors duration-200
                  ${slot.isMajorTick ? 'font-medium text-foreground' : 'font-normal text-muted-foreground'}
                `}
              >
                {slot.isMajorTick
                  ? slot.displayTime
                  : slot.displayTime.split(' ')[0]}
              </span>
            </div>
            {/* Major tick indicator */}
            {slot.isMajorTick && (
              <div className="absolute left-0 top-0 w-1 h-full bg-primary/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

