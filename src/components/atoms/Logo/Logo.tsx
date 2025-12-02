import React from 'react'

import { cn } from '../../../utils/cn'

export interface LogoProps {
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
	({ size = 'md', className = '', ...props }, ref) => {
		const sizeClasses = {
			sm: {
				container: 'gap-1.5',
				icon: 'w-6 h-6',
				text: 'text-sm font-semibold',
			},
			md: {
				container: 'gap-2',
				icon: 'w-8 h-8',
				text: 'text-base font-semibold',
			},
			lg: {
				container: 'gap-3',
				icon: 'w-10 h-10',
				text: 'text-lg font-bold',
			},
		}

		const currentSize = sizeClasses[size]

		return (
			<div
				ref={ref}
				className={cn('inline-flex items-center flex-shrink-0', currentSize.container, className)}
				{...props}
			>
				<div className={cn('flex items-center justify-center flex-shrink-0', currentSize.icon)}>
					<img
						src="/favicon.svg"
						alt="Party Sprout"
						className="w-full h-full object-contain"
						style={{ imageRendering: 'crisp-edges' }}
					/>
				</div>
				<span className={cn('text-foreground hidden sm:inline flex-shrink-0', currentSize.text)}>
					Party Sprout
				</span>
			</div>
		)
	}
)

Logo.displayName = 'Logo'

export { Logo }
