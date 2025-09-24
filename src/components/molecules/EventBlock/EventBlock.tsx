import React from 'react'
import { Clock, Utensils, Music, Wrench, Trash2, Calendar, Circle } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { PartyEvent } from '../../../types/timeline'
import { categoryColors, priorityBorders } from '../../../types/timeline'

interface EventBlockProps {
  event: PartyEvent
  top: number
  height: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

const categoryIcons = {
  setup: Wrench,
  activity: Calendar,
  meal: Utensils,
  entertainment: Music,
  cleanup: Trash2,
  other: Circle,
}

export const EventBlock: React.FC<EventBlockProps> = ({
  event,
  top,
  height,
  stackIndex,
  isSelected,
  onClick,
  className
}) => {
  const Icon = categoryIcons[event.category]
  const left = stackIndex * 220 + 16 // Stack horizontally with 220px width + gap
  const width = 200 // Fixed width for better consistency
  const colors = categoryColors[event.category]
  const priorityBorder = priorityBorders[event.priority]

  return (
    <div
      className={cn(
        "absolute cursor-pointer transition-all duration-200 ease-in-out",
        "rounded-lg border shadow-sm hover:shadow-md",
        colors.bg,
        colors.border,
        colors.text,
        priorityBorder,
        isSelected 
          ? 'ring-2 ring-primary shadow-lg scale-105 z-20' 
          : 'hover:scale-102 z-10',
        className
      )}
      style={{
        top: `${top}px`,
        left: `${left}px`,
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
          {event.priority === 'critical' && (
            <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0" />
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
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
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
  )
}
