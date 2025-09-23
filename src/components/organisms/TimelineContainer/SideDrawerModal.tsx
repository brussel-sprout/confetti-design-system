import React from 'react'
import { cn } from '../../../utils/cn'
import { formatTime, calculateDuration } from '../../../utils/timelineUtils'
import { categoryColors, priorityBorders } from '../../../types/timeline'
import type { PartyEvent } from '../../../types/timeline'
import { Modal } from '../../atoms/Modal'
import { Button } from '../../atoms/Button'
import { Badge } from '../../atoms/Badge'
import * as Icons from 'lucide-react'

export interface SideDrawerModalProps {
  isOpen: boolean
  onClose: () => void
  event: PartyEvent | null
  onEventUpdate: (event: PartyEvent) => void
  onEventDelete: (eventId: string) => void
  className?: string
}

export const SideDrawerModal: React.FC<SideDrawerModalProps> = ({
  isOpen,
  onClose,
  event,
  onEventUpdate,
  onEventDelete,
  className = ''
}) => {
  if (!event) return null

  const categoryStyle = categoryColors[event.category]
  const duration = event.endTime ? calculateDuration(event.startTime, event.endTime) : null

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onEventDelete(event.id)
      onClose()
    }
  }

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit event:', event)
    // TODO: Implement edit modal or inline editing
  }

  const priorityLabels = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority',
    critical: 'Critical'
  }

  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'destructive',
    critical: 'destructive'
  } as const

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn('max-w-md', className)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                'w-3 h-3 rounded-full',
                categoryStyle.marker
              )} />
              <Badge variant="secondary" className={cn(categoryStyle.bg, categoryStyle.text)}>
                {event.category}
              </Badge>
              <Badge variant={priorityColors[event.priority]}>
                {priorityLabels[event.priority]}
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              {event.title}
            </h2>
            <div className="text-sm text-muted-foreground">
              {event.eventType === 'milestone' ? 'Milestone Event' : 'Duration Event'}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <Icons.X className="w-4 h-4" />
          </Button>
        </div>

        {/* Time Information */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Icons.Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">Schedule</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Start Time:</span>
              <span className="text-sm font-medium">{formatTime(event.startTime)}</span>
            </div>
            {event.endTime && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">End Time:</span>
                  <span className="text-sm font-medium">{formatTime(event.endTime)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium">{duration}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div className="mb-6">
            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Icons.FileText className="w-4 h-4" />
              Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Location and People */}
        {(event.location || event.assignedTo || event.attendees) && (
          <div className="mb-6">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Icons.MapPin className="w-4 h-4" />
              Details
            </h3>
            <div className="space-y-2">
              {event.location && (
                <div className="flex items-center gap-2">
                  <Icons.MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{event.location}</span>
                </div>
              )}
              {event.assignedTo && event.assignedTo.length > 0 && (
                <div className="flex items-start gap-2">
                  <Icons.Users className="w-3 h-3 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Assigned to: </span>
                    {event.assignedTo.join(', ')}
                  </div>
                </div>
              )}
              {event.attendees && (
                <div className="flex items-center gap-2">
                  <Icons.User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{event.attendees} attendees expected</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tasks and Elements */}
        {(event.assignedTasks?.length || event.relatedElements?.length) && (
          <div className="mb-6">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Icons.List className="w-4 h-4" />
              Related Items
            </h3>
            <div className="space-y-3">
              {event.assignedTasks && event.assignedTasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icons.CheckSquare className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium">Tasks ({event.assignedTasks.length})</span>
                  </div>
                  <ul className="space-y-1 ml-5">
                    {event.assignedTasks.map((task, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {event.relatedElements && event.relatedElements.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icons.Package className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium">Elements ({event.relatedElements.length})</span>
                  </div>
                  <ul className="space-y-1 ml-5">
                    {event.relatedElements.map((element, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {event.notes && (
          <div className="mb-6">
            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Icons.Sticky className="w-4 h-4" />
              Notes
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex-1"
          >
            <Icons.Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
          >
            <Icons.Trash className="w-4 h-4 mr-2" />
            Delete Event
          </Button>
        </div>
      </div>
    </Modal>
  )
}

SideDrawerModal.displayName = 'SideDrawerModal'