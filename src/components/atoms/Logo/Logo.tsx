import React from 'react'

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
				icon: 'w-6 h-6',
				text: 'text-sm font-semibold',
			},
			md: {
				container: 'gap-3',
				icon: 'w-8 h-8',
				text: 'text-base font-semibold',
			},
			lg: {
				container: 'gap-4',
				icon: 'w-10 h-10',
				text: 'text-lg font-bold',
			},
		}

		const currentSize = sizeClasses[size]

		const iconElement = (
			<div
				className={cn(
					'flex items-center justify-center flex-shrink-0 transition-all duration-200',
					currentSize.icon
				)}
			>
				<img
					src="/favicon.svg"
					alt="Party Sprout Logo"
					className="w-full h-full object-contain"
					style={{ imageRendering: 'crisp-edges' }}
				/>
			</div>
		)

		if (variant === 'icon-only') {
			return (
				<div ref={ref} className={cn('inline-flex items-center', className)} {...props}>
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
					<span className={cn('text-foreground hidden sm:inline flex-shrink-0', currentSize.text)}>
						Party Sprout
					</span>
				)}
			</div>
		)
	}
)

Logo.displayName = 'Logo'

export { Logo }
