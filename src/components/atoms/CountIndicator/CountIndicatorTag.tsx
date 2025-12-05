import React from 'react'

import { cn } from '../../../utils/cn'

export interface CountIndicatorTagProps {
	total: number
	delta: number
	className?: string
}

/**
 * Option C: Pill with delta as a small tag attached to the outer top-right corner
 * Example: "24" pill with "+6" tag attached externally
 */
export const CountIndicatorTag = React.forwardRef<HTMLDivElement, CountIndicatorTagProps>(
	({ total, delta, className = '' }, ref) => {
		const deltaText = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : null

		return (
			<div ref={ref} className={cn('inline-flex items-start relative', className)}>
				<div
					className={cn(
						'inline-flex items-center justify-center',
						'px-3 py-1.5',
						'bg-muted/60 text-foreground',
						'rounded-full',
						'shadow-sm',
						'font-medium text-sm'
					)}
				>
					{total}
				</div>
				{delta !== 0 && deltaText && (
					<div
						className={cn(
							'absolute -top-1 -right-1',
							'inline-flex items-center justify-center',
							'min-w-[1.25rem] h-4 px-1.5',
							'bg-muted-foreground/20 text-muted-foreground',
							'rounded-full',
							'text-[10px] font-medium leading-none',
							'shadow-sm',
							'border border-background/50'
						)}
					>
						{deltaText}
					</div>
				)}
			</div>
		)
	}
)

CountIndicatorTag.displayName = 'CountIndicatorTag'

