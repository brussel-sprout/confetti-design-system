import React from 'react'
import { cn } from '../../../utils/cn'
import { formatTime, calculateDuration } from '../../../utils/timelineUtils'
import { categoryIcons, categoryColors } from '../../../types/timeline'
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
  const iconName = categoryIcons[event.category]
  
  // Get the icon component dynamically
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  
  // Calculate position and width based on stack - give much more horizontal space
  const leftOffset = stackIndex * 220 // 220px offset per stack level for better spacing
  const width = 200 // Consistent width for all cards
  
  // Determine content visibility based on height
  const showDescription = height > 60
  const showDetails = height > 80
  const showTasks = height > 100 && (event.assignedTasks?.length || event.relatedElements?.length)
  
  return (
    <div
      className={cn(
        'absolute transition-all duration-300 cursor-pointer group',
        'bg-background border border-border rounded-xl shadow-sm p-4',
        'hover:shadow-lg hover:border-primary/30',
        isSelected && 'ring-2 ring-primary shadow-lg scale-[1.02] z-10',
        'hover:scale-[1.01]',
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
      {/* Category colored left border */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-1 rounded-l-xl', categoryStyle.marker)} />
      
      {/* Header with icon and title */}
      <div className="flex items-start gap-3 mb-2">
        {/* Category icon */}
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
          categoryStyle.bg,
          categoryStyle.border
        )}>
          {IconComponent && (
            <IconComponent className={cn('w-4 h-4', categoryStyle.text)} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm leading-tight text-foreground truncate">
              {event.title}
            </h4>
            {/* Priority badge */}
            <div className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
              event.priority === 'critical' && 'bg-red-100 text-red-700 border border-red-200',
              event.priority === 'high' && 'bg-orange-100 text-orange-700 border border-orange-200',
              event.priority === 'medium' && 'bg-yellow-100 text-yellow-700 border border-yellow-200',
              event.priority === 'low' && 'bg-green-100 text-green-700 border border-green-200'
            )}>
              {event.priority}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mt-1 font-medium">
            {formatTime(event.startTime)}
            {event.endTime && (
              <>
                {' - '}
                {formatTime(event.endTime)}
                <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">
                  {calculateDuration(event.startTime, event.endTime)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Description */}
      {showDescription && event.description && (
        <div className="mb-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>
      )}
      
      {/* Additional details */}
      {showDetails && (
        <div className="space-y-2 mb-3">
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.MapPin className="w-4 h-4" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          
          {event.assignedTo && event.assignedTo.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.Users className="w-4 h-4" />
              <span className="truncate">{event.assignedTo.join(', ')}</span>
            </div>
          )}
          
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.User className="w-4 h-4" />
              <span>{event.attendees} attendees</span>
            </div>
          )}
        </div>
      )}
      
      {/* Tasks and elements indicators */}
      {showTasks && (
        <div className="flex gap-3 pt-2 border-t border-border">
          {event.assignedTasks && event.assignedTasks.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.CheckSquare className="w-4 h-4" />
              <span>{event.assignedTasks.length} tasks</span>
            </div>
          )}
          
          {event.relatedElements && event.relatedElements.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icons.Package className="w-4 h-4" />
              <span>{event.relatedElements.length} items</span>
            </div>
          )}
        </div>
      )}
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-lg">
          <Icons.Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}

EventBlock.displayName = 'EventBlock'