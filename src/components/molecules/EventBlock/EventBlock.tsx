import React, { useEffect, useState, useRef } from 'react'
import { Clock, GripVertical, Lightbulb, Check, X } from 'lucide-react'
import type { TimelineEvent } from './types'

export interface EventBlockProps {
  event: TimelineEvent
  startTime: Date
  endTime: Date
  pixelsPerMinute: number
  stackIndex?: number
  totalStacks?: number
  isSelected?: boolean
  isDimmed?: boolean
  onClick?: () => void
  onTimeChange?: (eventId: string, newStart: Date, newEnd: Date) => void
  'data-id'?: string
}

const suggestionStatusConfig = {
  pending: {
    bgClass: 'bg-amber-50',
    barClass: 'bg-amber-500',
    badgeBgClass: 'bg-amber-50',
    badgeTextClass: 'text-amber-700',
    label: 'Pending',
    icon: Lightbulb,
  },
  approved: {
    bgClass: 'bg-green-50',
    barClass: 'bg-green-500',
    badgeBgClass: 'bg-green-50',
    badgeTextClass: 'text-green-700',
    label: 'Approved',
    icon: Check,
  },
  rejected: {
    bgClass: 'bg-red-50',
    barClass: 'bg-red-500',
    badgeBgClass: 'bg-red-50',
    badgeTextClass: 'text-red-700',
    label: 'Rejected',
    icon: X,
  },
}

