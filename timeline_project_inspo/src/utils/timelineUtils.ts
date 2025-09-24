import { PartyEvent } from '../types/timeline';

export interface EventPosition {
  event: PartyEvent;
  top: number;
  stackIndex: number;
}

// Internal interface for date calculations
interface InternalEvent {
  id: string;
  title: string;
  eventType: 'duration' | 'milestone';
  startTime: Date;
  endTime?: Date;
  category: string;
  description?: string;
  tasks?: string[];
  elements?: string[];
}

export interface OverlapGroup {
  events: InternalEvent[];
  startTime: Date;
  endTime: Date;
}

// Helper function to convert HH:mm string to Date object
const createDateFromTimeString = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Helper function to convert PartyEvent to InternalEvent
const convertToInternalEvent = (event: PartyEvent): InternalEvent => {
  return {
    ...event,
    startTime: createDateFromTimeString(event.startTime),
    endTime: event.endTime ? createDateFromTimeString(event.endTime) : undefined
  };
};

export const findOverlapGroups = (events: PartyEvent[]): OverlapGroup[] => {
  // Convert to internal events for date calculations
  const internalEvents = events.map(convertToInternalEvent);
  const sortedEvents = [...internalEvents].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  const groups: OverlapGroup[] = [];

  for (const event of sortedEvents) {
    let addedToGroup = false;

    for (const group of groups) {
      // Check if this event overlaps with any event in the group
      const overlaps = group.events.some(groupEvent => {
        if (event.eventType === 'milestone' || groupEvent.eventType === 'milestone') {
          return false; // Milestones don't overlap with anything
        }
        
        const eventStart = event.startTime.getTime();
        const eventEnd = event.endTime?.getTime() || eventStart;
        const groupEventStart = groupEvent.startTime.getTime();
        const groupEventEnd = groupEvent.endTime?.getTime() || groupEventStart;

        return eventStart < groupEventEnd && eventEnd > groupEventStart;
      });

      if (overlaps) {
        group.events.push(event);
        group.startTime = new Date(Math.min(group.startTime.getTime(), event.startTime.getTime()));
        group.endTime = new Date(Math.max(
          group.endTime.getTime(),
          (event.endTime || event.startTime).getTime()
        ));
        addedToGroup = true;
        break;
      }
    }

    if (!addedToGroup) {
      groups.push({
        events: [event],
        startTime: new Date(event.startTime),
        endTime: new Date((event.endTime || event.startTime).getTime())
      });
    }
  }

  return groups;
};

export const calculateEventPositions = (
  events: PartyEvent[],
  overlapGroups: OverlapGroup[]
): EventPosition[] => {
  const positions: EventPosition[] = [];
  const eventToStackIndex = new Map<string, number>();

  // Create a map of event ID to stack index from overlap groups
  overlapGroups.forEach(group => {
    group.events.forEach((event, index) => {
      eventToStackIndex.set(event.id, index);
    });
  });

  events.forEach(event => {
    const stackIndex = eventToStackIndex.get(event.id) || 0;
    // Convert string time to Date for calculation
    const eventDate = createDateFromTimeString(event.startTime);
    const top = (eventDate.getHours() * 60 + eventDate.getMinutes()) * 2; // 2px per minute

    positions.push({
      event, // Keep original PartyEvent with string times
      top,
      stackIndex
    });
  });

  return positions;
};