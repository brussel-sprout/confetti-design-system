import React from 'react';
import { PartyEvent } from '../../types/timeline';
import { 
  Wrench,
  Users,
  Cake,
  Music,
  Trash2
} from 'lucide-react';

interface MilestoneMarkerProps {
  event: PartyEvent;
  top: number;
  stackIndex: number;
  isSelected: boolean;
  onClick: () => void;
}

const milestoneIcons = {
  setup: Wrench,
  activity: Users,
  food: Cake,
  entertainment: Music,
  cleanup: Trash2,
};

const categoryColors = {
  setup: 'bg-orange-500',
  activity: 'bg-blue-500',
  food: 'bg-pink-500',
  entertainment: 'bg-purple-500',
  cleanup: 'bg-gray-500',
};

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  event,
  top,
  stackIndex,
  isSelected,
  onClick,
}) => {
  const Icon = milestoneIcons[event.category];
  const lineLength = 200 + stackIndex * 60;

  return (
    <div className="absolute cursor-pointer flex items-center" style={{ top: top - 6, left: 16, width: `${lineLength + 100}px` }} onClick={onClick}>
      {/* Horizontal connector line */}
      <div 
        className={`h-0.5 transition-colors duration-200 ${isSelected ? 'bg-blue-400' : 'bg-gray-300'}`}
        style={{ width: `${lineLength}px` }}
      />
      
      {/* Milestone marker circle */}
      <div className={`
        relative w-6 h-6 rounded-full flex items-center justify-center -ml-3
        text-white shadow-md transition-all duration-200 ease-in-out z-10
        ${categoryColors[event.category]}
        ${isSelected 
          ? 'ring-2 ring-blue-300 scale-110' 
          : 'hover:scale-105'
        }
      `}>
        <Icon size={12} />
      </div>
      
      {/* Event label */}
      <div className={`
        ml-3 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
        transition-all duration-200
        ${isSelected 
          ? 'bg-blue-100 text-blue-800 border border-blue-300' 
          : 'bg-white text-gray-700 shadow-sm border border-gray-200'
        }
      `}>
        <span className="font-semibold">{event.title}</span>
        <span className="ml-2 text-xs opacity-75">• {event.startTime}</span>
      </div>
    </div>
  );
};