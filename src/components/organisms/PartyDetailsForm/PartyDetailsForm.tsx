import React from 'react'
import { Calendar, Clock, Users, MapPin, X } from 'lucide-react'

import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { cn } from '../../../utils/cn'

export interface PartyDetails {
	name: string
	date: string
	time: string
	headCount: number
	address: string
}

export interface PartyDetailsFormProps {
	partyDetails: PartyDetails
	onSave: (details: PartyDetails) => void
	className?: string
}

type EditableField = 'name' | 'date' | 'time' | 'headCount' | 'address'

const PartyDetailsForm = React.forwardRef<HTMLDivElement, PartyDetailsFormProps>(
	({ partyDetails, onSave, className = '', ...props }, ref) => {
		const [isOpen, setIsOpen] = React.useState(false)
		const [isClosing, setIsClosing] = React.useState(false)
		const [formData, setFormData] = React.useState<PartyDetails>(partyDetails)
		const [clickOrigin, setClickOrigin] = React.useState({ x: 0, y: 0 })
		const [focusField, setFocusField] = React.useState<EditableField | null>(null)
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

		// Focus the appropriate input when form opens
		React.useEffect(() => {
			if (isOpen && focusField) {
				// Small delay to ensure the form is fully rendered
				setTimeout(() => {
					switch (focusField) {
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
		}, [isOpen, focusField])

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
		}, [isOpen, isOpening])

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
		}, [isOpen])

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
			
			setFocusField(field)
			setIsOpen(true)
			
			// Clear the opening flag after a short delay
			setTimeout(() => {
				setIsOpening(false)
			}, 150)
		}

		const handleClose = () => {
			if (isClosing) return // Prevent multiple close calls
			
			setIsClosing(true)
			
			// Wait for animation to complete before actually closing
			setTimeout(() => {
				setIsOpen(false)
				setIsClosing(false)
				setFocusField(null)
				setIsOpening(false)
				setFormData(partyDetails) // Reset form data
			}, 150) // Shorter duration for fade out
		}

		const handleSave = () => {
			onSave(formData)
			handleClose()
		}

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault()
			handleSave()
		}

		const handleInputChange = (field: keyof PartyDetails, value: string | number) => {
			setFormData(prev => ({
				...prev,
				[field]: value
			}))
		}

		const formatDate = (dateString: string) => {
			if (!dateString) return 'Add date'
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', { 
				month: 'short', 
				day: 'numeric',
				year: 'numeric'
			})
		}

		const formatTime = (timeString: string) => {
			if (!timeString) return 'Add time'
			return timeString
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
			<div ref={containerRef} className={cn('relative', className)} {...props}>
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
						title={partyDetails.date || 'Add date'}
					>
						{formatDate(partyDetails.date)}
					</button>

					<span className="text-muted-foreground flex-shrink-0">•</span>

					<button
						onClick={(e) => handleFieldClick(e, 'time')}
						className={cn(
							'text-muted-foreground hover:text-foreground transition-colors',
							'whitespace-nowrap flex-shrink-0 text-left truncate',
							'focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1'
						)}
						title={partyDetails.time || 'Add time'}
					>
						{formatTime(partyDetails.time)}
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
							'absolute md:absolute fixed md:top-full top-0 left-0 right-0 md:mt-2 mt-0 z-50',
							'bg-background border border-border rounded-xl shadow-lg',
							'p-4 md:p-6',
							isClosing ? 'animate-scale-out' : 'animate-scale-in',
							'perspective-1000 md:perspective-1000',
							'w-full md:max-w-[800px]',
							'h-screen md:h-auto overflow-y-auto md:overflow-visible',
							'md:rounded-xl rounded-none'
						style={{
							transformOrigin: window.innerWidth >= 768 ? `${clickOrigin.x}px ${clickOrigin.y}px` : 'center center'
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
									value={formData.date}
									onChange={(e) => handleInputChange('date', e.target.value)}
									leftIcon={<Calendar className="w-4 h-4" />}
								/>

								<Input
									ref={timeInputRef}
									name="time"
									label="Time"
									type="time"
									value={formData.time}
									onChange={(e) => handleInputChange('time', e.target.value)}
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
								<Button
									type="button"
									variant="outline"
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button type="submit">
									Save Changes
								</Button>
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