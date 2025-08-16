import React from 'react'

import { cn } from '../../../utils/cn'

export interface NavbarProps {
	children: React.ReactNode
	className?: string
}

export interface NavbarLeftProps {
	children: React.ReactNode
	className?: string
}

export interface NavbarRightProps {
	children: React.ReactNode
	className?: string
}

export interface NavbarLinkProps {
	href: string
	children: React.ReactNode
	variant?: 'default' | 'primary'
	className?: string
}

export interface NavbarAccountDropdownProps {
	username: string
	children: React.ReactNode
	className?: string
}

// Main Navbar Container
const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<nav
				ref={ref}
				className={cn(
					'w-full bg-background/95 backdrop-blur-sm border-b border-border',
					'sticky top-0 z-50',
					'transition-all duration-200',
					className
				)}
				{...props}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{children}
					</div>
				</div>
			</nav>
		)
	}
)

// Left side container
const NavbarLeft = React.forwardRef<HTMLDivElement, NavbarLeftProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
				{children}
			</div>
		)
	}
)

// Right side container
const NavbarRight = React.forwardRef<HTMLDivElement, NavbarRightProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
				{children}
			</div>
		)
	}
)

// Navbar Link component
const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
	({ href, children, variant = 'default', className = '', ...props }, ref) => {
		const variantClasses = {
			default: cn(
				'text-sm font-medium text-muted-foreground',
				'hover:text-foreground transition-colors duration-200',
				'px-3 py-2 rounded-md',
				'focus:outline-none focus:ring-2 focus:ring-primary/20'
			),
			primary: cn(
				'text-sm font-medium',
				'bg-primary text-primary-foreground',
				'hover:bg-primary/90 transition-colors duration-200',
				'px-4 py-2 rounded-lg',
				'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
			),
		}

		return (
			<a
				ref={ref}
				href={href}
				className={cn(variantClasses[variant], className)}
				{...props}
			>
				{children}
			</a>
		)
	}
)

// Account Dropdown component
const NavbarAccountDropdown = React.forwardRef<HTMLDivElement, NavbarAccountDropdownProps>(
	({ username, children, className = '', ...props }, ref) => {
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
			<div ref={dropdownRef} className={cn('relative', className)} {...props}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						'flex items-center gap-2 px-3 py-2 rounded-lg',
						'text-sm font-medium text-foreground',
						'hover:bg-muted/50 transition-colors duration-200',
						'focus:outline-none focus:ring-2 focus:ring-primary/20'
					)}
				>
					<span>{username}</span>
					<svg 
						className={cn(
							'w-4 h-4 transition-transform duration-200',
							isOpen ? 'rotate-180' : ''
						)} 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{isOpen && (
					<div className={cn(
						'absolute right-0 mt-2 w-48 py-2',
						'bg-background border border-border rounded-lg shadow-lg',
						'animate-fade-in z-50'
					)}>
						{React.Children.map(children, (child) =>
							React.cloneElement(child as React.ReactElement, {
								onClick: (e: React.MouseEvent) => {
									const originalOnClick = (child as React.ReactElement).props.onClick
									if (originalOnClick) originalOnClick(e)
									setIsOpen(false)
								}
							})
						)}
					</div>
				)}
			</div>
		)
	}
)

// Dropdown Menu Item
export interface NavbarDropdownItemProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'default' | 'destructive'
	className?: string
}

const NavbarDropdownItem = React.forwardRef<HTMLButtonElement, NavbarDropdownItemProps>(
	({ children, onClick, variant = 'default', className = '', ...props }, ref) => {
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
				onClick={onClick}
				className={cn(variantClasses[variant], className)}
				{...props}
			>
				{children}
			</button>
		)
	}
)

// Dropdown Divider
export interface NavbarDropdownDividerProps {
	className?: string
}

const NavbarDropdownDivider = React.forwardRef<HTMLHRElement, NavbarDropdownDividerProps>(
	({ className = '', ...props }, ref) => {
		return (
			<hr ref={ref} className={cn('my-1 border-border', className)} {...props} />
		)
	}
)

Navbar.displayName = 'Navbar'
NavbarLeft.displayName = 'NavbarLeft'
NavbarRight.displayName = 'NavbarRight'
NavbarLink.displayName = 'NavbarLink'
NavbarAccountDropdown.displayName = 'NavbarAccountDropdown'
NavbarDropdownItem.displayName = 'NavbarDropdownItem'
NavbarDropdownDivider.displayName = 'NavbarDropdownDivider'

export { 
	Navbar, 
	NavbarLeft, 
	NavbarRight, 
	NavbarLink, 
	NavbarAccountDropdown,
	NavbarDropdownItem,
	NavbarDropdownDivider
}