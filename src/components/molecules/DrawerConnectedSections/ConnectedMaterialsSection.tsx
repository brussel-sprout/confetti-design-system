import { ExternalLink, ShoppingCart } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedMaterialsSectionProps } from './types'

// Helper to extract vendor name from URL
const getVendorFromUrl = (url: string): string => {
	try {
		const domain = new URL(url).hostname.toLowerCase()
		if (domain.includes('amazon')) return 'Amazon'
		if (domain.includes('walmart')) return 'Walmart'
		if (domain.includes('target')) return 'Target'
		if (domain.includes('etsy')) return 'Etsy'
		if (domain.includes('ebay')) return 'eBay'
		// Extract domain name as fallback
		const parts = domain.split('.')
		const name = parts[parts.length - 2] || parts[0]
		return name.charAt(0).toUpperCase() + name.slice(1)
	} catch {
		return 'Shop'
	}
}

// Helper to get status color using HSL
const getStatusColor = (
	status: 'purchased' | 'needed' | 'not_needed' | 'recommended' | 'ignored'
) => {
	switch (status) {
		case 'purchased':
			return 'bg-green-500/10 text-green-700 dark:text-green-400'
		case 'needed':
			return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
		case 'not_needed':
			return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
		case 'recommended':
			return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
		case 'ignored':
			return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
		default:
			return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
	}
}

export const ConnectedMaterialsSection: React.FC<ConnectedMaterialsSectionProps> = ({
	materials,
	onNavigateToMaterial,
	className,
}) => {
	if (materials.length === 0) return null

	return (
		<div className={cn('bg-muted/5 rounded-2xl p-5 border border-border/30', className)}>
			<div className="flex items-center gap-2 mb-4">
				<ShoppingCart className="w-5 h-5 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Connected Materials</h3>
				<div className="ml-auto flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
					{materials.length}
				</div>
			</div>
			<div className="space-y-2">
				{materials.map((material) => (
					<button
						key={material.party_element_material_id}
						onClick={() => onNavigateToMaterial?.(material.party_element_material_id)}
						disabled={!onNavigateToMaterial}
						className={cn(
							'w-full text-left p-3 rounded-lg',
							'bg-background hover:bg-muted/50 transition-colors group mobile-touch-target border border-border/30 hover:border-border/60',
							!onNavigateToMaterial && 'cursor-default'
						)}
					>
						<div className="flex items-start gap-3">
							{/* Material Thumbnail */}
							{material.image ? (
								<img
									src={material.image.image_url}
									alt={material.party_element_material_name}
									className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-border/20"
								/>
							) : (
								<div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/20">
									<ShoppingCart className="w-5 h-5 text-muted-foreground/50" />
								</div>
							)}

							{/* Material Info */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<span
										className={cn(
											'px-2 py-0.5 text-xs font-semibold rounded-full',
											getStatusColor(material.status)
										)}
									>
										{material.status}
									</span>
								</div>
								<p className="text-sm text-foreground font-medium truncate mb-1">
									{material.party_element_material_name}
								</p>
								{material.description && (
									<p className="text-xs text-muted-foreground line-clamp-1">
										{material.description}
									</p>
								)}
								{material.link && (
									<a
										href={material.link}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="inline-flex items-center gap-1.5 mt-2 text-xs text-primary hover:text-primary/80 transition-colors"
									>
										<ExternalLink size={12} />
										<span>Shop on {getVendorFromUrl(material.link)}</span>
									</a>
								)}
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