export function EventBlock({
  event,
  startTime,
  endTime,
  pixelsPerMinute,
  stackIndex = 0,
  totalStacks = 1,
  isSelected = false,
  isDimmed = false,
  onClick,
  onTimeChange,
  'data-id': dataId,
}: EventBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragType, setDragType] = useState<
    'move' | 'resize-top' | 'resize-bottom' | null
  >(null)
  const [dragStartY, setDragStartY] = useState(0)
  const [originalStart, setOriginalStart] = useState<Date | null>(null)
  const [originalEnd, setOriginalEnd] = useState<Date | null>(null)
  const blockRef = useRef<HTMLDivElement>(null)

  // Calculate position and height
  const eventStart = event.absoluteStart.getTime()
  const eventEnd = event.absoluteEnd.getTime()
  const timelineStart = startTime.getTime()
  const timelineEnd = endTime.getTime()

  const startMinutes = (eventStart - timelineStart) / (1000 * 60)
  const durationMinutes = (eventEnd - eventStart) / (1000 * 60)

  const topOffset = startMinutes * pixelsPerMinute
  const height = Math.max(durationMinutes * pixelsPerMinute, 48)

  // Calculate width and left offset for stacking
  const width = totalStacks > 1 ? `${100 / totalStacks}%` : '100%'
  const leftOffset =
    totalStacks > 1 ? `${(stackIndex / totalStacks) * 100}%` : '0%'

	// TODO: Adjust default statusConfig styling later
	// Currently all events use the approved status config as default
	// const statusConfig = suggestionStatusConfig.approved
	const statusConfig = null
    //   const statusConfig = event.is_suggestion
	//   ? suggestionStatusConfig[event.suggestion_status]
	//   : null

  const handleClick = () => {
    if (isDragging) return
    if (onClick) {
      onClick()
    }
    setIsExpanded(!isExpanded)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDuration = () => {
    const hours = Math.floor(durationMinutes / 60)
    const mins = Math.round(durationMinutes % 60)
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`
    if (hours > 0) return `${hours}h`
    return `${mins}m`
  }

  const handleDragStart = (
    e: React.MouseEvent,
    type: 'move' | 'resize-top' | 'resize-bottom',
  ) => {
    e.stopPropagation()
    setIsDragging(true)
    setDragType(type)
    setDragStartY(e.clientY)
    setOriginalStart(event.absoluteStart)
    setOriginalEnd(event.absoluteEnd)
  }

  useEffect(() => {
    if (!isDragging || !dragType || !originalStart || !originalEnd) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartY
      const deltaMinutes = deltaY / pixelsPerMinute

      let newStart = new Date(originalStart)
      let newEnd = new Date(originalEnd)

      if (dragType === 'move') {
        newStart = new Date(originalStart.getTime() + deltaMinutes * 60 * 1000)
        newEnd = new Date(originalEnd.getTime() + deltaMinutes * 60 * 1000)
      } else if (dragType === 'resize-top') {
        newStart = new Date(originalStart.getTime() + deltaMinutes * 60 * 1000)
        if (newStart.getTime() >= originalEnd.getTime() - 15 * 60 * 1000) {
          newStart = new Date(originalEnd.getTime() - 15 * 60 * 1000)
        }
      } else if (dragType === 'resize-bottom') {
        newEnd = new Date(originalEnd.getTime() + deltaMinutes * 60 * 1000)
        if (newEnd.getTime() <= originalStart.getTime() + 15 * 60 * 1000) {
          newEnd = new Date(originalStart.getTime() + 15 * 60 * 1000)
        }
      }

      // Snap to 5-minute intervals
      newStart = new Date(
        Math.round(newStart.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000),
      )
      newEnd = new Date(
        Math.round(newEnd.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000),
      )

      // Keep within timeline bounds
      if (newStart.getTime() < timelineStart) {
        const offset = timelineStart - newStart.getTime()
        newStart = new Date(timelineStart)
        if (dragType === 'move') {
          newEnd = new Date(newEnd.getTime() + offset)
        }
      }
      if (newEnd.getTime() > timelineEnd) {
        const offset = newEnd.getTime() - timelineEnd
        newEnd = new Date(timelineEnd)
        if (dragType === 'move') {
          newStart = new Date(newStart.getTime() - offset)
        }
      }

      if (onTimeChange) {
        onTimeChange(event.id, newStart, newEnd)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setDragType(null)
      setOriginalStart(null)
      setOriginalEnd(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    isDragging,
    dragType,
    dragStartY,
    originalStart,
    originalEnd,
    pixelsPerMinute,
    onTimeChange,
    event.id,
    timelineStart,
    timelineEnd,
  ])

  return (
    <div
      ref={blockRef}
      data-id={dataId}
      className="absolute transition-all duration-300"
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
        width,
        left: leftOffset,
      }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div
          className="absolute -left-2 w-1 rounded-full bg-primary"
          style={{
            height: '100%',
          }}
        />
      )}

      {/* Main event card */}
      <div
        className={`
          relative h-full mx-1 rounded-lg border-2 overflow-hidden
          transition-all duration-300 cursor-pointer group
          ${isSelected ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border hover:border-primary/40 hover:shadow-md'}
          ${isDimmed ? 'opacity-40' : 'opacity-100'}
          ${isDragging ? 'opacity-70 shadow-2xl' : ''}
          ${statusConfig ? statusConfig.bgClass : isSelected ? 'bg-stone-50' : 'bg-white'}
        `}
        onClick={handleClick}
      >
        {/* Top resize handle */}
        {onTimeChange && (
          <div
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors flex items-center justify-center group/handle"
            onMouseDown={(e) => handleDragStart(e, 'resize-top')}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="opacity-0 group-hover/handle:opacity-100 transition-opacity">
              <GripVertical className="w-3 h-3 text-primary" />
            </div>
          </div>
        )}

        {/* Status indicator bar */}
        {statusConfig && (
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 ${statusConfig.barClass}`}
          />
        )}

        {/* Content */}
        <div
          className={`h-full ${statusConfig ? 'pl-3' : 'pl-2'} pr-2 py-2 flex flex-col ${onTimeChange ? 'cursor-move' : ''}`}
          onMouseDown={(e) => onTimeChange && handleDragStart(e, 'move')}
        >
          {/* Header with title and status */}
          <div className="flex items-start gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h4 className="font-lora font-semibold text-sm text-foreground leading-tight">
                {event.event_name}
              </h4>
            </div>
            {statusConfig && (
              <div
                className={`flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${statusConfig.badgeBgClass} ${statusConfig.badgeTextClass}`}
              >
                <statusConfig.icon className="w-3 h-3" />
                <span>{statusConfig.label}</span>
              </div>
            )}
          </div>

          {/* Time and duration info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {formatTime(event.absoluteStart)} -{' '}
                {formatTime(event.absoluteEnd)}
              </span>
            </div>
            <div className="px-1.5 py-0.5 bg-muted rounded font-medium">
              {formatDuration()}
            </div>
          </div>

          {/* Description */}
          {event.description && height > 80 && (
            <div className="mt-1 text-xs text-muted-foreground">
              <p className={isExpanded ? '' : 'line-clamp-2'}>
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Bottom resize handle */}
        {onTimeChange && (
          <div
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors flex items-center justify-center group/handle"
            onMouseDown={(e) => handleDragStart(e, 'resize-bottom')}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="opacity-0 group-hover/handle:opacity-100 transition-opacity">
              <GripVertical className="w-3 h-3 text-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

