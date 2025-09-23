import React from 'react'
import { cn } from '../../../utils/cn'
import { formatTime } from '../../../utils/timelineUtils'
import { milestoneIcons, categoryColors } from '../../../types/timeline'
import type { PartyEvent } from '../../../types/timeline'
import * as Icons from 'lucide-react'

export interface MilestoneMarkerProps {
  event: PartyEvent
  top: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  event,
  top,
  stackIndex,
  isSelected,
  onClick,
  className = ''
}) => {
  const categoryStyle = categoryColors[event.category]
  const iconName = milestoneIcons[event.category]
  
  // Get the icon component dynamically
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  
  // Calculate horizontal offset for stacking
  const leftOffset = stackIndex * 8 // 8px offset per stack level
  
  return (
    <div
      className={cn('absolute flex items-center cursor-pointer group transition-all duration-200', className)}
      style={{
        top: `${top - 12}px`, // Center the 24px marker
        left: `${leftOffset}px`
      }}
      onClick={onClick}
    >
      {/* Connection line to timeline axis */}
      <div 
        className={cn(
          'h-px bg-border group-hover:bg-primary/50 transition-colors',
          isSelected && 'bg-blue-500'
        )}
        style={{ width: `${Math.max(40 - leftOffset, 20)}px` }}
      />
      
      {/* Milestone marker circle */}
      <div
        className={cn(
          'relative w-6 h-6 rounded-full border-2 border-white shadow-sm',
          'flex items-center justify-center transition-all duration-200',
          categoryStyle.marker,
          isSelected && 'ring-2 ring-blue-300 scale-110 z-10',
          'hover:scale-105 hover:shadow-md'
        )}
      >
        {IconComponent && (
          <IconComponent className="w-3 h-3 text-white" />
        )}
        
        {/* Priority indicator dot */}
        <div className={cn(
          'absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white',
          event.priority === 'critical' && 'bg-red-500',
          event.priority === 'high' && 'bg-orange-500',
          event.priority === 'medium' && 'bg-yellow-500',
          event.priority === 'low' && 'bg-green-500'
        )} />
      </div>
      
      {/* Event details panel */}
      <div
        className={cn(
          'ml-3 p-2 bg-background border border-border rounded-lg shadow-sm',
          'min-w-0 max-w-xs transition-all duration-200',
          isSelected && 'ring-1 ring-blue-300 shadow-md',
          'group-hover:shadow-md'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-foreground truncate">
              {event.title}
            </h4>
            <div className="text-xs text-muted-foreground mt-0.5">
              {formatTime(event.startTime)}
            </div>
          </div>
          
          {/* Event type badge */}
          <div className={cn(
            'flex-shrink-0 px-1.5 py-0.5 text-xs font-medium rounded',
            categoryStyle.bg,
            categoryStyle.text,
            'border',
            categoryStyle.border
          )}>
            {event.category}
          </div>
        </div>
        
        {/* Description */}
        {event.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {event.description}
          </p>
        )}
        
        {/* Additional info */}
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {event.location && (
            <div className="flex items-center gap-1">
              <Icons.MapPin className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{event.location}</span>
            </div>
          )}
          
          {event.assignedTo && event.assignedTo.length > 0 && (
            <div className="flex items-center gap-1">
              <Icons.User className="w-3 h-3" />
              <span className="truncate max-w-[60px]">{event.assignedTo[0]}</span>
              {event.assignedTo.length > 1 && (
                <span>+{event.assignedTo.length - 1}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Tasks and elements count */}
        {(event.assignedTasks?.length || event.relatedElements?.length) && (
          <div className="mt-1 flex gap-2">
            {event.assignedTasks && event.assignedTasks.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icons.CheckSquare className="w-3 h-3" />
                <span>{event.assignedTasks.length}</span>
              </div>
            )}
            
            {event.relatedElements && event.relatedElements.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icons.Package className="w-3 h-3" />
                <span>{event.relatedElements.length}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 left-8 transform -translate-y-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <Icons.Check className="w-2 h-2 text-white" />
        </div>
      )}
    </div>
  )
}

MilestoneMarker.displayName = 'MilestoneMarker'