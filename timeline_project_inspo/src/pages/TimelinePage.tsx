import React, { useState } from 'react';
import { TimelineContainer } from '../components/timeline/TimelineContainer';
import { PartyEvent } from '../types/timeline';
import { mockEvents } from '../data/mockEvents';
import { Calendar, Users, Clock } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const [events, setEvents] = useState<PartyEvent[]>(mockEvents);

  const handleEventCreate = (eventData: Omit<PartyEvent, 'id'>) => {
    const newEvent: PartyEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    ));
  };

  const handleEventUpdate = (updatedEvent: PartyEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const stats = {
    totalEvents: events.length,
    milestones: events.filter(e => e.eventType === 'milestone').length,
    durationEvents: events.filter(e => e.eventType === 'duration').length,
    highPriority: events.filter(e => e.priority === 'high').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="text-blue-600" size={28} />
                Party Timeline
              </h1>
              <p className="text-gray-600 mt-1">
                Interactive timeline for your birthday party planning
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
                <div className="text-xs text-gray-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.milestones}</div>
                <div className="text-xs text-gray-600">Milestones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.durationEvents}</div>
                <div className="text-xs text-gray-600">Duration Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
                <div className="text-xs text-gray-600">High Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="px-6 py-3">
          <div className="flex items-center gap-4 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Click on timeline to add events</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Click on events for details</span>
            </div>
            <div className="text-blue-600">
              Overlapping events stack horizontally • Milestones appear as markers
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        <TimelineContainer
          events={events}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
    </div>
  );
};