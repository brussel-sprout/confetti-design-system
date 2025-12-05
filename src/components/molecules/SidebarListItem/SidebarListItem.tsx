import React from 'react'

import { cn } from '../../../utils/cn'
import { CountIndicatorWide } from '../../atoms/CountIndicator'

export interface SidebarListItemProps {
	icon: React.ReactNode
	label: string
	total: number
	delta: number
	hasNewIndicator?: boolean
	onClick?: () => void
	className?: string
}

/**
 * Sidebar list item component that combines:
 * - Icon with optional "new" indicator dot
 * - Label text
 * - Count indicator with total and delta
 * 
 * Design approach: Keep indicators separate for clarity
 * - "New" indicator: Small dot on icon (handled by parent/icon wrapper)
 * - Count indicator: Clean pill on the right
 */
export const SidebarListItem = React.forwardRef<HTMLButtonElement, SidebarListItemProps>(
	({ icon, label, total, delta, hasNewIndicator = false, onClick, className = '' }, ref) => {
		return (
			<button
				ref={ref}
				onClick={onClick}
				className={cn(
					'w-full flex items-center justify-between',
					'py-2 px-3',
					'rounded-md',
					'hover:bg-background/50',
					'transition-colors',
					'text-left',
					className
				)}
			>
				{/* Left: Icon + Label */}
				<div className="flex items-center gap-3 flex-1 min-w-0">
					{/* Icon Container with New Indicator */}
					<div className="relative flex-shrink-0">
						{icon}
						{hasNewIndicator && (
							<span
								className={cn(
									'absolute -top-0.5 -right-0.5',
									'w-2 h-2 rounded-full',
									'bg-primary',
									'ring-2 ring-background',
									'animate-pulse'
								)}
								aria-label="New items"
							/>
						)}
					</div>
					<span className="text-sm font-medium text-foreground truncate">{label}</span>
				</div>

				{/* Right: Count Indicator */}
				<div className="flex-shrink-0 ml-4">
					<CountIndicatorWide total={total} delta={delta} hasNewIndicator={hasNewIndicator} />
				</div>
			</button>
		)
	}
)

SidebarListItem.displayName = 'SidebarListItem'

