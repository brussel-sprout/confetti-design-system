import { ExternalLink, ShoppingCart } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedMaterialsSectionProps } from './types'

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
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<span
										className={cn(
											'px-2 py-0.5 text-xs font-semibold rounded-full',
											material.status === 'purchased'
												? 'bg-green-100 text-green-800'
												: material.status === 'needed'
													? 'bg-yellow-100 text-yellow-800'
													: 'bg-gray-100 text-gray-800'
										)}
									>
										{material.status}
									</span>
								</div>
								<p className="text-sm text-foreground font-medium truncate">
									{material.party_element_material_name}
								</p>
							</div>
						</div>
						{material.link && (
							<div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
								<ExternalLink size={12} />
								<span className="truncate">Shopping link available</span>
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	)
}
