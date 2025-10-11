import * as React from 'react'

import { cn } from '../../../utils/cn'
import { MaterialCard } from '../MaterialCard'
import { MaterialGroupHeader } from './MaterialGroupHeader'

import type { MaterialGroupProps } from './types'

export const MaterialGroup = React.forwardRef<HTMLDivElement, MaterialGroupProps>(
	(
		{
			element,
			materials,
			activeCount,
			completedCount,
			totalCount,
			isExpanded = true,
			onToggleExpanded,
			onEditMaterial,
			onStatusChange,
			className,
			...props
		},
		ref
	) => {
		// Separate materials by status
		const activeMaterials = materials.filter(
			(m) => m.status === 'needed' || m.status === 'recommended'
		)
		const completedMaterials = materials.filter(
			(m) => m.status === 'purchased' || m.status === 'ignored'
		)

		return (
			<div ref={ref} className={cn('animate-fade-in-up', className)} {...props}>
				{/* Subtle top divider */}
				<div className="border-t border-border/60 mb-4" />

				{/* Group Header */}
				<MaterialGroupHeader
					element={element}
					activeCount={activeCount}
					completedCount={completedCount}
					totalCount={totalCount}
					isExpanded={isExpanded}
					onToggleExpanded={onToggleExpanded}
				/>

				{/* Group Content - Collapsible */}
				<div
					className={`overflow-hidden transition-all duration-300 ${
						isExpanded ? 'animate-height-auto' : 'animate-height-collapse'
					}`}
				>
					{/* Active Materials Section */}
					{activeMaterials.length > 0 && (
						<div className="mb-6">
							<div className="px-2 py-3 mb-3">
								<h4 className="text-sm font-medium text-foreground">
									Active Items ({activeMaterials.length})
								</h4>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{activeMaterials.map((material) => (
									<MaterialCard
										key={material.id}
										material={material}
										onEdit={onEditMaterial}
										onStatusChange={onStatusChange}
										variant="active"
									/>
								))}
							</div>
						</div>
					)}

					{/* Completed Materials Section */}
					{completedMaterials.length > 0 && (
						<div>
							<div className="px-2 py-3 mb-3">
								<h4 className="text-sm font-medium text-muted-foreground">
									Completed Items ({completedMaterials.length})
								</h4>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{completedMaterials.map((material) => (
									<MaterialCard
										key={material.id}
										material={material}
										onEdit={onEditMaterial}
										onStatusChange={onStatusChange}
										variant="completed"
									/>
								))}
							</div>
						</div>
					)}

					{/* Empty State */}
					{materials.length === 0 && (
						<div className="p-8 text-center">
							<p className="text-muted-foreground">No shopping items for this element</p>
						</div>
					)}
				</div>

				{/* Subtle bottom divider */}
				<div className="border-t border-border/60 mt-4" />
			</div>
		)
	}
)

MaterialGroup.displayName = 'MaterialGroup'
