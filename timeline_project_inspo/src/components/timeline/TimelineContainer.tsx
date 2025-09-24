import React, { useState, useMemo } from 'react';
import { PartyEvent } from '../../types/timeline';
import { TimelineAxis } from './TimelineAxis';
import { EventRenderer } from './EventRenderer';
import { SideDrawerModal } from './SideDrawerModal';
import { EventCreationModal } from './EventCreationModal';
import { findOverlapGroups, calculateEventPositions } from '../../utils/timelineUtils';

interface TimelineContainerProps {
  events: PartyEvent[];
  onEventCreate: (event: Omit<PartyEvent, 'id'>) => void;
  onEventUpdate: (event: PartyEvent) => void;
  onEventDelete: (eventId: string) => void;
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  events,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<PartyEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [createAtTime, setCreateAtTime] = useState<string>('');

  // Calculate overlap groups and event positions
  const overlapGroups = useMemo(() => findOverlapGroups(events), [events]);
  const eventPositions = useMemo(() => calculateEventPositions(events, overlapGroups), [events, overlapGroups]);

  const handleTimelineClick = (time: string) => {
    setCreateAtTime(time);
    setIsCreating(true);
  };

  const handleEventCreate = (eventData: Omit<PartyEvent, 'id'>) => {
    onEventCreate(eventData);
    setIsCreating(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex">
        {/* Timeline axis */}
        <div className="flex-shrink-0">
          <TimelineAxis onTimeClick={handleTimelineClick} />
        </div>

        {/* Events area */}
        <div className="flex-1 relative ml-4" style={{ minHeight: '600px' }}>
          {eventPositions.map((position) => (
            <EventRenderer
              key={position.event.id}
              event={position.event}
              top={position.top}
              stackIndex={position.stackIndex}
              isSelected={selectedEvent?.id === position.event.id}
              onClick={() => setSelectedEvent(position.event)}
            />
          ))}
        </div>
      </div>

      {/* Side drawer for event details */}
      <SideDrawerModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onEventUpdate={onEventUpdate}
        onEventDelete={onEventDelete}
      />

      {/* Event creation modal */}
      <EventCreationModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onEventCreate={handleEventCreate}
        defaultTime={createAtTime}
      />
    </div>
  );
};