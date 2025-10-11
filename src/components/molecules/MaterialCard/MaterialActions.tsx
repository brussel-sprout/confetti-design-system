import { AlertTriangle, Check, Edit, ExternalLink, MoreVertical, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../utils/cn'

export interface MaterialActionsProps {
	hasLink: boolean
	link?: string
	onEdit?: () => void
	onStatusChange?: (status: 'needed' | 'purchased' | 'ignored') => void
	className?: string
}

export const MaterialActions = React.forwardRef<HTMLDivElement, MaterialActionsProps>(
	({ hasLink, link, onEdit, onStatusChange, className, ...props }, ref) => {
		const [showOverflowMenu, setShowOverflowMenu] = React.useState(false)
		const overflowMenuRef = React.useRef<HTMLDivElement>(null)

		// Close overflow menu when clicking outside
		React.useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (overflowMenuRef.current && !overflowMenuRef.current.contains(event.target as Node)) {
					setShowOverflowMenu(false)
				}
			}

			if (showOverflowMenu) {
				document.addEventListener('mousedown', handleClickOutside)
			}

			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}, [showOverflowMenu])

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

		const handleOverflowAction = React.useCallback(
			(action: 'mark-needed') => {
				if (!onStatusChange) return

				if (action === 'mark-needed') {
					onStatusChange('needed')
				}
				setShowOverflowMenu(false)
			},
			[onStatusChange]
		)

		return (
			<div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
				{/* Primary Action - View & Buy or Add Link */}
				{hasLink && link ? (
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
				) : (
					<button
						onClick={onEdit}
						className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
						aria-label="Add purchase link"
					>
						<Edit size={16} />
						Add Link
					</button>
				)}

				{/* Overflow Menu */}
				<div className="relative flex-shrink-0" ref={overflowMenuRef}>
					<button
						onClick={() => setShowOverflowMenu(!showOverflowMenu)}
						className="p-1 rounded-md hover:bg-muted/50 transition-colors"
						aria-label="More actions"
					>
						<MoreVertical size={16} className="text-muted-foreground" />
					</button>

					{/* Overflow Menu Dropdown */}
					{showOverflowMenu && (
						<div className="absolute right-0 top-8 bg-background border border-border rounded-lg shadow-lg z-10 min-w-[160px]">
							<div className="py-1">
								<button
									onClick={() => handleOverflowAction('mark-needed')}
									className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted/50"
								>
									<AlertTriangle size={14} className="text-powder-blue-600" />
									Mark as Needed
								</button>
							</div>
						</div>
					)}
				</div>

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
