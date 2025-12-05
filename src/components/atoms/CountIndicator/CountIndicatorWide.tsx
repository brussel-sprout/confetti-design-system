import React from 'react'

import { cn } from '../../../utils/cn'

export interface CountIndicatorWideProps {
	total: number
	delta: number
	hasNewIndicator?: boolean
	className?: string
}

/**
 * Wide pill with total left and delta right, separated by a divider dot
 * Example: "24 • +6"
 * 
 * When hasNewIndicator is true, the pill can be styled to complement
 * the "new" indicator that appears on the icon.
 */
export const CountIndicatorWide = React.forwardRef<HTMLDivElement, CountIndicatorWideProps>(
	({ total, delta, hasNewIndicator = false, className = '' }, ref) => {
		const deltaText = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : '0'

		return (
			<div
				ref={ref}
				className={cn(
					'inline-flex items-center gap-2 px-3 py-1.5',
					'bg-muted/60 text-foreground',
					'rounded-full',
					'shadow-sm',
					'font-medium',
					// Subtle accent when there's a new indicator on the icon
					hasNewIndicator && 'ring-1 ring-primary/20',
					className
				)}
			>
				<span className="text-sm text-foreground">{total}</span>
				{delta !== 0 && <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />}
				{delta !== 0 && <span className="text-xs text-muted-foreground">{deltaText}</span>}
			</div>
		)
	}
)

CountIndicatorWide.displayName = 'CountIndicatorWide'
