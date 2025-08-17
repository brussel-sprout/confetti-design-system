import React from 'react'

import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownDivider } from '../../molecules/Dropdown'
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

export interface NavbarDropdownItemProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'default' | 'destructive'
	className?: string
}

export interface NavbarDropdownDividerProps {
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
				<div className="px-4 sm:px-6 lg:px-8">
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
		return (
			<Dropdown className={className} {...props}>
				<DropdownTrigger
					className={cn(
						'flex items-center gap-2 px-3 py-2 rounded-lg',
						'text-sm font-medium text-foreground',
						'hover:bg-muted/50 transition-colors duration-200'
					)}
				>
					<span>{username}</span>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</DropdownTrigger>
				<DropdownContent>
					{children}
				</DropdownContent>
			</Dropdown>
		)
	}
)

// Navbar-specific dropdown item (wrapper around generic DropdownItem)
const NavbarDropdownItem = React.forwardRef<HTMLButtonElement, NavbarDropdownItemProps>(
	(props, ref) => {
		return (
			<DropdownItem ref={ref} {...props} />
		)
	}
)

// Navbar-specific dropdown divider (wrapper around generic DropdownDivider)
const NavbarDropdownDivider = React.forwardRef<HTMLHRElement, NavbarDropdownDividerProps>(
	(props, ref) => {
		return (
			<DropdownDivider ref={ref} {...props} />
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