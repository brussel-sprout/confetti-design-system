import React from 'react';
import { PartyEvent } from '../../types/timeline';
import { Clock, Users, Utensils, Music, Wrench, Trash2 } from 'lucide-react';

interface EventBlockProps {
  event: PartyEvent;
  top: number;
  height: number;
  stackIndex: number;
  isSelected: boolean;
  onClick: () => void;
}

const categoryIcons = {
  setup: Wrench,
  activity: Users,
  food: Utensils,
  entertainment: Music,
  cleanup: Trash2,
};

const categoryColors = {
  setup: 'bg-orange-100 border-orange-300 text-orange-800',
  activity: 'bg-blue-100 border-blue-300 text-blue-800',
  food: 'bg-green-100 border-green-300 text-green-800',
  entertainment: 'bg-purple-100 border-purple-300 text-purple-800',
  cleanup: 'bg-gray-100 border-gray-300 text-gray-800',
};

const priorityBorders = {
  low: 'border-l-2',
  medium: 'border-l-4',
  high: 'border-l-8',
};

export const EventBlock: React.FC<EventBlockProps> = ({
  event,
  top,
  height,
  stackIndex,
  isSelected,
  onClick,
}) => {
  const Icon = categoryIcons[event.category];
  const left = stackIndex * 200 + 16; // Stack horizontally with 200px width + gap
  const width = 184; // Slightly less than stack width for visual separation

  return (
    <div
      className={`
        absolute cursor-pointer transition-all duration-200 ease-in-out
        rounded-lg border shadow-sm hover:shadow-md
        ${categoryColors[event.category]}
        ${priorityBorders[event.priority]}
        ${isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg scale-105 z-20' 
          : 'hover:scale-102 z-10'
        }
      `}
      style={{
        top,
        left,
        width,
        height: Math.max(height, 60), // Minimum height for readability
        zIndex: isSelected ? 20 : 10 + stackIndex,
      }}
      onClick={onClick}
    >
      <div className="p-3 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Icon size={16} className="flex-shrink-0" />
            <h3 className="font-semibold text-sm truncate">
              {event.title}
            </h3>
          </div>
          {event.priority === 'high' && (
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
          )}
        </div>

        {/* Time */}
        <div className="flex items-center gap-1 text-xs mb-2">
          <Clock size={12} />
          <span>
            {event.startTime}
            {event.endTime && ` - ${event.endTime}`}
          </span>
        </div>

        {/* Description */}
        {event.description && height >= 80 && (
          <p className="text-xs text-gray-600 line-clamp-2 flex-1">
            {event.description}
          </p>
        )}

        {/* Footer indicators */}
        {height >= 100 && (
          <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-current border-opacity-20">
            {event.assignedTasks && event.assignedTasks.length > 0 && (
              <span className="text-xs">
                {event.assignedTasks.length} tasks
              </span>
            )}
            {event.relatedElements && event.relatedElements.length > 0 && (
              <span className="text-xs">
                {event.relatedElements.length} items
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};