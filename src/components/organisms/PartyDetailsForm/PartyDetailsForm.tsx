import { Calendar, Clock, MapPin, Users, X } from 'lucide-react'
import React from 'react'

import { Button, Input } from '@repo/confetti-design-system'

import { cn } from '../../../utils/cn'

export interface PartyDetails {
	name: string
	party_date: Date
	headCount: number
	address: string
}

export interface PartyDetailsFormProps {
	partyDetails: PartyDetails
	onSave: (details: PartyDetails) => void
	focusField?: 'name' | 'date' | 'time' | 'headCount' | 'address' | null
	className?: string
}

type EditableField = 'name' | 'date' | 'time' | 'headCount' | 'address'

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
	const dateTimeString = `${dateString}T${time}:00`
	const date = new Date(dateString)
	const [hours, minutes] = time.split(':').map(Number)
	date.setHours(hours)
	date.setMinutes(minutes)

	try {
		return new Date(dateTimeString)
	} catch {
		return null
	}
}

const PartyDetailsForm = React.forwardRef<HTMLDivElement, PartyDetailsFormProps>(
	({ partyDetails, onSave, focusField = null, className = '', ...props }, ref) => {
		const [isOpen, setIsOpen] = React.useState(false)
		const [isClosing, setIsClosing] = React.useState(false)
		const [formData, setFormData] = React.useState<PartyDetails>(partyDetails)
		const [clickOrigin, setClickOrigin] = React.useState({ x: 0, y: 0 })
		const [internalFocusField, setInternalFocusField] = React.useState<EditableField | null>(null)
		const [isOpening, setIsOpening] = React.useState(false)
		const containerRef = React.useRef<HTMLDivElement>(null)
		const formRef = React.useRef<HTMLDivElement>(null)

		// Refs for each input field
		const nameInputRef = React.useRef<HTMLInputElement>(null)
		const dateInputRef = React.useRef<HTMLInputElement>(null)
		const timeInputRef = React.useRef<HTMLInputElement>(null)
		const headCountInputRef = React.useRef<HTMLInputElement>(null)
		const addressInputRef = React.useRef<HTMLInputElement>(null)

		// Update form data when partyDetails prop changes
		React.useEffect(() => {
			setFormData(partyDetails)
		}, [partyDetails])

		// Handle external focusField prop
		React.useEffect(() => {
			if (focusField) {
				setIsOpening(true)
				setInternalFocusField(focusField)
				setIsOpen(true)

				// Clear the opening flag after a short delay
				setTimeout(() => {
					setIsOpening(false)
				}, 150)
			}
		}, [focusField])

		// Focus the appropriate input when form opens
		React.useEffect(() => {
			const currentFocusField = focusField || internalFocusField
			if (isOpen && currentFocusField) {
				// Small delay to ensure the form is fully rendered
				setTimeout(() => {
					switch (currentFocusField) {
						case 'name':
							nameInputRef.current?.focus()
							break
						case 'date':
							dateInputRef.current?.focus()
							break
						case 'time':
							timeInputRef.current?.focus()
							break
						case 'headCount':
							headCountInputRef.current?.focus()
							break
						case 'address':
							addressInputRef.current?.focus()
							break
					}
				}, 100)
			}
		}, [isOpen, focusField, internalFocusField])

		const handleClose = React.useCallback(() => {
			if (isClosing) return // Prevent multiple close calls

			setIsClosing(true)

			// Wait for animation to complete before actually closing
			setTimeout(() => {
				setIsOpen(false)
				setIsClosing(false)
				setInternalFocusField(null)
				setIsOpening(false)
				setFormData(partyDetails) // Reset form data
			}, 150) // Shorter duration for fade out
		}, [isClosing, partyDetails])

		// Handle click outside to close
		React.useEffect(() => {
			if (!isOpen) return

			const handleClickOutside = (event: MouseEvent) => {
				// Don't close if we're in the opening phase
				if (isOpening) return

				// Don't close if clicking inside the form
				if (formRef.current && formRef.current.contains(event.target as Node)) {
					return
				}

				// Don't close if clicking on any of the trigger buttons
				if (containerRef.current) {
					const buttons = containerRef.current.querySelectorAll('button')
					for (const button of buttons) {
						if (button.contains(event.target as Node)) {
							return
						}
					}
				}

				handleClose()
			}

			// Add listener with a small delay to avoid immediate closing
			const timeoutId = setTimeout(() => {
				document.addEventListener('mousedown', handleClickOutside)
			}, 100)

			return () => {
				clearTimeout(timeoutId)
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [isOpen, isOpening, handleClose])

		// Handle escape key to close
		React.useEffect(() => {
			if (!isOpen) return

			const handleEscapeKey = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					handleClose()
				}
			}

			document.addEventListener('keydown', handleEscapeKey)

			return () => {
				document.removeEventListener('keydown', handleEscapeKey)
			}
		}, [isOpen, handleClose])

		const handleFieldClick = (event: React.MouseEvent, field: EditableField) => {
			setIsOpening(true)

			// Calculate the click position relative to the container
			if (containerRef.current) {
				const containerRect = containerRef.current.getBoundingClientRect()
				const buttonRect = (event.target as HTMLElement).getBoundingClientRect()

				// Calculate the center of the clicked button relative to container
				const buttonCenterX = buttonRect.left + buttonRect.width / 2 - containerRect.left
				const buttonCenterY = buttonRect.top + buttonRect.height / 2 - containerRect.top

				setClickOrigin({ x: buttonCenterX, y: buttonCenterY })
			}

			setInternalFocusField(field)
			setIsOpen(true)

			// Clear the opening flag after a short delay
			setTimeout(() => {
				setIsOpening(false)
			}, 150)
		}

		const handleSave = () => {
			onSave(formData)
			handleClose()
		}

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault()
			handleSave()
		}

		const handleInputChange = (field: keyof PartyDetails, value: string | number | Date | null) => {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}))
		}

		const formatDate = (date: Date | null) => {
			if (!date) return 'Add date'
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			})
		}

		// const formatTime = (date: Date | null) => {
		// 	if (!date) return 'Add time'
		// 	const hours = date.getHours()
		// 	const minutes = date.getMinutes()
		// 	const ampm = hours >= 12 ? 'PM' : 'AM'
		// 	const displayHours = hours % 12 || 12
		// 	const displayMinutes = minutes.toString().padStart(2, '0')
		// 	return `${displayHours}:${displayMinutes} ${ampm}`
		// }
		// IDK why this is different from the one above, but it is
		const formatTime = (date: Date | null) => {
			if (!date) return 'Add time'
			return date.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true,
			})
		}

		const formatHeadCount = (count: number) => {
			if (!count) return 'Add guests'
			return `${count} guest${count !== 1 ? 's' : ''}`
		}

		const formatAddress = (address: string) => {
			if (!address) return 'Add location'
			return address
		}

		return (
			<div ref={ref || containerRef} className={cn('relative', className)} {...props}>
				{/* Compact Display */}
				<div className="flex items-center gap-1 text-sm overflow-hidden max-w-full">
					<button
						onClick={(e) => handleFieldClick(e, 'name')}
						className={cn(
							'font-semibold text-foreground hover:text-primary transition-colors',
							'whitespace-nowrap flex-shrink-0 text-left truncate',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={partyDetails.name || 'Add party name'}
					>
						{partyDetails.name || 'Untitled Party'}
					</button>

					<span className="text-muted-foreground flex-shrink-0">•</span>

					<button
						onClick={(e) => handleFieldClick(e, 'date')}
						className={cn(
							'text-muted-foreground hover:text-foreground transition-colors',
							'whitespace-nowrap flex-shrink-0 text-left truncate',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={formatDate(partyDetails.party_date)}
					>
						{formatDate(partyDetails.party_date)}
					</button>

					<span className="text-muted-foreground flex-shrink-0">•</span>

					<button
						onClick={(e) => handleFieldClick(e, 'time')}
						className={cn(
							'text-muted-foreground hover:text-foreground transition-colors',
							'whitespace-nowrap flex-shrink-0 text-left truncate',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={formatTime(partyDetails.party_date)}
					>
						{formatTime(partyDetails.party_date)}
					</button>

					<span className="text-muted-foreground flex-shrink-0">•</span>

					<button
						onClick={(e) => handleFieldClick(e, 'headCount')}
						className={cn(
							'text-muted-foreground hover:text-foreground transition-colors',
							'whitespace-nowrap flex-shrink-0 text-left truncate',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={`${partyDetails.headCount || 0} guests`}
					>
						{formatHeadCount(partyDetails.headCount)}
					</button>

					<span className="text-muted-foreground flex-shrink-0">•</span>

					<button
						onClick={(e) => handleFieldClick(e, 'address')}
						className={cn(
							'text-muted-foreground hover:text-foreground transition-colors',
							'whitespace-nowrap text-left truncate min-w-0',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={partyDetails.address || 'Add location'}
					>
						{formatAddress(partyDetails.address)}
					</button>
				</div>

				{/* Mega Menu Form */}
				{isOpen && (
					<div
						ref={formRef}
						className={cn(
							'fixed md:absolute md:top-full top-0 left-0 right-0 md:mt-2 mt-0 z-50',
							'bg-background border border-border rounded-xl shadow-lg',
							'p-4 md:p-6',
							isClosing ? 'animate-scale-out' : 'animate-scale-in',
							'perspective-1000 md:perspective-1000',
							'w-full md:max-w-[800px]',
							'h-screen md:h-auto overflow-y-auto md:overflow-visible',
							'md:rounded-xl rounded-none'
						)}
						style={{
							transformOrigin:
								window.innerWidth >= 768
									? `${clickOrigin.x}px ${clickOrigin.y}px`
									: 'center center',
						}}
					>
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-lg font-semibold text-foreground">Edit Party Details</h3>
							<button
								onClick={handleClose}
								className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="md:col-span-2">
									<Input
										ref={nameInputRef}
										name="name"
										label="Party Name"
										value={formData.name}
										onChange={(e) => handleInputChange('name', e.target.value)}
										placeholder="Enter party name"
										leftIcon={<Calendar className="w-4 h-4" />}
									/>
								</div>

								<Input
									ref={dateInputRef}
									name="date"
									label="Date"
									type="date"
									value={getDateString(formData.party_date)}
									onChange={(e) => {
										const newDate = createDateFromStrings(
											e.target.value,
											getTimeString(formData.party_date)
										)
										handleInputChange('party_date', newDate)
									}}
									leftIcon={<Calendar className="w-4 h-4" />}
								/>

								<Input
									ref={timeInputRef}
									name="time"
									label="Time"
									type="time"
									value={getTimeString(formData.party_date)}
									onChange={(e) => {
										const newDate = createDateFromStrings(
											getDateString(formData.party_date),
											e.target.value
										)
										handleInputChange('party_date', newDate)
									}}
									leftIcon={<Clock className="w-4 h-4" />}
								/>

								<Input
									ref={headCountInputRef}
									name="headCount"
									label="Guest Count"
									type="number"
									min="1"
									value={formData.headCount || ''}
									onChange={(e) => handleInputChange('headCount', parseInt(e.target.value) || 0)}
									placeholder="Number of guests"
									leftIcon={<Users className="w-4 h-4" />}
								/>

								<Input
									ref={addressInputRef}
									name="address"
									label="Location"
									value={formData.address}
									onChange={(e) => handleInputChange('address', e.target.value)}
									placeholder="Enter party location"
									leftIcon={<MapPin className="w-4 h-4" />}
								/>
							</div>

							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
								<Button type="button" variant="outline" onClick={handleClose}>
									Cancel
								</Button>
								<Button type="submit">Save Changes</Button>
							</div>
						</form>
					</div>
				)}
			</div>
		)
	}
)

PartyDetailsForm.displayName = 'PartyDetailsForm'

export { PartyDetailsForm }
