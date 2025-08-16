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
		const [formData, setFormData] = React.useState<PartyDetails>(partyDetails)

		// Update form data when partyDetails prop changes
		React.useEffect(() => {
			setFormData(partyDetails)
		}, [partyDetails])

		const handleFieldClick = () => {
			setIsOpen(true)
		}

		const handleClose = () => {
			setIsOpen(false)
			setFormData(partyDetails) // Reset form data
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
			<div ref={ref} className={cn('relative', className)} {...props}>
				{/* Compact Display */}
				<div className="flex items-center gap-1 text-sm overflow-hidden max-w-full">
					<button
						onClick={handleFieldClick}
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
						onClick={handleFieldClick}
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
						onClick={handleFieldClick}
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
						onClick={handleFieldClick}
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
						onClick={handleFieldClick}
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
						className={cn(
								'absolute top-full left-0 right-0 mt-2 z-50',
								'bg-background border border-border rounded-xl shadow-lg',
								'p-6'
							)}
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
											name="name"
											label="Party Name"
											value={formData.name}
											onChange={(e) => handleInputChange('name', e.target.value)}
											placeholder="Enter party name"
											leftIcon={<Calendar className="w-4 h-4" />}
										/>
									</div>

									<Input
										name="date"
										label="Date"
										type="date"
										value={formData.date}
										onChange={(e) => handleInputChange('date', e.target.value)}
										leftIcon={<Calendar className="w-4 h-4" />}
									/>

									<Input
										name="time"
										label="Time"
										type="time"
										value={formData.time}
										onChange={(e) => handleInputChange('time', e.target.value)}
										leftIcon={<Clock className="w-4 h-4" />}
									/>

									<Input
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