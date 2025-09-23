import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { cn } from '../../../utils/cn'
import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'
import { Edit3, Trash2, MapPin, Users, ChevronDown, ChevronRight } from 'lucide-react'
import type { TimelineEvent } from '../TimelineItem/TimelineItem'

export interface MilestoneMarkerProps {
  event: TimelineEvent
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  onEdit?: (event: TimelineEvent) => void
  onDelete?: (eventId: string) => void
  defaultExpanded?: boolean
  className?: string
}

// Icon mapping for milestone events
const milestoneIcons = {
  setup: 'Wrench',
  activity: 'Calendar', 
  meal: 'Utensils',
  entertainment: 'Music',
  cleanup: 'Broom',
  other: 'Circle'
} as const

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  event,
  stackIndex,
  isSelected,
  onClick,
  onEdit,
  onDelete,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }
  const iconName = milestoneIcons[event.category]
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  
  const getCategoryColor = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'setup':
        return {
          bg: 'bg-orange-500',
          ring: 'ring-orange-300',
          border: 'border-orange-300'
        }
      case 'activity':
        return {
          bg: 'bg-blue-500', 
          ring: 'ring-blue-300',
          border: 'border-blue-300'
        }
      case 'meal':
        return {
          bg: 'bg-pink-500',
          ring: 'ring-pink-300', 
          border: 'border-pink-300'
        }
      case 'entertainment':
        return {
          bg: 'bg-purple-500',
          ring: 'ring-purple-300',
          border: 'border-purple-300'
        }
      case 'cleanup':
        return {
          bg: 'bg-green-500',
          ring: 'ring-green-300',
          border: 'border-green-300'
        }
      default:
        return {
          bg: 'bg-gray-500',
          ring: 'ring-gray-300', 
          border: 'border-gray-300'
        }
    }
  }

  const getPriorityColor = (priority: TimelineEvent['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground'
      case 'high':
        return 'bg-warning text-warning-foreground'
      case 'medium':
        return 'bg-info text-info-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const categoryStyle = getCategoryColor(event.category)
  
  // Calculate horizontal offset for stacking overlapping milestones
  const leftOffset = stackIndex * 40 // 40px offset per stack level

  return (
    <div
      className={cn('relative flex items-center cursor-pointer group transition-all duration-200', className)}
      style={{
        marginLeft: `${leftOffset}px`
      }}
      onClick={onClick}
    >
      {/* Connection line to timeline axis */}
      <div 
        className={cn(
          'h-px bg-border group-hover:bg-primary/50 transition-colors w-8',
          isSelected && 'bg-primary'
        )}
      />
      
      {/* Milestone marker circle */}
      <div
        className={cn(
          'relative w-8 h-8 rounded-full border-2 border-white shadow-sm',
          'flex items-center justify-center transition-all duration-200',
          categoryStyle.bg,
          isSelected && `ring-2 ${categoryStyle.ring} scale-110 z-10`,
          'hover:scale-105 hover:shadow-md'
        )}
      >
        {IconComponent && (
          <IconComponent className="w-4 h-4 text-white" />
        )}
        
        {/* Priority indicator dot */}
        <div className={cn(
          'absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white',
          event.priority === 'critical' && 'bg-red-500',
          event.priority === 'high' && 'bg-orange-500', 
          event.priority === 'medium' && 'bg-yellow-500',
          event.priority === 'low' && 'bg-green-500'
        )} />
      </div>
      
      {/* Event details panel */}
      <div
        className={cn(
          'ml-3 bg-background border border-border rounded-xl shadow-sm cursor-pointer',
          'min-w-0 max-w-sm transition-all duration-200 group',
          isSelected && 'ring-2 ring-primary shadow-lg',
          'hover:shadow-md hover:border-primary/30',
          isExpanded ? 'p-3' : 'p-2'
        )}
        onClick={handleToggleExpanded}
      >
        {/* Collapsed Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            )}
            <h4 className="font-semibold text-sm text-foreground truncate">
              {event.title}
            </h4>
            <div className="text-sm text-muted-foreground font-medium">
              {formatTime(event.startTime)}
            </div>
          </div>
          
          <Badge size="sm" variant="outline" className={getPriorityColor(event.priority)}>
            {event.priority}
          </Badge>
          
          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(event)
                }}
                className="h-6 w-6 p-0"
              >
                <Edit3 className="w-3 h-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(event.id)
                }}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-border space-y-2">
            {/* Category badge */}
            <div className="flex items-center gap-2">
              <Badge size="sm" className="text-xs">
                {event.category}
              </Badge>
            </div>
            
            {/* Description */}
            {event.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            )}
            
            {/* Additional info */}
            {(event.location || event.assignedTo?.length) && (
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[100px]">{event.location}</span>
                  </div>
                )}
                
                {event.assignedTo && event.assignedTo.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span className="truncate max-w-[80px]">{event.assignedTo[0]}</span>
                    {event.assignedTo.length > 1 && (
                      <span>+{event.assignedTo.length - 1}</span>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Tasks and elements count */}
            {(event.assignedTasks?.length || event.relatedElements?.length) && (
              <div className="pt-2 border-t border-border flex gap-3">
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
          </div>
        )}
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0 transform -translate-y-2 translate-x-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-lg">
          <Icons.Check className="w-2.5 h-2.5 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}

MilestoneMarker.displayName = 'MilestoneMarker'