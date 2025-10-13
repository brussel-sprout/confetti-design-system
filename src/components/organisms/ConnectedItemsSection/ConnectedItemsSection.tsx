import { ChevronRight, ExternalLink } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedItemsSectionProps } from './types'

export const ConnectedItemsSection: React.FC<ConnectedItemsSectionProps> = ({
	items,
	title,
	onItemClick,
	icon,
	// emptyMessage = 'No items connected',
	className,
}) => {
	if (!items || items.length === 0) {
		return null
	}

	return (
		<div className={cn('bg-muted/5 rounded-2xl p-5 border border-border/30', className)}>
			<div className="flex items-center gap-2 mb-4">
				<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
					{icon || <ExternalLink className="w-3 h-3 text-primary" />}
				</div>
				<h3 className="text-sm font-semibold text-foreground">{title}</h3>
				<div className="ml-auto flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
					{items.length}
				</div>
			</div>
			<p className="text-xs text-muted-foreground mb-4">Click any item to view details</p>
			<div className="space-y-2">
				{items.map((item) => (
					<button
						key={item.id}
						onClick={() => onItemClick(item.id)}
						className={cn(
							'w-full text-left flex items-center gap-3 p-3 rounded-lg',
							'bg-background hover:bg-muted/50 transition-colors group mobile-touch-target border border-border/30 hover:border-border/60'
						)}
					>
						{item.image ? (
							<img
								src={item.image.image_url}
								alt={item.name}
								className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border/20"
							/>
						) : (
							<div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/20">
								<div className="w-4 h-4 rounded bg-muted-foreground/30"></div>
							</div>
						)}
						<span className="text-sm text-foreground flex-1 truncate font-medium">{item.name}</span>
						<ChevronRight
							size={16}
							className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0"
						/>
					</button>
				))}
			</div>
		</div>
	)
}

