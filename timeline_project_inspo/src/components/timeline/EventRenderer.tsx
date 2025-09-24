import React from 'react';
import { PartyEvent } from '../../types/timeline';
import { EventBlock } from './EventBlock';
import { MilestoneMarker } from './MilestoneMarker';

interface EventRendererProps {
  event: PartyEvent;
  top: number;
  stackIndex: number;
  isSelected: boolean;
  onClick: () => void;
}

export const EventRenderer: React.FC<EventRendererProps> = ({
  event,
  top,
  stackIndex,
  isSelected,
  onClick,
}) => {
  if (event.eventType === 'milestone') {
    return (
      <MilestoneMarker
        event={event}
        top={top}
        stackIndex={stackIndex}
        isSelected={isSelected}
        onClick={onClick}
      />
    );
  }

  return (
    <EventBlock
      event={event}
      top={top}
      stackIndex={stackIndex}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};