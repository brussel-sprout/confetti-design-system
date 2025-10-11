import * as React from 'react'

import { cn } from '../../../utils/cn'
import { MaterialActions } from './MaterialActions'
import { MaterialStatus } from './MaterialStatus'

import type { MaterialCardProps } from './types'

export const MaterialCard = React.forwardRef<HTMLDivElement, MaterialCardProps>(
	({ material, onEdit, onStatusChange, variant = 'active', className, ...props }, ref) => {
		const isCompleted = variant === 'completed'

		// Get visual styling based on variant
		const getCardStyles = () => {
			const baseStyles =
				'bg-background border border-border rounded-xl transition-all duration-200 relative shadow-sm hover:shadow-md hover:border-primary/20 overflow-hidden'

			if (isCompleted) {
				return `${baseStyles} opacity-30 hover:opacity-50`
			}

			return baseStyles
		}

		const getTextStyles = () => {
			if (isCompleted) {
				return 'text-muted-foreground line-through'
			}
			return 'text-foreground'
		}

		const getMutedTextStyles = () => {
			if (isCompleted) {
				return 'text-muted-foreground/50 line-through'
			}
			return 'text-muted-foreground'
		}

		const handleEdit = React.useCallback(() => {
			onEdit?.(material)
		}, [onEdit, material])

		const handleStatusChange = React.useCallback(
			(status: 'needed' | 'purchased' | 'ignored') => {
				onStatusChange?.(material.id, status)
			},
			[onStatusChange, material.id]
		)

		return (
			<div className={cn(getCardStyles(), className)} ref={ref} {...props}>
				<div className="px-5 pt-4 pb-5">
					<div className="flex items-start gap-4">
						{/* Material Image - Only show if exists */}
						{material.image?.url && (
							<div className="flex-shrink-0">
								<img
									src={material.image.url}
									alt={material.name}
									className={`h-16 w-16 object-cover rounded-lg ${isCompleted ? 'opacity-40' : ''}`}
								/>
							</div>
						)}

						{/* Material Details */}
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between mb-2">
								<div className="flex items-center gap-2 flex-1 min-w-0">
									{/* Status Icon */}
									<MaterialStatus status={material.status} />

									{/* Material Title */}
									{onEdit ? (
										<button
											onClick={handleEdit}
											className={`text-lg font-semibold tracking-tight truncate text-left hover:text-primary transition-colors ${getTextStyles()}`}
											aria-label="Edit material"
										>
											{material.name}
										</button>
									) : (
										<h3
											className={`text-lg font-semibold tracking-tight truncate ${getTextStyles()}`}
										>
											{material.name}
										</h3>
									)}
								</div>
							</div>

							{/* Description */}
							{material.description && (
								<p className={`text-sm leading-snug ${getMutedTextStyles()} line-clamp-2 mb-2`}>
									{material.description}
								</p>
							)}

							{/* Element Connection */}
							{material.elementName && (
								<p className={`text-xs ${getMutedTextStyles()} mb-3`}>
									Connected to: {material.elementName}
								</p>
							)}

							{/* Purchase Link */}
							{material.link && (
								<div className="flex items-center gap-1 mb-3">
									<a
										href={material.link}
										target="_blank"
										rel="noopener noreferrer"
										className={`text-xs hover:text-primary transition-colors truncate ${getMutedTextStyles()}`}
									>
										{material.link}
									</a>
								</div>
							)}
						</div>
					</div>

					{/* Actions Section */}
					<MaterialActions
						hasLink={!!material.link}
						link={material.link}
						onEdit={handleEdit}
						onStatusChange={handleStatusChange}
					/>
				</div>
			</div>
		)
	}
)

MaterialCard.displayName = 'MaterialCard'
