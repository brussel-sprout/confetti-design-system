import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

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
	position,
}: QuickAddEventSheetProps) {
	const [eventName, setEventName] = useState('New Event')
	const [isSaving, setIsSaving] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	// Detect mobile/desktop
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia('(max-width: 767px)').matches)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			if (eventName.trim() && !isSaving) {
				handleSave()
			}
		}
	}

	// Mobile: Bottom drawer
	if (isMobile) {
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
						onKeyDown={handleKeyDown}
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

	// Desktop: Small inline modal
	return (
		<>
			{/* Backdrop */}
			{isOpen && <div className="fixed inset-0 z-40" onClick={handleClose} aria-hidden="true" />}

			{/* Modal */}
			{isOpen && (
				<div
					className="fixed z-50 bg-background border border-border rounded-lg shadow-xl w-[320px]"
					style={{
						left: position?.x ? `${position.x}px` : '50%',
						top: position?.y ? `${position.y}px` : '50%',
						transform: position?.x && position?.y ? 'none' : 'translate(-50%, -50%)',
					}}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
						<button
							onClick={handleClose}
							className="p-1.5 hover:bg-muted/50 rounded-full transition-colors"
							aria-label="Close"
						>
							<X className="w-4 h-4 text-muted-foreground" />
						</button>
						<button
							onClick={handleSave}
							disabled={!eventName.trim() || isSaving}
							className="text-sm font-semibold text-primary disabled:text-muted-foreground disabled:cursor-not-allowed px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors"
						>
							{isSaving ? 'Saving...' : 'Save'}
						</button>
					</div>

					{/* Content */}
					<div
						onClick={handleContentClick}
						className="p-4 space-y-3 cursor-pointer hover:bg-muted/10 transition-colors"
					>
						{/* Event Name Input */}
						<input
							type="text"
							value={eventName}
							onChange={(e) => {
								setEventName(e.target.value)
								onPreviewChange?.(e.target.value)
							}}
							onKeyDown={handleKeyDown}
							onClick={(e) => e.stopPropagation()} // Don't trigger full details when typing
							placeholder="Add title"
							maxLength={100}
							autoFocus
							className="block w-full text-base font-normal text-foreground placeholder:text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-0 p-0"
						/>

						{/* Time Display */}
						<p className="text-sm text-muted-foreground">{formatTimeRange()}</p>
					</div>
				</div>
			)}
		</>
	)
}
