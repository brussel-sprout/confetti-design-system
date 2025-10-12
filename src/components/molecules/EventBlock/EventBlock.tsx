import { Check, Clock, GripVertical, Lightbulb, Trash2, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import type { LucideIcon } from 'lucide-react'
import type { TimelineEvent } from './types'

interface StatusConfig {
	bgClass: string
	barClass: string
	badgeBgClass: string
	badgeTextClass: string
	label: string
	icon: LucideIcon
}

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
	onDelete?: (eventId: string) => void
	'data-id'?: string
}

// Kept for future use when uncommenting statusConfig assignment below
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
// @ts-ignore - Intentionally unused until feature is enabled
const _suggestionStatusConfig = {
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
/* eslint-enable @typescript-eslint/no-unused-vars */

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
	onDelete,
	'data-id': dataId,
}: EventBlockProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const [dragType, setDragType] = useState<'move' | 'resize-top' | 'resize-bottom' | null>(null)
	const [dragStartY, setDragStartY] = useState(0)
	const [originalStart, setOriginalStart] = useState<Date | null>(null)
	const [originalEnd, setOriginalEnd] = useState<Date | null>(null)
	const [isLongPress, setIsLongPress] = useState(false)
	const [hasDragged, setHasDragged] = useState(false)
	const [clickStartPos, setClickStartPos] = useState<{ x: number; y: number } | null>(null)
	const touchTimerRef = useRef<NodeJS.Timeout | null>(null)
	const blockRef = useRef<HTMLDivElement>(null)

	// Refs for synchronous checks (prevent race conditions with state updates)
	const isDraggingRef = useRef(false)
	const hasDraggedRef = useRef(false)

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
	const leftOffset = totalStacks > 1 ? `${(stackIndex / totalStacks) * 100}%` : '0%'

	// TODO: Adjust default statusConfig styling later
	// Currently all events use the approved status config as default
	// const statusConfig = _suggestionStatusConfig.approved
	const statusConfig = null as StatusConfig | null
	//   const statusConfig = event.is_suggestion
	//   ? _suggestionStatusConfig[event.suggestion_status]
	//   : null

	const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
		console.log('🖱️ Click on event:', event.event_name, {
			isDragging,
			isDraggingRef: isDraggingRef.current,
			hasDragged,
			hasDraggedRef: hasDraggedRef.current,
			willOpenDrawer: !isDraggingRef.current && !hasDraggedRef.current,
		})

		// Use refs for synchronous check - more reliable than state
		if (isDraggingRef.current || hasDraggedRef.current || isDragging || hasDragged) {
			console.log('❌ Click blocked - drag detected')
			e.preventDefault()
			e.stopPropagation()
			// Reset hasDragged flags after blocking the click
			setHasDragged(false)
			hasDraggedRef.current = false
			return
		}

		if (onClick) {
			console.log('✅ Opening drawer for event:', event.event_name)
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

	// Unified cleanup function to reset all interaction state
	const resetInteractionState = React.useCallback(() => {
		console.log('🧹 Resetting interaction state for event:', event.event_name)
		setIsDragging(false)
		setDragType(null)
		setOriginalStart(null)
		setOriginalEnd(null)
		setIsLongPress(false)
		setClickStartPos(null)
		// Reset refs
		isDraggingRef.current = false
		// Note: Don't reset hasDragged here - it needs to persist until after onClick fires
	}, [event.event_name])

	// Helper to extract status config properties for use in JSX
	// Using optional chaining with explicit undefined to help TypeScript's type narrowing
	const statusBgClass = statusConfig?.bgClass ?? undefined
	const statusBarClass = statusConfig?.barClass ?? undefined
	const statusBadgeBgClass = statusConfig?.badgeBgClass ?? undefined
	const statusBadgeTextClass = statusConfig?.badgeTextClass ?? undefined
	const StatusIcon = statusConfig?.icon ?? undefined
	const statusLabel = statusConfig?.label ?? undefined

	// Unified drag start handler for both mouse and touch
	const handleDragStart = (clientY: number, type: 'move' | 'resize-top' | 'resize-bottom') => {
		console.log('🎯 Drag start for event:', event.event_name, { type, clientY })
		// Set refs immediately for synchronous checks
		isDraggingRef.current = true
		hasDraggedRef.current = true
		// Set state for rendering
		setIsDragging(true)
		setDragType(type)
		setDragStartY(clientY)
		setOriginalStart(event.absoluteStart)
		setOriginalEnd(event.absoluteEnd)
		setHasDragged(true)
	}

	// Mouse event wrapper
	const handleMouseDragStart = (
		e: React.MouseEvent,
		type: 'move' | 'resize-top' | 'resize-bottom'
	) => {
		e.stopPropagation()
		handleDragStart(e.clientY, type)
	}

	// Track initial click position for movement detection
	const handleMouseDown = (e: React.MouseEvent) => {
		console.log('🖱️ Mouse down on event:', event.event_name, { x: e.clientX, y: e.clientY })
		setClickStartPos({ x: e.clientX, y: e.clientY })
		setHasDragged(false)
		hasDraggedRef.current = false
	}

	// Track movement distance to detect drag intent
	const handleMouseMove = (e: React.MouseEvent) => {
		if (clickStartPos && !isDragging && !isDraggingRef.current && onTimeChange) {
			const distance = Math.sqrt(
				Math.pow(e.clientX - clickStartPos.x, 2) + Math.pow(e.clientY - clickStartPos.y, 2)
			)
			console.log('🖱️ Mouse move on event:', event.event_name, {
				distance,
				threshold: 10,
				willStartDrag: distance > 10,
				clickStart: clickStartPos,
				current: { x: e.clientX, y: e.clientY },
			})
			if (distance > 10) {
				console.log('🚀 Starting drag for event:', event.event_name)
				// Set refs IMMEDIATELY before state updates
				hasDraggedRef.current = true
				// Start the actual drag operation now (this will set isDraggingRef)
				handleDragStart(e.clientY, 'move')
			}
		}
	}

	// Reset click tracking on mouse up
	const handleMouseUp = () => {
		console.log('🖱️ Mouse up on event:', event.event_name, { hasDragged, isDragging })
		setClickStartPos(null)
	}

	// Touch event handlers
	const handleTouchStart = (e: React.TouchEvent, type: 'move' | 'resize-top' | 'resize-bottom') => {
		if (e.touches.length !== 1) return // Only handle single touch

		// Store the initial touch position
		const startY = e.touches[0].clientY
		const startX = e.touches[0].clientX
		setClickStartPos({ x: startX, y: startY })
		setHasDragged(false)
		hasDraggedRef.current = false

		touchTimerRef.current = setTimeout(() => {
			console.log('⏱️ Long-press timer completed for event:', event.event_name)
			setIsLongPress(true)
			// Add haptic feedback for mobile long-press
			if (navigator.vibrate) {
				navigator.vibrate(50) // Short vibration feedback
			}
			handleDragStart(startY, type)
			touchTimerRef.current = null
		}, 300) // 300ms long-press threshold
	}

	// Track touch movement to detect drag intent
	const handleTouchMove = (e: React.TouchEvent) => {
		if (clickStartPos && !isDragging && e.touches.length === 1) {
			const touch = e.touches[0]
			const distance = Math.sqrt(
				Math.pow(touch.clientX - clickStartPos.x, 2) + Math.pow(touch.clientY - clickStartPos.y, 2)
			)
			console.log('📱 Touch move on event:', event.event_name, {
				distance,
				threshold: 10,
				willCancelLongPress: distance > 10,
			})
			if (distance > 10) {
				console.log('🚫 Canceling long-press due to movement for event:', event.event_name)
				setHasDragged(true)
				hasDraggedRef.current = true
				// Cancel long-press timer if user starts moving
				if (touchTimerRef.current) {
					clearTimeout(touchTimerRef.current)
					touchTimerRef.current = null
				}
				setIsLongPress(false)
			}
		}
	}

	const handleTouchEnd = () => {
		// Don't interfere if we're already dragging - let document listener handle it
		if (isDragging) {
			return
		}

		if (touchTimerRef.current) {
			clearTimeout(touchTimerRef.current)
			touchTimerRef.current = null
		}
		setIsLongPress(false)
		setClickStartPos(null)
	}

	const handleTouchCancel = () => {
		if (touchTimerRef.current) {
			clearTimeout(touchTimerRef.current)
			touchTimerRef.current = null
		}
		setIsLongPress(false)
		setClickStartPos(null)
	}

	// Cleanup touch timer on unmount
	useEffect(() => {
		return () => {
			if (touchTimerRef.current) {
				clearTimeout(touchTimerRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (!isDragging || !dragType || !originalStart || !originalEnd) return

		// Unified move handler for both mouse and touch
		const handleMove = (clientY: number) => {
			const deltaY = clientY - dragStartY
			const deltaMinutes = deltaY / pixelsPerMinute

			console.log('🔄 Handle move calculation:', {
				eventName: event.event_name,
				clientY,
				dragStartY,
				deltaY,
				deltaMinutes,
				pixelsPerMinute,
				originalStart: originalStart.toISOString(),
				originalEnd: originalEnd.toISOString(),
			})

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
			newStart = new Date(Math.round(newStart.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000))
			newEnd = new Date(Math.round(newEnd.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000))

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

			console.log('📤 Calling onTimeChange:', {
				eventId: event.id,
				eventName: event.event_name,
				newStart: newStart.toISOString(),
				newEnd: newEnd.toISOString(),
				onTimeChangeExists: !!onTimeChange,
			})

			if (onTimeChange) {
				onTimeChange(event.id, newStart, newEnd)
			}
		}

		const handleMouseMove = (e: MouseEvent) => {
			console.log('📄 Document mouse move during drag for event:', event.event_name, {
				clientY: e.clientY,
			})
			handleMove(e.clientY)
		}

		const handleTouchMove = (e: TouchEvent) => {
			e.preventDefault() // Prevent scrolling during drag
			if (e.touches.length === 1) {
				handleMove(e.touches[0].clientY)
			}
		}

		const handleEnd = () => {
			console.log('🏁 Drag end for event:', event.event_name)
			resetInteractionState()
			// Don't reset hasDragged here - it will be reset on next mouseDown/touchStart
			// This ensures onClick can properly detect if a drag just occurred
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleEnd)
		document.addEventListener('touchmove', handleTouchMove, { passive: false })
		document.addEventListener('touchend', handleEnd)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleEnd)
			document.removeEventListener('touchmove', handleTouchMove)
			document.removeEventListener('touchend', handleEnd)
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
		event.event_name,
		timelineStart,
		timelineEnd,
		resetInteractionState,
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

			{/* Delete button */}
			{onDelete && (
				<button
					onClick={(e) => {
						e.stopPropagation()
						onDelete(event.id)
					}}
					className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded z-10"
					aria-label="Delete event"
				>
					<Trash2 className="w-4 h-4 text-red-600" />
				</button>
			)}

			{/* Main event card */}
			<div
				data-timeline-event="true"
				data-timeline-dragging={isDragging ? 'true' : undefined}
				className={`
          relative h-full mx-1 rounded-lg border-2 overflow-hidden
          transition-all duration-300 group
          ${isSelected ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border hover:border-primary/40 hover:shadow-md'}
          ${isDimmed ? 'opacity-40' : 'opacity-100'}
          ${isDragging ? 'opacity-70 shadow-2xl scale-105' : ''}
          ${isLongPress && !isDragging ? 'scale-98 opacity-90 shadow-lg' : ''}
          ${statusBgClass || (isSelected ? 'bg-stone-50' : 'bg-white')}
          ${onTimeChange ? 'cursor-grab hover:cursor-grab' : 'cursor-pointer'}
        `}
				onClick={handleClick}
			>
				{/* Top resize handle */}
				{onTimeChange && (
					<div
						className="hidden md:flex absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors items-center justify-center group/handle"
						onMouseDown={(e) => handleMouseDragStart(e, 'resize-top')}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="opacity-0 group-hover/handle:opacity-100 transition-opacity">
							<GripVertical className="w-3 h-3 text-primary" />
						</div>
					</div>
				)}

				{/* Status indicator bar */}
				{statusBarClass && (
					<div className={`absolute left-0 top-0 bottom-0 w-1 ${statusBarClass}`} />
				)}

				{/* Drag handle indicator */}
				{onTimeChange && (
					<div className="absolute top-1 right-1 opacity-0 group-hover:opacity-60 transition-opacity">
						<GripVertical className="w-3 h-3 text-muted-foreground" />
					</div>
				)}

				{/* Content */}
				<div
					className={`h-full ${statusBarClass ? 'pl-3' : 'pl-2'} pr-2 py-2 flex flex-col ${onTimeChange ? 'cursor-move' : ''}`}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onTouchStart={(e) => {
						if (onTimeChange) {
							handleTouchStart(e, 'move')
						}
					}}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={handleTouchCancel}
					onContextMenu={(e) => e.preventDefault()}
				>
					{/* Header with title and status */}
					<div className="flex items-start gap-2 mb-1">
						<div className="flex-1 min-w-0">
							<h4 className="font-lora font-semibold text-sm text-foreground leading-tight">
								{event.event_name}
							</h4>
						</div>
						{StatusIcon && statusBadgeBgClass && statusBadgeTextClass && statusLabel && (
							<div
								className={`flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${statusBadgeBgClass} ${statusBadgeTextClass}`}
							>
								<StatusIcon className="w-3 h-3" />
								<span>{statusLabel}</span>
							</div>
						)}
					</div>

					{/* Time and duration info */}
					<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
						<div className="flex items-center gap-1">
							<Clock className="w-3 h-3" />
							<span>
								{formatTime(event.absoluteStart)} - {formatTime(event.absoluteEnd)}
							</span>
						</div>
						<div className="px-1.5 py-0.5 bg-muted rounded font-medium">{formatDuration()}</div>
					</div>

					{/* Description */}
					{event.description && height > 80 && (
						<div className="mt-1 text-xs text-muted-foreground">
							<p className={isExpanded ? '' : 'line-clamp-2'}>{event.description}</p>
						</div>
					)}
				</div>

				{/* Bottom resize handle */}
				{onTimeChange && (
					<div
						className="hidden md:flex absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-primary/20 transition-colors items-center justify-center group/handle"
						onMouseDown={(e) => handleMouseDragStart(e, 'resize-bottom')}
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
