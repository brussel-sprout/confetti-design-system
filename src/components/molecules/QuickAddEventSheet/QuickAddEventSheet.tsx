import { X } from 'lucide-react'
import { useState } from 'react'

import { Drawer } from '../../atoms/Drawer'

import type { QuickAddEventSheetProps } from './types'

export function QuickAddEventSheet({
	isOpen,
	onClose,
	startTime,
	endTime,
	onSave,
	onOpenFullDetails,
	onPreviewChange,
}: QuickAddEventSheetProps) {
	const [eventName, setEventName] = useState('New Event')
	const [isSaving, setIsSaving] = useState(false)

	const formatTimeRange = () => {
		const dateStr = startTime.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		})
		const startStr = startTime.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		})
		const endStr = endTime.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		})
		return `${dateStr} • ${startStr}–${endStr}`
	}

	const handleSave = async () => {
		const trimmed = eventName.trim()
		if (!trimmed) return // Can't save without name

		setIsSaving(true)
		try {
			await onSave(trimmed)
			setEventName('')
			onClose()
		} catch (err) {
			console.error('Failed to create event:', err)
		} finally {
			setIsSaving(false)
		}
	}

	const handleContentClick = () => {
		// Open full details, passing current eventName
		onOpenFullDetails(eventName)
	}

	const handleClose = () => {
		setEventName('')
		onClose()
	}

	return (
		<Drawer
			isOpen={isOpen}
			onClose={handleClose}
			direction="bottom"
			width="full"
			showCloseButton={false}
			closeOnOverlayClick={true}
			closeOnEscape={true}
			showMobileHandle={true}
			contentClassName="rounded-t-[10px] h-auto"
			className="p-0"
		>
			{/* Header with Save button */}
			<div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border/30">
				<button
					onClick={handleClose}
					className="p-2 -ml-2 hover:bg-muted/50 rounded-full transition-colors"
					aria-label="Close"
				>
					<X className="w-5 h-5 text-muted-foreground" />
				</button>
				<button
					onClick={handleSave}
					disabled={!eventName.trim() || isSaving}
					className="text-sm font-semibold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors"
				>
					{isSaving ? 'Saving...' : 'Save'}
				</button>
			</div>

			{/* Clickable content area */}
			<div
				onClick={handleContentClick}
				className="p-4 space-y-3 cursor-pointer active:bg-muted/20 transition-colors"
			>
				{/* Event Name Input */}
				<input
					type="text"
					value={eventName}
					onChange={(e) => {
						setEventName(e.target.value)
						onPreviewChange?.(e.target.value)
					}}
					onClick={(e) => e.stopPropagation()} // Don't trigger full details when typing
					placeholder="Add title"
					maxLength={100}
					autoFocus
					className="block w-full text-xl font-normal text-foreground placeholder:text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 p-0"
				/>

				{/* Time Display */}
				<p className="text-sm text-muted-foreground">{formatTimeRange()}</p>
			</div>
		</Drawer>
	)
}
