import React from 'react'
import { X, Clock, AlertCircle, CheckSquare, Package } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { PartyEvent } from '../../../types/timeline'
import { categoryColors } from '../../../types/timeline'

interface SideDrawerModalProps {
  isOpen: boolean
  onClose: () => void
  event: PartyEvent | null
  onEventUpdate?: (event: PartyEvent) => void
  onEventDelete?: (eventId: string) => void
  className?: string
}

export const SideDrawerModal: React.FC<SideDrawerModalProps> = ({
  isOpen,
  onClose,
  event,
  onEventUpdate,
  onEventDelete,
  className
}) => {
  if (!event) return null

  const priorityColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-destructive/10 text-destructive',
  }

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 w-96 bg-background shadow-2xl border-l border-border",
      "transform transition-transform duration-300 ease-in-out z-50",
      isOpen ? 'translate-x-0' : 'translate-x-full',
      className
    )}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Event Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Event Title and Type */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                event.eventType === 'milestone' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              )}>
                {event.eventType === 'milestone' ? 'Milestone' : 'Duration Event'}
              </span>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                categoryColors[event.category].bg,
                categoryColors[event.category].text
              )}>
                {event.category}
              </span>
            </div>
            {event.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {event.description}
              </p>
            )}
          </div>

          {/* Time Information */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Schedule</h4>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-sm">
                <span className="font-medium">Start:</span> {event.startTime}
              </div>
              {event.endTime && (
                <div className="text-sm mt-1">
                  <span className="font-medium">End:</span> {event.endTime}
                </div>
              )}
              {event.endTime && (
                <div className="text-xs text-muted-foreground mt-2">
                  Duration: {(() => {
                    const start = new Date(`2000-01-01T${event.startTime}:00`)
                    const end = new Date(`2000-01-01T${event.endTime}:00`)
                    const diff = end.getTime() - start.getTime()
                    const minutes = Math.round(diff / (1000 * 60))
                    const hours = Math.floor(minutes / 60)
                    const mins = minutes % 60
                    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Priority</h4>
            </div>
            <span className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-medium",
              priorityColors[event.priority]
            )}>
              {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
            </span>
          </div>

          {/* Related Tasks */}
          {event.assignedTasks && event.assignedTasks.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare size={16} className="text-muted-foreground" />
                <h4 className="font-medium text-foreground">
                  Related Tasks ({event.assignedTasks.length})
                </h4>
              </div>
              <div className="space-y-2">
                {event.assignedTasks.map((taskId, index) => (
                  <div key={taskId} className="bg-muted rounded-lg p-3">
                    <div className="text-sm font-medium text-foreground">
                      Task #{index + 1}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ID: {taskId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Elements */}
          {event.relatedElements && event.relatedElements.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-muted-foreground" />
                <h4 className="font-medium text-foreground">
                  Party Elements ({event.relatedElements.length})
                </h4>
              </div>
              <div className="space-y-2">
                {event.relatedElements.map((elementId, index) => (
                  <div key={elementId} className="bg-muted rounded-lg p-3">
                    <div className="text-sm font-medium text-foreground">
                      Element #{index + 1}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ID: {elementId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex gap-3">
            {onEventUpdate && (
              <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Edit Event
              </button>
            )}
            {onEventDelete && (
              <button 
                onClick={() => {
                  onEventDelete(event.id)
                  onClose()
                }}
                className="px-4 py-2 text-destructive border border-destructive/20 rounded-lg font-medium hover:bg-destructive/10 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
