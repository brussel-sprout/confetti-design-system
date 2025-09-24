import React from 'react'
import { PartyEvent } from '../../../types/timeline'
import { EventBlock } from '../EventBlock'
import { MilestoneMarker } from '../MilestoneMarker'

interface EventRendererProps {
  event: PartyEvent
  top: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const EventRenderer: React.FC<EventRendererProps> = ({
  event,
  top,
  stackIndex,
  isSelected,
  onClick,
  className
}) => {
  if (event.eventType === 'milestone') {
    return (
      <MilestoneMarker
        event={event}
        top={top}
        stackIndex={stackIndex}
        isSelected={isSelected}
        onClick={onClick}
        className={className}
      />
    )
  }

  // Calculate height based on event duration
  const startTime = new Date(`2000-01-01T${event.startTime}:00`)
  const endTime = event.endTime ? new Date(`2000-01-01T${event.endTime}:00`) : startTime
  const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
  const height = Math.max(durationMinutes * 2, 60) // Minimum height of 60px, 2px per minute

  return (
    <EventBlock
      event={event}
      top={top}
      height={height}
      stackIndex={stackIndex}
      isSelected={isSelected}
      onClick={onClick}
      className={className}
    />
  )
}
