import { ChevronDown, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../utils/cn'

export interface MaterialGroupHeaderProps {
	element: {
		id: string
		name: string
		description?: string
		image?: {
			url: string
		}
	}
	activeCount: number
	completedCount: number
	totalCount: number
	isExpanded?: boolean
	onToggleExpanded?: () => void
	className?: string
}

export const MaterialGroupHeader = React.forwardRef<HTMLDivElement, MaterialGroupHeaderProps>(
	(
		{
			element,
			activeCount,
			completedCount,
			totalCount,
			isExpanded = true,
			onToggleExpanded,
			className,
			...props
		},
		ref
	) => {
		return (
			<div ref={ref} className={cn('py-4', className)} {...props}>
				{onToggleExpanded ? (
					<button
						onClick={onToggleExpanded}
						className="w-full flex items-center justify-between hover:bg-muted/30 rounded-lg p-2 -m-2 transition-colors"
					>
						<div className="flex items-center gap-3 flex-1 min-w-0">
							{/* Element Image */}
							<div className="flex-shrink-0">
								{element.image?.url ? (
									<img
										src={element.image.url}
										alt={element.name}
										className="h-12 w-12 object-cover rounded-lg"
									/>
								) : (
									<div className="h-12 w-12 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg flex items-center justify-center">
										<span className="text-lg font-semibold text-muted-foreground">
											{element.name.charAt(0).toUpperCase()}
										</span>
									</div>
								)}
							</div>

							{/* Element Info */}
							<div className="text-left flex-1 min-w-0">
								<h3 className="text-lg font-semibold text-foreground truncate">{element.name}</h3>
								{element.description && (
									<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
										{element.description}
									</p>
								)}
							</div>
						</div>

						{/* Stats and Chevron */}
						<div className="flex items-center gap-3 flex-shrink-0">
							<div className="text-right">
								<div className="text-sm font-medium text-foreground">
									{activeCount}/{totalCount} active
								</div>
								<div className="text-xs text-muted-foreground">{completedCount} completed</div>
							</div>
							{isExpanded ? (
								<ChevronDown size={20} className="text-muted-foreground" />
							) : (
								<ChevronRight size={20} className="text-muted-foreground" />
							)}
						</div>
					</button>
				) : (
					<div className="flex items-center gap-3">
						{/* Element Image */}
						<div className="flex-shrink-0">
							{element.image?.url ? (
								<img
									src={element.image.url}
									alt={element.name}
									className="h-12 w-12 object-cover rounded-lg"
								/>
							) : (
								<div className="h-12 w-12 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg flex items-center justify-center">
									<span className="text-lg font-semibold text-muted-foreground">
										{element.name.charAt(0).toUpperCase()}
									</span>
								</div>
							)}
						</div>

						{/* Element Info */}
						<div className="text-left flex-1 min-w-0">
							<h3 className="text-lg font-semibold text-foreground truncate">{element.name}</h3>
							{element.description && (
								<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
									{element.description}
								</p>
							)}
						</div>

						{/* Stats */}
						<div className="text-right flex-shrink-0">
							<div className="text-sm font-medium text-foreground">
								{activeCount}/{totalCount} active
							</div>
							<div className="text-xs text-muted-foreground">{completedCount} completed</div>
						</div>
					</div>
				)}
			</div>
		)
	}
)

MaterialGroupHeader.displayName = 'MaterialGroupHeader'
