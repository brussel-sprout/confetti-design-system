import { useMemo } from 'react'

import { EventBlock } from './EventBlock'

import type { TimelineEvent } from './types'

export interface EventBlockTimelineProps {
	events: TimelineEvent[]
	startTime: Date
	endTime: Date
	pixelsPerMinute?: number
	selectedEventId?: string
	onEventClick?: (event: TimelineEvent) => void
	onTimelineClick?: (clickedTime: Date, position?: { x: number; y: number }) => void
	onTimeChange?: (eventId: string, newStart: Date, newEnd: Date) => void
	'data-id'?: string
}

interface PositionedEvent {
	event: TimelineEvent
	stackIndex: number
	totalStacks: number
}

function detectOverlaps(events: TimelineEvent[]): PositionedEvent[] {
	const sortedEvents = [...events].sort(
		(a, b) => a.absoluteStart.getTime() - b.absoluteStart.getTime()
	)

	const positioned: PositionedEvent[] = []
	const groups: TimelineEvent[][] = []

	for (const event of sortedEvents) {
		const eventStart = event.absoluteStart.getTime()
		const eventEnd = event.absoluteEnd.getTime()

		let foundGroup = false
		for (const group of groups) {
			const overlaps = group.some((e) => {
				const eStart = e.absoluteStart.getTime()
				const eEnd = e.absoluteEnd.getTime()
				return eventStart < eEnd && eventEnd > eStart
			})

			if (overlaps) {
				group.push(event)
				foundGroup = true
				break
			}
		}

		if (!foundGroup) {
			groups.push([event])
		}
	}

	for (const group of groups) {
		const totalStacks = group.length
		group.forEach((event, index) => {
			positioned.push({
				event,
				stackIndex: index,
				totalStacks,
			})
		})
	}

	return positioned
}

export function EventBlockTimeline({
	events,
	startTime,
	endTime,
	pixelsPerMinute = 2,
	selectedEventId,
	onEventClick,
	onTimelineClick,
	onTimeChange,
	'data-id': dataId,
}: EventBlockTimelineProps) {
	const positionedEvents = useMemo(() => detectOverlaps(events), [events])

	const totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
	const containerHeight = totalMinutes * pixelsPerMinute

	const hasOverlaps = positionedEvents.some((pe) => pe.totalStacks > 1)

	const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Only handle clicks on the container itself, not on child elements (events)
		if (e.target !== e.currentTarget) return
		if (!onTimelineClick) return

		// Calculate clicked time based on Y offset
		const rect = e.currentTarget.getBoundingClientRect()
		const clickY = e.clientY - rect.top
		const minutesFromStart = clickY / pixelsPerMinute
		const clickedTime = new Date(startTime.getTime() + minutesFromStart * 60 * 1000)

		// Round to nearest 5 minutes (consistent with drag behavior)
		const roundedTime = new Date(
			Math.round(clickedTime.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000)
		)

		// Pass click position for desktop modal positioning
		const position = { x: e.clientX, y: e.clientY }
		onTimelineClick(roundedTime, position)
	}

	return (
		<div
			data-id={dataId}
			className="relative w-full cursor-pointer"
			style={{
				height: `${containerHeight}px`,
			}}
			onClick={handleTimelineClick}
		>
			{positionedEvents.length === 0 ? (
				<div className="flex items-center justify-center h-full">
					<div className="text-center text-muted-foreground">
						<p className="font-lora text-sm">No events scheduled</p>
						<p className="text-xs mt-1">Add events to see them here</p>
					</div>
				</div>
			) : (
				positionedEvents.map(({ event, stackIndex, totalStacks }) => {
					const isSelected = event.id === selectedEventId
					const isDimmed = Boolean(hasOverlaps && selectedEventId && !isSelected)

					return (
						<EventBlock
							key={event.id}
							event={event}
							startTime={startTime}
							endTime={endTime}
							pixelsPerMinute={pixelsPerMinute}
							stackIndex={stackIndex}
							totalStacks={totalStacks}
							isSelected={isSelected}
							isDimmed={isDimmed}
							onClick={() => onEventClick?.(event)}
							onTimeChange={onTimeChange}
						/>
					)
				})
			)}
		</div>
	)
}
