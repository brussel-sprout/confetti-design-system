import React from 'react'

import { cn } from '../../../utils/cn'

export interface CountIndicatorSuperscriptProps {
	total: number
	delta: number
	className?: string
}

/**
 * Option B: Pill with large total and superscript-style delta in the top-right
 * Example: "24" with "+6" as superscript inside the pill
 */
export const CountIndicatorSuperscript = React.forwardRef<HTMLDivElement, CountIndicatorSuperscriptProps>(
	({ total, delta, className = '' }, ref) => {
		const deltaText = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : null

		return (
			<div
				ref={ref}
				className={cn(
					'inline-flex items-start relative',
					'px-3 py-1.5',
					'bg-muted/60 text-foreground',
					'rounded-full',
					'shadow-sm',
					className
				)}
			>
				<span className="text-sm font-medium text-foreground leading-none">{total}</span>
				{delta !== 0 && deltaText && (
					<span
						className={cn(
							'absolute -top-0.5 -right-1',
							'text-[10px] font-medium leading-none',
							'text-muted-foreground',
							'px-1 py-0.5',
							'bg-background/80 rounded-full',
							'shadow-sm'
						)}
					>
						{deltaText}
					</span>
				)}
			</div>
		)
	}
)

CountIndicatorSuperscript.displayName = 'CountIndicatorSuperscript'

