import { ChevronRight, Clock, ExternalLink, Trash2 } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

import { cn } from '../../../utils/cn'
import { Button } from '../../atoms/Button'
import { Drawer } from '../../atoms/Drawer'

import type { EventDetailsDrawerProps, EventFormData, ValidationErrors } from './types'

// Utility functions to convert between Date and separate date/time strings
const getDateString = (date: Date | null): string => {
	if (!date) return ''
	// en-CA formats as YYYY-MM-DD which is suitable for input[type="date"]
	return new Intl.DateTimeFormat('en-CA').format(date)
}

const getTimeString = (date: Date | null): string => {
	if (!date) return ''
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}` // HH:MM format
}

const createDateFromStrings = (dateString: string, timeString: string): Date | null => {
	if (!dateString) return null

	// If no time provided, default to 12:00 PM
	const time = timeString || '12:00'

	// Parse the date string (YYYY-MM-DD format)
	const [year, month, day] = dateString.split('-').map(Number)
	const [hours, minutes] = time.split(':').map(Number)

	// Create date in local timezone
	const date = new Date(year, month - 1, day, hours, minutes, 0, 0)

	return date
}

const formatDuration = (start: Date, end: Date): string => {
	const durationMs = end.getTime() - start.getTime()
	const durationMinutes = Math.floor(durationMs / (1000 * 60))

	const hours = Math.floor(durationMinutes / 60)
	const minutes = durationMinutes % 60

	if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
	if (hours > 0) return `${hours}h`
	return `${minutes}m`
}

// Hook to detect mobile vs desktop - inline to avoid external dependency
const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		media.addEventListener('change', listener)
		return () => media.removeEventListener('change', listener)
	}, [matches, query])

	return matches
}

export const EventDetailsDrawer: React.FC<EventDetailsDrawerProps> = ({
	isOpen,
	onClose,
	mode,
	event,
	initialStartTime,
	connectedElements = [],
	onSave,
	onDelete,
	onNavigateToElement,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const [formData, setFormData] = useState<EventFormData>({
		event_name: '',
		description: '',
		startDate: '',
		startTime: '',
		endDate: '',
		endTime: '',
	})

	const [errors, setErrors] = useState<ValidationErrors>({})
	const [isSaving, setIsSaving] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [isDirty, setIsDirty] = useState(false)

	// Initialize form data when event prop changes or drawer opens
	useEffect(() => {
		if (isOpen) {
			if (mode === 'edit' && event) {
				setFormData({
					event_name: event.event_name,
					description: event.description || '',
					startDate: getDateString(event.absoluteStart),
					startTime: getTimeString(event.absoluteStart),
					endDate: getDateString(event.absoluteEnd),
					endTime: getTimeString(event.absoluteEnd),
				})
				setIsDirty(false)
			} else if (mode === 'create') {
				// For create mode, use initialStartTime if provided, otherwise use current time
				const startTime = initialStartTime || new Date()
				const oneHourLater = new Date(startTime.getTime() + 60 * 60 * 1000)
				setFormData({
					event_name: '',
					description: '',
					startDate: getDateString(startTime),
					startTime: getTimeString(startTime),
					endDate: getDateString(oneHourLater),
					endTime: getTimeString(oneHourLater),
				})
				setIsDirty(false)
			}
			setErrors({})
			setShowDeleteConfirm(false)
		}
	}, [isOpen, mode, event, initialStartTime])

	// Calculate start and end dates for display and validation
	const { startDateTime, endDateTime, duration } = useMemo(() => {
		const start = createDateFromStrings(formData.startDate, formData.startTime)
		const end = createDateFromStrings(formData.endDate, formData.endTime)

		let dur = ''
		if (start && end && end > start) {
			dur = formatDuration(start, end)
		}

		return {
			startDateTime: start,
			endDateTime: end,
			duration: dur,
		}
	}, [formData.startDate, formData.startTime, formData.endDate, formData.endTime])

	// Validation function
	const validate = (): boolean => {
		const newErrors: ValidationErrors = {}

		// Event name validation
		const trimmedName = formData.event_name.trim()
		if (!trimmedName) {
			newErrors.event_name = 'Event name is required'
		} else if (trimmedName.length > 100) {
			newErrors.event_name = 'Event name must be 100 characters or less'
		}

		// Description validation
		if (formData.description.length > 500) {
			newErrors.description = 'Description must be 500 characters or less'
		}

		// Start date/time validation
		if (!formData.startDate) {
			newErrors.startDateTime = 'Start date is required'
		} else if (!startDateTime) {
			newErrors.startDateTime = 'Invalid start date or time'
		}

		// End date/time validation
		if (!formData.endDate) {
			newErrors.endDateTime = 'End date is required'
		} else if (!endDateTime) {
			newErrors.endDateTime = 'Invalid end date or time'
		}

		// Duration validation
		if (startDateTime && endDateTime) {
			if (endDateTime <= startDateTime) {
				newErrors.endDateTime = 'End time must be after start time'
			} else {
				const durationMs = endDateTime.getTime() - startDateTime.getTime()
				const durationMinutes = durationMs / (1000 * 60)
				if (durationMinutes < 15) {
					newErrors.endDateTime = 'Event must be at least 15 minutes long'
				}
			}
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleFieldChange = (field: keyof EventFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
		setIsDirty(true)

		// Clear error for this field
		if (field === 'event_name' || field === 'description') {
			setErrors((prev) => ({ ...prev, [field]: undefined }))
		} else if (field.startsWith('start')) {
			setErrors((prev) => ({ ...prev, startDateTime: undefined }))
		} else if (field.startsWith('end')) {
			setErrors((prev) => ({ ...prev, endDateTime: undefined }))
		}
	}

	const handleSave = async () => {
		if (!validate()) {
			return
		}

		if (!startDateTime || !endDateTime) {
			return
		}

		setIsSaving(true)
		try {
			await onSave({
				event_name: formData.event_name.trim(),
				description: formData.description.trim() || null,
				absoluteStart: startDateTime,
				absoluteEnd: endDateTime,
			})
			setIsDirty(false)
			onClose()
		} catch (error) {
			console.error('Failed to save event:', error)
			// Could show an error toast here
		} finally {
			setIsSaving(false)
		}
	}

	const handleDelete = async () => {
		if (!onDelete) return

		setIsDeleting(true)
		try {
			await onDelete()
			setIsDirty(false)
			onClose()
		} catch (error) {
			console.error('Failed to delete event:', error)
			// Could show an error toast here
		} finally {
			setIsDeleting(false)
			setShowDeleteConfirm(false)
		}
	}

	const handleClose = () => {
		if (isDirty) {
			const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?')
			if (!confirmed) return
		}
		onClose()
	}

	const title = mode === 'create' ? 'New Event' : 'Edit Event'

	return (
		<Drawer
			isOpen={isOpen}
			onClose={handleClose}
			title={title}
			direction={isDesktop ? 'right' : 'bottom'}
			width={isDesktop ? 'lg' : 'full'}
			showCloseButton={isDesktop}
			closeOnOverlayClick={true}
			closeOnEscape={true}
			showMobileHandle={!isDesktop}
			contentClassName={isDesktop ? 'w-[500px]' : 'rounded-t-[10px] h-[96%] mt-24'}
			className="p-4 flex flex-col"
		>
			{/* Error Banner */}
			{Object.keys(errors).length > 0 && (
				<div className="mb-4 text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg text-sm">
					Please fix the errors below
				</div>
			)}

			{/* Form Content */}
			<div className="space-y-5 flex-1 overflow-y-auto">
				{/* Event Details Section */}
				<div className="bg-muted/5 rounded-2xl p-5 border border-border/30">
					<div className="flex items-center gap-2 mb-4">
						<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
						</div>
						<h3 className="text-sm font-semibold text-foreground">Event Details</h3>
					</div>

					<div className="space-y-4">
						{/* Event Name */}
						<div>
							<label
								htmlFor="eventName"
								className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide"
							>
								Event Name <span className="text-destructive">*</span>
							</label>
							<input
								id="eventName"
								type="text"
								value={formData.event_name}
								onChange={(e) => handleFieldChange('event_name', e.target.value)}
								placeholder="e.g., Cake Cutting Ceremony"
								maxLength={100}
								autoFocus={mode === 'create'}
								className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground placeholder:text-muted-foreground transition-colors text-sm mobile-touch-target"
								aria-required="true"
							/>
							{errors.event_name && (
								<p className="mt-1 text-xs text-destructive">{errors.event_name}</p>
							)}
						</div>

						{/* Description */}
						<div>
							<label
								htmlFor="description"
								className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide"
							>
								Description <span className="text-muted-foreground/60">(Optional)</span>
							</label>
							<textarea
								id="description"
								value={formData.description}
								onChange={(e) => handleFieldChange('description', e.target.value)}
								placeholder="Add details about this event..."
								rows={3}
								maxLength={500}
								className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground placeholder:text-muted-foreground transition-colors text-sm resize-none mobile-touch-target"
							/>
							<div className="flex justify-between items-center mt-1">
								{errors.description && (
									<p className="text-xs text-destructive">{errors.description}</p>
								)}
								<p className="text-xs text-muted-foreground ml-auto">
									{formData.description.length}/500
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Event Timing Section */}
				<div className="bg-muted/5 rounded-2xl p-5 border border-border/30">
					<div className="flex items-center gap-2 mb-4">
						<Clock className="w-5 h-5 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Event Timing</h3>
						{duration && (
							<div className="ml-auto flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
								<Clock className="w-3 h-3" />
								{duration}
							</div>
						)}
					</div>

					<div className="space-y-4">
						{/* Start Time */}
						<div>
							<label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
								Start
							</label>
							<div className="flex gap-3">
								<div className="flex-1">
									<input
										id="startDate"
										type="date"
										value={formData.startDate}
										onChange={(e) => handleFieldChange('startDate', e.target.value)}
										className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground transition-colors text-sm mobile-touch-target"
										required
									/>
								</div>
								<div className="flex-1">
									<input
										id="startTime"
										type="time"
										value={formData.startTime}
										onChange={(e) => handleFieldChange('startTime', e.target.value)}
										className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground transition-colors text-sm mobile-touch-target"
										required
									/>
								</div>
							</div>
							{errors.startDateTime && (
								<p className="mt-1 text-xs text-destructive">{errors.startDateTime}</p>
							)}
						</div>

						{/* Visual Separator */}
						<div className="flex items-center">
							<div className="flex-1 h-px bg-border/40"></div>
							<div className="px-3 text-xs text-muted-foreground bg-muted/5 rounded-full">to</div>
							<div className="flex-1 h-px bg-border/40"></div>
						</div>

						{/* End Time */}
						<div>
							<label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
								End
							</label>
							<div className="flex gap-3">
								<div className="flex-1">
									<input
										id="endDate"
										type="date"
										value={formData.endDate}
										onChange={(e) => handleFieldChange('endDate', e.target.value)}
										className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground transition-colors text-sm mobile-touch-target"
										required
									/>
								</div>
								<div className="flex-1">
									<input
										id="endTime"
										type="time"
										value={formData.endTime}
										onChange={(e) => handleFieldChange('endTime', e.target.value)}
										className="block w-full border border-border/60 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 px-3 py-2.5 bg-background text-foreground transition-colors text-sm mobile-touch-target"
										required
									/>
								</div>
							</div>
							{errors.endDateTime && (
								<p className="mt-1 text-xs text-destructive">{errors.endDateTime}</p>
							)}
						</div>
					</div>
				</div>

				{/* Connected Elements Section */}
				{connectedElements.length > 0 && onNavigateToElement && (
					<div className="bg-muted/5 rounded-2xl p-5 border border-border/30">
						<div className="flex items-center gap-2 mb-4">
							<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
								<ExternalLink className="w-3 h-3 text-primary" />
							</div>
							<h3 className="text-sm font-semibold text-foreground">Connected Elements</h3>
							<div className="ml-auto flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
								{connectedElements.length}
							</div>
						</div>
						<p className="text-xs text-muted-foreground mb-4">Click any element to view details</p>
						<div className="space-y-2">
							{connectedElements.map((element) => (
								<button
									key={element.party_element_id}
									onClick={() => onNavigateToElement(element.party_element_id)}
									className={cn(
										'w-full text-left flex items-center gap-3 p-3 rounded-lg',
										'bg-background hover:bg-muted/50 transition-colors group mobile-touch-target border border-border/30 hover:border-border/60'
									)}
								>
									{element.image ? (
										<img
											src={element.image.image_url}
											alt={element.element_name}
											className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border/20"
										/>
									) : (
										<div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/20">
											<div className="w-4 h-4 rounded bg-muted-foreground/30"></div>
										</div>
									)}
									<span className="text-sm text-foreground flex-1 truncate font-medium">
										{element.element_name}
									</span>
									<ChevronRight
										size={16}
										className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0"
									/>
								</button>
							))}
						</div>
					</div>
				)}

				{/* Delete Section (Edit Mode Only) */}
				{mode === 'edit' && onDelete && (
					<div className="bg-destructive/5 rounded-2xl p-5 border border-destructive/20">
						<div className="flex items-center gap-2 mb-4">
							<div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">
								<Trash2 className="w-3 h-3 text-destructive" />
							</div>
							<h3 className="text-sm font-semibold text-foreground">Danger Zone</h3>
						</div>

						{showDeleteConfirm ? (
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground">
									Are you sure you want to delete this event? This action cannot be undone.
								</p>
								<div className="flex gap-3">
									<Button
										variant="destructive"
										size="md"
										onClick={handleDelete}
										disabled={isDeleting}
										loading={isDeleting}
										className="flex-1 rounded-lg"
									>
										Confirm Delete
									</Button>
									<Button
										variant="secondary"
										size="md"
										onClick={() => setShowDeleteConfirm(false)}
										disabled={isDeleting}
										className="flex-1 rounded-lg"
									>
										Cancel
									</Button>
								</div>
							</div>
						) : (
							<button
								type="button"
								onClick={() => setShowDeleteConfirm(true)}
								className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 py-3 px-4 rounded-lg transition-colors mobile-touch-target font-medium border border-destructive/20"
							>
								<Trash2 className="w-4 h-4" />
								Delete Event
							</button>
						)}
					</div>
				)}
			</div>

			{/* Action Buttons - Fixed at Bottom */}
			<div className="bg-background border-t border-border/30 p-4 flex-shrink-0">
				<div className="flex flex-col sm:flex-row gap-3">
					<Button
						variant="secondary"
						size="md"
						onClick={handleClose}
						disabled={isSaving || isDeleting}
						className="order-2 sm:order-1 w-full sm:w-auto rounded-lg"
					>
						Cancel
					</Button>
					<Button
						variant="default"
						size="md"
						onClick={handleSave}
						disabled={isSaving || isDeleting}
						loading={isSaving}
						className="order-1 sm:order-2 w-full sm:w-auto rounded-lg"
					>
						{mode === 'create' ? 'Create Event' : 'Save Event'}
					</Button>
				</div>
			</div>
		</Drawer>
	)
}
