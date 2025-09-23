import React from 'react'
import { EventBlock } from './EventBlock'
import { MilestoneMarker } from './MilestoneMarker'
import type { PartyEvent } from '../../../types/timeline'

export interface EventRendererProps {
  event: PartyEvent
  top: number
  height: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const EventRenderer: React.FC<EventRendererProps> = ({
  event,
  top,
  height,
  stackIndex,
  isSelected,
  onClick,
  className = ''
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
  
  // Height is now passed from parent TimelineContainer based on calculations
  
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

EventRenderer.displayName = 'EventRenderer'