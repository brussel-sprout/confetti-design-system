import React from 'react'
import { cn } from '../../../utils/cn'
import { formatTime, calculateDuration } from '../../../utils/timelineUtils'
import { categoryIcons, categoryColors, priorityBorders } from '../../../types/timeline'
import type { PartyEvent } from '../../../types/timeline'
import * as Icons from 'lucide-react'

export interface EventBlockProps {
  event: PartyEvent
  top: number
  height: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const EventBlock: React.FC<EventBlockProps> = ({
  event,
  top,
  height,
  stackIndex,
  isSelected,
  onClick,
  className = ''
}) => {
  const categoryStyle = categoryColors[event.category]
  const priorityBorder = priorityBorders[event.priority]
  const iconName = categoryIcons[event.category]
  
  // Get the icon component dynamically
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  
  // Calculate position and width based on stack
  const leftOffset = stackIndex * 10 // 10px offset per stack level
  const width = Math.max(200 - (stackIndex * 10), 120) // Minimum width of 120px
  
  // Determine content visibility based on height
  const showDescription = height > 60
  const showDetails = height > 80
  const showTasks = height > 100 && (event.assignedTasks?.length || event.relatedElements?.length)
  
  return (
    <div
      className={cn(
        'absolute transition-all duration-200 cursor-pointer group',
        'border rounded-lg shadow-sm',
        categoryStyle.bg,
        categoryStyle.border,
        priorityBorder,
        'border-l-orange-500', // Priority color based on category
        isSelected && 'ring-2 ring-blue-500 shadow-lg scale-105 z-10',
        'hover:shadow-md hover:scale-102',
        className
      )}
      style={{
        top: `${top}px`,
        left: `${leftOffset}px`,
        width: `${width}px`,
        height: `${height}px`,
        minHeight: '30px'
      }}
      onClick={onClick}
    >
      {/* Header with icon and title */}
      <div className="flex items-start gap-2 p-2 pb-1">
        {IconComponent && (
          <IconComponent className={cn('w-4 h-4 mt-0.5 flex-shrink-0', categoryStyle.text)} />
        )}
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-medium text-sm leading-tight truncate', categoryStyle.text)}>
            {event.title}
          </h4>
          <div className="text-xs text-muted-foreground mt-0.5">
            {formatTime(event.startTime)}
            {event.endTime && (
              <>
                {' - '}
                {formatTime(event.endTime)}
                <span className="ml-1 text-xs opacity-75">
                  ({calculateDuration(event.startTime, event.endTime)})
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Priority indicator */}
        <div className={cn(
          'w-2 h-2 rounded-full flex-shrink-0 mt-1',
          event.priority === 'critical' && 'bg-red-500',
          event.priority === 'high' && 'bg-orange-500',
          event.priority === 'medium' && 'bg-yellow-500',
          event.priority === 'low' && 'bg-green-500'
        )} />
      </div>
      
      {/* Description */}
      {showDescription && event.description && (
        <div className="px-2 pb-1">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>
      )}
      
      {/* Additional details */}
      {showDetails && (
        <div className="px-2 pb-1 space-y-1">
          {event.location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.MapPin className="w-3 h-3" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          
          {event.assignedTo && event.assignedTo.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.Users className="w-3 h-3" />
              <span className="truncate">{event.assignedTo.join(', ')}</span>
            </div>
          )}
          
          {event.attendees && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.User className="w-3 h-3" />
              <span>{event.attendees} attendees</span>
            </div>
          )}
        </div>
      )}
      
      {/* Tasks and elements indicators */}
      {showTasks && (
        <div className="px-2 pb-2 flex gap-2">
          {event.assignedTasks && event.assignedTasks.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.CheckSquare className="w-3 h-3" />
              <span>{event.assignedTasks.length} tasks</span>
            </div>
          )}
          
          {event.relatedElements && event.relatedElements.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.Package className="w-3 h-3" />
              <span>{event.relatedElements.length} items</span>
            </div>
          )}
        </div>
      )}
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <Icons.Check className="w-2.5 h-2.5 text-white" />
        </div>
      )}
    </div>
  )
}

EventBlock.displayName = 'EventBlock'