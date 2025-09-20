import React from 'react'

import { cn } from '../../../utils/cn'

export interface DropdownProps {
	children: React.ReactNode
	className?: string
}

export interface DropdownTriggerProps {
	children: React.ReactNode
	className?: string
}

export interface DropdownContentProps {
	children: React.ReactNode
	className?: string
	align?: 'left' | 'right' | 'center'
}

export interface DropdownItemProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'default' | 'destructive'
	className?: string
}

export interface DropdownDividerProps {
	className?: string
}

// Context for dropdown state
interface DropdownContextType {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined)

const useDropdown = () => {
	const context = React.useContext(DropdownContext)
	if (!context) {
		throw new Error('Dropdown components must be used within a Dropdown')
	}
	return context
}

// Main Dropdown Container
const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
	({ children, className = '', ...props }, ref) => {
		const [isOpen, setIsOpen] = React.useState(false)
		const dropdownRef = React.useRef<HTMLDivElement>(null)

		// Close dropdown when clicking outside
		React.useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
					setIsOpen(false)
				}
			}

			if (isOpen) {
				document.addEventListener('mousedown', handleClickOutside)
			}

			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [isOpen])

		// Close dropdown when pressing Esc
		React.useEffect(() => {
			const handleEscapeKey = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					setIsOpen(false)
				}
			}

			if (isOpen) {
				document.addEventListener('keydown', handleEscapeKey)
			}

			return () => {
				document.removeEventListener('keydown', handleEscapeKey)
			}
		}, [isOpen])

		return (
			<DropdownContext.Provider value={{ isOpen, setIsOpen }}>
				<div ref={dropdownRef} className={cn('relative', className)} {...props}>
					{children}
				</div>
			</DropdownContext.Provider>
		)
	}
)

// Dropdown Trigger
const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
	({ children, className = '', ...props }, ref) => {
		const { isOpen, setIsOpen } = useDropdown()

		return (
			<button
				ref={ref}
				onClick={() => setIsOpen(!isOpen)}
				className={cn('focus:outline-none focus:ring-2 focus:ring-primary/20', className)}
				{...props}
			>
				{children}
			</button>
		)
	}
)

// Dropdown Content
const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
	({ children, align = 'right', className = '', ...props }, ref) => {
		const { isOpen } = useDropdown()

		const alignClasses = {
			left: 'left-0',
			right: 'right-0',
			center: 'left-1/2 transform -translate-x-1/2',
		}

		if (!isOpen) return null

		return (
			<div
				ref={ref}
				className={cn(
					'absolute mt-2 w-48 py-2 z-50',
					'bg-background border border-border rounded-lg shadow-lg',
					'animate-fade-in',
					alignClasses[align],
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}
)

// Dropdown Item
const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
	({ children, onClick, variant = 'default', className = '', ...props }, ref) => {
		const { setIsOpen } = useDropdown()

		const handleClick = () => {
			if (onClick) onClick()
			setIsOpen(false)
		}

		const variantClasses = {
			default: cn(
				'w-full flex items-center gap-3 px-4 py-2 text-left',
				'text-sm text-foreground hover:bg-muted/50',
				'transition-colors duration-200'
			),
			destructive: cn(
				'w-full flex items-center gap-3 px-4 py-2 text-left',
				'text-sm text-destructive hover:bg-destructive/10',
				'transition-colors duration-200'
			),
		}

		return (
			<button
				ref={ref}
				onClick={handleClick}
				className={cn(variantClasses[variant], className)}
				{...props}
			>
				{children}
			</button>
		)
	}
)

// Dropdown Divider
const DropdownDivider = React.forwardRef<HTMLHRElement, DropdownDividerProps>(
	({ className = '', ...props }, ref) => {
		return <hr ref={ref} className={cn('my-1 border-border', className)} {...props} />
	}
)

Dropdown.displayName = 'Dropdown'
DropdownTrigger.displayName = 'DropdownTrigger'
DropdownContent.displayName = 'DropdownContent'
DropdownItem.displayName = 'DropdownItem'
DropdownDivider.displayName = 'DropdownDivider'

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownDivider }
