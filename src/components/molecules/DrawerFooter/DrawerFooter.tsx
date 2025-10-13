import React from 'react'

import { cn } from '../../../utils/cn'

import type { DrawerFooterProps } from './types'

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
	primaryAction,
	secondaryAction,
	className,
}) => {
	return (
		<div className={cn('bg-background border-t border-border/30 p-4 flex-shrink-0', className)}>
			<div className="flex flex-col sm:flex-row gap-3">
				{secondaryAction && (
					<button
						type="button"
						onClick={secondaryAction.onClick}
						disabled={secondaryAction.disabled}
						className="order-2 sm:order-1 w-full sm:w-auto px-4 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium mobile-touch-target disabled:opacity-50"
					>
						{secondaryAction.label}
					</button>
				)}
				<button
					type="button"
					onClick={primaryAction.onClick}
					disabled={primaryAction.disabled || primaryAction.loading}
					className={cn(
						'order-1 sm:order-2 w-full sm:w-auto px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium mobile-touch-target disabled:opacity-50',
						primaryAction.loading && 'cursor-not-allowed'
					)}
				>
					{primaryAction.loading ? 'Loading...' : primaryAction.label}
				</button>
			</div>
		</div>
	)
}
