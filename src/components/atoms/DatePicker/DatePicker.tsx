import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../../utils/cn'

export interface DatePickerProps {
	label?: string
	error?: string
	helperText?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline' | 'filled'
	required?: boolean
	disabled?: boolean
	placeholder?: string
	value?: Date
	onChange?: (date: Date | null) => void
	minDate?: Date
	maxDate?: Date
	mode?: 'single' | 'range'
	className?: string
	id?: string
}

interface CalendarProps {
	selectedDate?: Date
	onDateSelect: (date: Date) => void
	minDate?: Date
	maxDate?: Date
	onClose: () => void
}

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar: React.FC<CalendarProps> = ({ 
	selectedDate, 
	onDateSelect, 
	minDate, 
	maxDate, 
	onClose 
}) => {
	const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
	const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days')
	const calendarRef = useRef<HTMLDivElement>(null)

	const today = new Date()
	const currentYear = currentMonth.getFullYear()
	const currentMonthIndex = currentMonth.getMonth()

	// Generate calendar days
	const getDaysInMonth = () => {
		const firstDay = new Date(currentYear, currentMonthIndex, 1)
		const lastDay = new Date(currentYear, currentMonthIndex + 1, 0)
		const startDate = new Date(firstDay)
		startDate.setDate(startDate.getDate() - firstDay.getDay())

		const days = []
		for (let i = 0; i < 42; i++) {
			const date = new Date(startDate)
			date.setDate(startDate.getDate() + i)
			days.push(date)
		}
		return days
	}

	const isDateDisabled = (date: Date) => {
		if (minDate && date < minDate) return true
		if (maxDate && date > maxDate) return true
		return false
	}

	const isDateSelected = (date: Date) => {
		if (!selectedDate) return false
		return date.toDateString() === selectedDate.toDateString()
	}

	const isToday = (date: Date) => {
		return date.toDateString() === today.toDateString()
	}

	const isCurrentMonth = (date: Date) => {
		return date.getMonth() === currentMonthIndex
	}

	const navigateMonth = (direction: 'prev' | 'next') => {
		const newMonth = new Date(currentMonth)
		newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1))
		setCurrentMonth(newMonth)
	}

	const navigateYear = (direction: 'prev' | 'next') => {
		const newMonth = new Date(currentMonth)
		newMonth.setFullYear(currentMonth.getFullYear() + (direction === 'next' ? 1 : -1))
		setCurrentMonth(newMonth)
	}

	const handleDateClick = (date: Date) => {
		if (!isDateDisabled(date)) {
			onDateSelect(date)
			onClose()
		}
	}

	const handleMonthSelect = (monthIndex: number) => {
		const newMonth = new Date(currentMonth)
		newMonth.setMonth(monthIndex)
		setCurrentMonth(newMonth)
		setViewMode('days')
	}

	const handleYearSelect = (year: number) => {
		const newMonth = new Date(currentMonth)
		newMonth.setFullYear(year)
		setCurrentMonth(newMonth)
		setViewMode('months')
	}

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!calendarRef.current?.contains(document.activeElement)) return

			switch (e.key) {
				case 'Escape':
					onClose()
					break
				case 'ArrowLeft':
					e.preventDefault()
					if (viewMode === 'days') {
						const newDate = new Date(selectedDate || today)
						newDate.setDate(newDate.getDate() - 1)
						if (!isDateDisabled(newDate)) {
							onDateSelect(newDate)
						}
					}
					break
				case 'ArrowRight':
					e.preventDefault()
					if (viewMode === 'days') {
						const newDate = new Date(selectedDate || today)
						newDate.setDate(newDate.getDate() + 1)
						if (!isDateDisabled(newDate)) {
							onDateSelect(newDate)
						}
					}
					break
				case 'ArrowUp':
					e.preventDefault()
					if (viewMode === 'days') {
						const newDate = new Date(selectedDate || today)
						newDate.setDate(newDate.getDate() - 7)
						if (!isDateDisabled(newDate)) {
							onDateSelect(newDate)
						}
					}
					break
				case 'ArrowDown':
					e.preventDefault()
					if (viewMode === 'days') {
						const newDate = new Date(selectedDate || today)
						newDate.setDate(newDate.getDate() + 7)
						if (!isDateDisabled(newDate)) {
							onDateSelect(newDate)
						}
					}
					break
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [selectedDate, viewMode, onDateSelect, onClose])

	const renderDaysView = () => (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<button
					onClick={() => navigateMonth('prev')}
					className="p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Previous month"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<div className="flex items-center gap-2">
					<button
						onClick={() => setViewMode('months')}
						className="px-3 py-1 hover:bg-muted rounded-lg transition-colors font-medium"
					>
						{MONTHS[currentMonthIndex]}
					</button>
					<button
						onClick={() => setViewMode('years')}
						className="px-3 py-1 hover:bg-muted rounded-lg transition-colors font-medium"
					>
						{currentYear}
					</button>
				</div>

				<button
					onClick={() => navigateMonth('next')}
					className="p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Next month"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			{/* Weekday headers */}
			<div className="grid grid-cols-7 gap-1">
				{WEEKDAYS.map((day) => (
					<div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
						{day}
					</div>
				))}
			</div>

			{/* Calendar grid */}
			<div className="grid grid-cols-7 gap-1">
				{getDaysInMonth().map((date, index) => {
					const disabled = isDateDisabled(date)
					const selected = isDateSelected(date)
					const todayDate = isToday(date)
					const currentMonthDate = isCurrentMonth(date)

					return (
						<motion.button
							key={index}
							onClick={() => handleDateClick(date)}
							disabled={disabled}
							whileHover={!disabled ? { scale: 1.05 } : {}}
							whileTap={!disabled ? { scale: 0.95 } : {}}
							className={cn(
								'p-2 text-sm rounded-lg transition-all duration-200 relative',
								'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
								currentMonthDate ? 'text-foreground' : 'text-muted-foreground',
								selected && 'bg-primary text-primary-foreground font-semibold',
								!selected && !disabled && 'hover:bg-muted',
								todayDate && !selected && 'bg-accent/20 font-medium',
								disabled && 'opacity-40 cursor-not-allowed'
							)}
							aria-label={`${date.toLocaleDateString()}`}
							aria-selected={selected}
						>
							{date.getDate()}
							{todayDate && !selected && (
								<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
							)}
						</motion.button>
					)
				})}
			</div>
		</div>
	)

	const renderMonthsView = () => (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<button
					onClick={() => navigateYear('prev')}
					className="p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Previous year"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<h3 className="font-semibold text-lg">{currentYear}</h3>

				<button
					onClick={() => navigateYear('next')}
					className="p-2 hover:bg-muted rounded-lg transition-colors"
					aria-label="Next year"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			<div className="grid grid-cols-3 gap-2">
				{MONTHS.map((month, index) => (
					<button
						key={month}
						onClick={() => handleMonthSelect(index)}
						className={cn(
							'p-3 text-sm rounded-lg transition-colors',
							'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary',
							index === currentMonthIndex && 'bg-primary text-primary-foreground'
						)}
					>
						{month}
					</button>
				))}
			</div>
		</div>
	)

	const renderYearsView = () => {
		const startYear = Math.floor(currentYear / 10) * 10
		const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1)

		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<button
						onClick={() => {
							const newMonth = new Date(currentMonth)
							newMonth.setFullYear(currentYear - 10)
							setCurrentMonth(newMonth)
						}}
						className="p-2 hover:bg-muted rounded-lg transition-colors"
						aria-label="Previous decade"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<h3 className="font-semibold text-lg">{startYear} - {startYear + 9}</h3>

					<button
						onClick={() => {
							const newMonth = new Date(currentMonth)
							newMonth.setFullYear(currentYear + 10)
							setCurrentMonth(newMonth)
						}}
						className="p-2 hover:bg-muted rounded-lg transition-colors"
						aria-label="Next decade"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				<div className="grid grid-cols-3 gap-2">
					{years.map((year) => (
						<button
							key={year}
							onClick={() => handleYearSelect(year)}
							className={cn(
								'p-3 text-sm rounded-lg transition-colors',
								'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary',
								year === currentYear && 'bg-primary text-primary-foreground',
								(year < startYear || year > startYear + 9) && 'text-muted-foreground'
							)}
						>
							{year}
						</button>
					))}
				</div>
			</div>
		)
	}

	return (
		<motion.div
			ref={calendarRef}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			className="bg-background border border-border rounded-xl shadow-lg p-4 w-80"
			role="dialog"
			aria-label="Date picker"
		>
			{viewMode === 'days' && renderDaysView()}
			{viewMode === 'months' && renderMonthsView()}
			{viewMode === 'years' && renderYearsView()}
		</motion.div>
	)
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
	(
		{
			label,
			error,
			helperText,
			size = 'md',
			variant = 'default',
			className = '',
			id,
			required = false,
			disabled = false,
			placeholder = 'Select date...',
			value,
			onChange,
			minDate,
			maxDate,
			mode = 'single',
			...props
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false)
		const [internalValue, setInternalValue] = useState<Date | null>(value || null)
		const containerRef = useRef<HTMLDivElement>(null)
		const inputRef = useRef<HTMLInputElement>(null)

		const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`

		const baseClasses = cn(
			'w-full transition-all duration-200 ease-in-out',
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'placeholder:text-muted-foreground cursor-pointer'
		)

		const sizeClasses = {
			sm: 'px-3 py-2 text-sm',
			md: 'px-4 py-3 text-base',
			lg: 'px-4 py-4 text-lg',
		}

		const variantClasses = {
			default: cn(
				'bg-background border border-border',
				'focus:border-primary focus:ring-primary/20',
				'hover:border-primary/60'
			),
			outline: cn(
				'bg-transparent border-2 border-border',
				'focus:border-primary focus:ring-primary/20',
				'hover:border-primary/40'
			),
			filled: cn(
				'bg-muted/50 border border-transparent',
				'focus:bg-background focus:border-primary focus:ring-primary/20',
				'hover:bg-muted/70'
			),
		}

		const inputClasses = cn(
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			'rounded-xl pr-10',
			error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
			className
		)

		const formatDate = (date: Date | null) => {
			if (!date) return ''
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		}

		const handleDateSelect = (date: Date) => {
			setInternalValue(date)
			onChange?.(date)
			setIsOpen(false)
		}

		const handleInputClick = () => {
			if (!disabled) {
				setIsOpen(!isOpen)
			}
		}

		const handleClear = (e: React.MouseEvent) => {
			e.stopPropagation()
			setInternalValue(null)
			onChange?.(null)
		}

		// Close calendar when clicking outside
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
					setIsOpen(false)
				}
			}

			if (isOpen) {
				document.addEventListener('mousedown', handleClickOutside)
				return () => document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [isOpen])

		// Sync external value changes
		useEffect(() => {
			setInternalValue(value || null)
		}, [value])

		return (
			<div className="w-full" ref={containerRef}>
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<div className="relative">
					<input
						ref={ref || inputRef}
						id={inputId}
						type="text"
						className={inputClasses}
						placeholder={placeholder}
						value={formatDate(internalValue)}
						onClick={handleInputClick}
						readOnly
						disabled={disabled}
						required={required}
						aria-expanded={isOpen}
						aria-haspopup="dialog"
						{...props}
					/>

					<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
						{internalValue && !disabled && (
							<button
								type="button"
								onClick={handleClear}
								className="text-muted-foreground hover:text-foreground transition-colors p-1"
								aria-label="Clear date"
							>
								<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						)}
						<div className="text-muted-foreground">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
					</div>

					<AnimatePresence>
						{isOpen && (
							<div className="absolute top-full left-0 z-50 mt-2">
								<Calendar
									selectedDate={internalValue || undefined}
									onDateSelect={handleDateSelect}
									minDate={minDate}
									maxDate={maxDate}
									onClose={() => setIsOpen(false)}
								/>
							</div>
						)}
					</AnimatePresence>
				</div>

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}

				{helperText && !error && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
			</div>
		)
	}
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }