import React from 'react'

import { cn } from '../../../utils/cn'

export interface StatusBadgeProps {
	children: React.ReactNode
	variant?: 'popular' | 'coming-soon' | 'new' | 'featured'
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
	({ children, variant = 'popular', size = 'md', className = '', ...props }, ref) => {
		const baseClasses = cn(
			'inline-flex items-center justify-center font-medium',
			'transition-colors duration-200',
			'rounded-full px-3 py-1'
		)

		const sizeClasses = {
			sm: 'px-2 py-0.5 text-xs',
			md: 'px-3 py-1 text-sm',
			lg: 'px-4 py-1.5 text-base',
		}

		const variantClasses = {
			popular: 'bg-success text-success-foreground',
			'coming-soon': 'bg-muted text-muted-foreground',
			new: 'bg-info text-info-foreground',
			featured: 'bg-warning text-warning-foreground',
		}

		const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className)

		return (
			<div ref={ref} className={classes} {...props}>
				{children}
			</div>
		)
	}
)

StatusBadge.displayName = 'StatusBadge'

export { StatusBadge }
