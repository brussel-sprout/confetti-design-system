export interface PartyEvent {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO time string (HH:mm)
  endTime?: string; // ISO time string (HH:mm), null for milestone events
  eventType: 'milestone' | 'duration';
  category: 'setup' | 'activity' | 'food' | 'entertainment' | 'cleanup';
  priority: 'low' | 'medium' | 'high';
  assignedTasks?: string[];
  relatedElements?: string[];
  color: string;
}

export interface TimelinePosition {
  top: number;
  height: number;
  stackIndex: number;
}

export interface OverlapGroup {
  events: PartyEvent[];
  startTime: string;
  endTime: string;
}