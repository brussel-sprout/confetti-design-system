import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineAxisProps {
  timeScale: '30min' | '15min' | '5min';
  onTimeClick: (time: string, event: React.MouseEvent) => void;
}

export const TimelineAxis: React.FC<TimelineAxisProps> = ({ 
  timeScale, 
  onTimeClick 
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const intervalMinutes = timeScale === '30min' ? 30 : timeScale === '15min' ? 15 : 5;
    
    // Generate from 9 AM to 11 PM
    for (let hour = 9; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: minute === 0 ? undefined : '2-digit',
          hour12: true
        });
        
        slots.push({
          time,
          displayTime,
          isHour: minute === 0,
          isMajor: minute === 0 || (intervalMinutes <= 15 && minute % 30 === 0)
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="timeline-axis w-24 bg-white border-r border-gray-200 flex flex-col relative">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-3 z-10">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock size={16} />
          <span>Timeline</span>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {timeSlots.map((slot, index) => (
          <div
            key={slot.time}
            className={`
              timeline-clickable relative cursor-pointer hover:bg-gray-50 transition-colors
              ${slot.isMajor ? 'h-12' : 'h-6'}
              border-b border-gray-100
            `}
            onClick={(e) => onTimeClick(slot.time, e)}
            data-time={slot.time}
          >
            {slot.isMajor && (
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <span className={`
                  text-xs font-medium
                  ${slot.isHour ? 'text-gray-900' : 'text-gray-600'}
                `}>
                  {slot.displayTime}
                </span>
              </div>
            )}
            
            {/* Time marker line */}
            <div className={`
              absolute right-0 top-0 w-2 h-px bg-gray-300
              ${slot.isMajor ? 'bg-gray-400' : 'bg-gray-200'}
            `} />
          </div>
        ))}
      </div>
    </div>
  );
};