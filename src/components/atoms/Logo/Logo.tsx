import React from 'react'
import { Brain } from 'lucide-react'

import { cn } from '../../../utils/cn'

export interface LogoProps {
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'minimal' | 'icon-only'
	className?: string
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
	({ size = 'md', variant = 'default', className = '', ...props }, ref) => {
		const sizeClasses = {
			sm: {
				container: 'gap-2',
				icon: 'w-6 h-6 p-1',
				iconSize: 'w-4 h-4',
				text: 'text-sm font-semibold',
			},
			md: {
				container: 'gap-3',
				icon: 'w-8 h-8 p-1.5',
				iconSize: 'w-5 h-5',
				text: 'text-base font-semibold',
			},
			lg: {
				container: 'gap-4',
				icon: 'w-10 h-10 p-2',
				iconSize: 'w-6 h-6',
				text: 'text-lg font-bold',
			},
		}

		const currentSize = sizeClasses[size]

		const iconElement = (
			<div
				className={cn(
					'bg-primary text-primary-foreground rounded-lg flex items-center justify-center',
					'shadow-sm transition-all duration-200',
					currentSize.icon
				)}
			>
				<Brain className={currentSize.iconSize} />
			</div>
		)

		if (variant === 'icon-only') {
			return (
				<div ref={ref} className={cn('inline-flex', className)} {...props}>
					{iconElement}
				</div>
			)
		}

		return (
			<div
				ref={ref}
				className={cn('inline-flex items-center', currentSize.container, className)}
				{...props}
			>
				{iconElement}
				{variant !== 'minimal' && (
					<span className={cn('text-foreground', currentSize.text)}>Party Planner</span>
				)}
			</div>
		)
	}
)

Logo.displayName = 'Logo'

export { Logo }