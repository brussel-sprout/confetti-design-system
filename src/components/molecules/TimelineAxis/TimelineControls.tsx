import { Minus, Plus } from 'lucide-react'
import React from 'react'

export interface TimelineControlsProps {
	timeScale: '30min' | '15min' | '5min'
	onTimeScaleChange: (scale: '30min' | '15min' | '5min') => void
	startTime: Date
	endTime: Date
	'data-id'?: string
}
export function TimelineControls({
	timeScale,
	onTimeScaleChange,
	startTime,
	endTime,
	'data-id': dataId,
}: TimelineControlsProps) {
	const timeScales: Array<'30min' | '15min' | '5min'> = ['30min', '15min', '5min']
	const currentIndex = timeScales.indexOf(timeScale)
	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const index = parseInt(e.target.value)
		onTimeScaleChange(timeScales[index])
	}
	const zoomIn = () => {
		if (currentIndex < timeScales.length - 1) {
			onTimeScaleChange(timeScales[currentIndex + 1])
		}
	}
	const zoomOut = () => {
		if (currentIndex > 0) {
			onTimeScaleChange(timeScales[currentIndex - 1])
		}
	}
	const formatTime = (date: Date) => {
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const period = hours >= 12 ? 'PM' : 'AM'
		const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
		return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
	}
	const getTimeScaleLabel = (scale: string) => {
		switch (scale) {
			case '30min':
				return '30 min'
			case '15min':
				return '15 min'
			case '5min':
				return '5 min'
			default:
				return scale
		}
	}
	return (
		<div className="bg-background border border-border rounded-lg p-4 shadow-sm" data-id={dataId}>
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 text-primary" />
					<h3 className="font-lora font-medium text-sm text-foreground">Timeline Controls</h3>
				</div>
				<div className="text-xs text-muted-foreground">
					{formatTime(startTime)} - {formatTime(endTime)}
				</div>
			</div>
			<div className="space-y-3">
				{/* Time Scale Slider */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<label className="text-xs font-medium text-foreground">Time Increment</label>
						<span className="text-xs font-medium text-primary">{getTimeScaleLabel(timeScale)}</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={zoomOut}
							disabled={currentIndex === 0}
							className="p-1.5 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Zoom out (larger increments)"
						>
							<Minus className="w-3.5 h-3.5 text-foreground" />
						</button>
						<input
							type="range"
							min="0"
							max={timeScales.length - 1}
							value={currentIndex}
							onChange={handleSliderChange}
							className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
							aria-label="Adjust time scale"
						/>
						<button
							onClick={zoomIn}
							disabled={currentIndex === timeScales.length - 1}
							className="p-1.5 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
							aria-label="Zoom in (smaller increments)"
						>
							<Plus className="w-3.5 h-3.5 text-foreground" />
						</button>
					</div>
				</div>
				{/* Quick Select Buttons */}
				<div className="flex gap-2">
					{timeScales.map((scale) => (
						<button
							key={scale}
							onClick={() => onTimeScaleChange(scale)}
							className={`
                flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary
                ${timeScale === scale ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80'}
              `}
						>
							{getTimeScaleLabel(scale)}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
