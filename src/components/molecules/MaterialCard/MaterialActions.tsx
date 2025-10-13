import { AlertTriangle, Check, ExternalLink, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../utils/cn'

export interface MaterialActionsProps {
	hasLink: boolean
	link?: string
	onStatusChange?: (status: 'needed' | 'purchased' | 'ignored') => void
	className?: string
}

export const MaterialActions = React.forwardRef<HTMLDivElement, MaterialActionsProps>(
	({ hasLink, link, onStatusChange, className, ...props }, ref) => {
		const handleQuickAction = React.useCallback(
			(action: 'purchase' | 'dismiss' | 'mark-needed') => {
				if (!onStatusChange) return

				if (action === 'purchase') {
					onStatusChange('purchased')
				} else if (action === 'dismiss') {
					onStatusChange('ignored')
				} else if (action === 'mark-needed') {
					onStatusChange('needed')
				}
			},
			[onStatusChange]
		)

		return (
			<div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
				{/* Primary Action - View & Buy (only shown when link exists) */}
				{hasLink && link && (
					<div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:scale-110 transition-transform"
							aria-label="View and buy item"
						>
							<ExternalLink size={16} />
						</a>
						<span>View & Buy</span>
					</div>
				)}

				{/* Quick Action Buttons */}
				{onStatusChange && (
					<>
						{/* Mark as Needed Button */}
						<div className="relative group">
							<button
								onClick={() => handleQuickAction('mark-needed')}
								className="p-2 rounded-lg border border-powder-blue-500/30 text-powder-blue-600 hover:bg-powder-blue-500/10 transition-colors"
								aria-label="Mark as needed"
							>
								<AlertTriangle size={16} />
							</button>
							{/* Tooltip */}
							<div
								className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg"
								style={{
									backgroundColor: 'var(--color-charcoal-700)',
									color: 'var(--color-primary-foreground)',
								}}
							>
								Mark as Needed
								<div
									className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent"
									style={{ borderTopColor: 'var(--color-charcoal-700)' }}
								></div>
							</div>
						</div>

						{/* Purchase Button */}
						<div className="relative group">
							<button
								onClick={() => handleQuickAction('purchase')}
								className="p-2 rounded-lg border border-blush-500/30 text-blush-600 hover:bg-blush-500/10 transition-colors"
								aria-label="Mark as purchased"
							>
								<Check size={16} />
							</button>
							{/* Tooltip */}
							<div
								className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg"
								style={{
									backgroundColor: 'var(--color-charcoal-700)',
									color: 'var(--color-primary-foreground)',
								}}
							>
								Mark as Purchased
								<div
									className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent"
									style={{ borderTopColor: 'var(--color-charcoal-700)' }}
								></div>
							</div>
						</div>

						{/* Dismiss Button */}
						<div className="relative group">
							<button
								onClick={() => handleQuickAction('dismiss')}
								className="p-2 rounded-lg border border-charcoal-600/30 text-charcoal-700 hover:bg-charcoal-600/10 transition-colors"
								aria-label="Mark as ignored"
							>
								<X size={16} />
							</button>
							{/* Tooltip */}
							<div
								className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg"
								style={{
									backgroundColor: 'var(--color-charcoal-700)',
									color: 'var(--color-primary-foreground)',
								}}
							>
								Mark as Ignored
								<div
									className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent"
									style={{ borderTopColor: 'var(--color-charcoal-700)' }}
								></div>
							</div>
						</div>
					</>
				)}
			</div>
		)
	}
)

MaterialActions.displayName = 'MaterialActions'
