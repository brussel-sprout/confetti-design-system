import React from 'react'

export interface TimelineAxisProps {
	timeScale: '30min' | '15min' | '5min'
	onTimeClick: (time: string, event: React.MouseEvent | React.KeyboardEvent) => void
	startTime?: Date
	endTime?: Date
	'data-id'?: string
}
export function TimelineAxis({
	timeScale,
	onTimeClick,
	startTime,
	endTime,
	'data-id': dataId,
}: TimelineAxisProps) {
	// Use provided times or default to 9 AM - 5 PM
	const effectiveStartTime = startTime || new Date(2024, 0, 1, 9, 0)
	const effectiveEndTime = endTime || new Date(2024, 0, 1, 17, 0)
	const startHour = effectiveStartTime.getHours()
	const startMinute = effectiveStartTime.getMinutes()
	const endHour = effectiveEndTime.getHours()
	const endMinute = effectiveEndTime.getMinutes()
	// Generate time slots based on the selected time scale and time range
	const generateTimeSlots = () => {
		const slots = []
		const intervals = {
			'30min': 30,
			'15min': 15,
			'5min': 5,
		}
		const intervalMinutes = intervals[timeScale]
		// Start from the effective start time
		let currentHour = startHour
		let currentMinute = startMinute
		// Round down to nearest interval
		currentMinute = Math.floor(currentMinute / intervalMinutes) * intervalMinutes
		while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
			const timeString = formatTime(currentHour, currentMinute)
			const isMajorTick = currentMinute === 0 // Hour markers are major ticks
			slots.push({
				time: timeString,
				displayTime: formatDisplayTime(currentHour, currentMinute),
				isMajorTick,
			})
			// Increment by interval
			currentMinute += intervalMinutes
			if (currentMinute >= 60) {
				currentMinute -= 60
				currentHour += 1
			}
		}
		return slots
	}
	const formatTime = (hour: number, minute: number): string => {
		return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
	}
	const formatDisplayTime = (hour: number, minute: number): string => {
		const period = hour >= 12 ? 'PM' : 'AM'
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
		const displayMinute = minute.toString().padStart(2, '0')
		return `${displayHour}:${displayMinute} ${period}`
	}
	const timeSlots = generateTimeSlots()
	const handleTimeClick = (timeString: string, event: React.MouseEvent) => {
		onTimeClick(timeString, event)
	}
	const handleKeyDown = (timeString: string, event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onTimeClick(timeString, event)
		}
	}
	return (
		<div
			className="flex flex-col bg-background border-r border-border min-w-[144px]"
			data-id={dataId}
			role="navigation"
			aria-label="Timeline axis for event creation"
		>
			<div className="sticky top-0 bg-background border-b border-border p-3 z-10">
				<h3 className="font-lora font-medium text-sm text-foreground">Time</h3>
			</div>
			<div className="flex-1">
				{timeSlots.map((slot) => (
					<div
						key={slot.time}
						className={`
              relative border-b border-border cursor-pointer transition-all duration-200
              hover:bg-muted hover:border-primary/20
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
              ${slot.isMajorTick ? 'h-12' : 'h-8'}
            `}
						onClick={(e) => handleTimeClick(slot.time, e)}
						onKeyDown={(e) => handleKeyDown(slot.time, e)}
						tabIndex={0}
						role="button"
						aria-label={`Create event at ${slot.displayTime}`}
					>
						<div className="absolute left-0 top-0 h-full w-full flex items-center px-3">
							<span
								className={`
                  font-inter text-xs transition-colors duration-200
                  ${slot.isMajorTick ? 'font-medium text-foreground' : 'font-normal text-muted-foreground'}
                `}
							>
								{slot.isMajorTick ? slot.displayTime : slot.displayTime.split(' ')[0]}
							</span>
						</div>
						{/* Major tick indicator */}
						{slot.isMajorTick && <div className="absolute left-0 top-0 w-1 h-full bg-primary/20" />}
					</div>
				))}
			</div>
		</div>
	)
}
