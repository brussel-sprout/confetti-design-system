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
  
  // Calculate horizontal offset for stacking - match EventBlock spacing
  const leftOffset = stackIndex * 220 // 220px offset per stack level to match duration events
  
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
          'ml-3 p-3 bg-background border border-border rounded-xl shadow-sm',
          'w-48 transition-all duration-300',
          isSelected && 'ring-2 ring-primary shadow-lg',
          'group-hover:shadow-lg hover:border-primary/30'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {event.title}
            </h4>
            <div className="text-sm text-muted-foreground mt-1 font-medium">
              {formatTime(event.startTime)}
            </div>
          </div>
          
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
        
        {/* Description */}
        {event.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {event.description}
          </p>
        )}
        
        {/* Additional info */}
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
          {event.location && (
            <div className="flex items-center gap-2">
              <Icons.MapPin className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{event.location}</span>
            </div>
          )}
          
          {event.assignedTo && event.assignedTo.length > 0 && (
            <div className="flex items-center gap-2">
              <Icons.Users className="w-4 h-4" />
              <span className="truncate max-w-[100px]">{event.assignedTo[0]}</span>
              {event.assignedTo.length > 1 && (
                <span>+{event.assignedTo.length - 1}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Tasks and elements count */}
        {(event.assignedTasks?.length || event.relatedElements?.length) && (
          <div className="mt-3 flex gap-3 pt-2 border-t border-border">
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
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0 transform -translate-y-2 translate-x-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-lg">
          <Icons.Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}

MilestoneMarker.displayName = 'MilestoneMarker'