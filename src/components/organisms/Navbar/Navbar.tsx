import React from 'react'

import { Logo } from '../../atoms/Logo'
import { cn } from '../../../utils/cn'

export interface NavbarProps {
	className?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ className = '', ...props }, ref) => {
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
						{/* Logo */}
						<div className="flex-shrink-0">
							<Logo size="sm" />
						</div>

						{/* Auth Links */}
						<div className="flex items-center gap-4">
							<a
								href="/login"
								className={cn(
									'text-sm font-medium text-muted-foreground',
									'hover:text-foreground transition-colors duration-200',
									'px-3 py-2 rounded-md',
									'focus:outline-none focus:ring-2 focus:ring-primary/20'
								)}
							>
								Login
							</a>
							<a
								href="/sign-up"
								className={cn(
									'text-sm font-medium',
									'bg-primary text-primary-foreground',
									'hover:bg-primary/90 transition-colors duration-200',
									'px-4 py-2 rounded-lg',
									'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
								)}
							>
								Sign Up
							</a>
						</div>
					</div>
				</div>
			</nav>
		)
	}
)

Navbar.displayName = 'Navbar'

export { Navbar }