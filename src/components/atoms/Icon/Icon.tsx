import React from 'react'
import { cn } from '../../../utils/cn'

export interface IconProps {
	name: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
	className?: string
	color?: string
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
	({ name, size = 'md', className = '', color, ...props }, ref) => {
		const sizeClasses = {
			sm: 'w-4 h-4',
			md: 'w-6 h-6',
			lg: 'w-8 h-8',
			xl: 'w-12 h-12',
		}

		const iconComponents = {
			cake: (
				<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
					<path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.89 2 2 2zm4.5 3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-9 0C7.5 8.67 6.83 8 6 8s-1.5.67-1.5 1.5S5.17 11 6 11s1.5-.67 1.5-1.5zM12 15c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zm8 3H4c-1.1 0-2 .9-2 2v2h20v-2c0-1.1-.9-2-2-2z"/>
				</svg>
			),
			baby: (
				<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
				</svg>
			),
			dinner: (
				<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
					<path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
				</svg>
			),
		}

		const classes = cn(sizeClasses[size], className)

		return (
			<div ref={ref} className={classes} style={{ color }} {...props}>
				{iconComponents[name as keyof typeof iconComponents] || (
					<div className="w-full h-full bg-muted rounded flex items-center justify-center text-xs">
						{name}
					</div>
				)}
			</div>
		)
	}
)

Icon.displayName = 'Icon'

export { Icon }