import React from 'react'
import { Check } from 'lucide-react'

import { cn } from '../../../utils/cn'

import type { SuggestedElementsListProps } from './types'

export const SuggestedElementsList: React.FC<SuggestedElementsListProps> = ({
	title = 'Suggested Elements',
	description = 'Elements are the key must-haves for your party—the visual and experiential components that bring your celebration to life (e.g., cake, decorations, activities).',
	elements,
	selectedIds = [],
	onSelectionChange,
	className = '',
}) => {
	const handleToggle = (elementId: string) => {
		if (!onSelectionChange) return

		const isSelected = selectedIds.includes(elementId)
		if (isSelected) {
			onSelectionChange(selectedIds.filter((id) => id !== elementId))
		} else {
			onSelectionChange([...selectedIds, elementId])
		}
	}

	const handleCardClick = (elementId: string, e: React.MouseEvent) => {
		e.stopPropagation()
		handleToggle(elementId)
	}

	return (
		<div className={cn('w-full', className)}>
			{/* Header Section */}
			<div className="mb-6">
				<h2 className="text-2xl font-semibold text-foreground mb-3">{title}</h2>
				{description && (
					<p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
				)}
			</div>

			{/* Elements List */}
			<div className="space-y-3">
				{elements.map((element) => {
					const isSelected = selectedIds.includes(element.id)

					return (
						<div
							key={element.id}
							onClick={(e) => handleCardClick(element.id, e)}
							className={cn(
								'flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer touch-manipulation',
								'bg-background border-border',
								'hover:border-primary/40 hover:shadow-sm',
								isSelected && 'border-primary/50 bg-primary/5 shadow-sm',
								'focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2'
							)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									handleToggle(element.id)
								}
							}}
							aria-label={`${isSelected ? 'Deselect' : 'Select'} ${element.title}`}
						>
							{/* Custom Checkbox */}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									handleToggle(element.id)
								}}
								className={cn(
									'flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ease-in-out',
									'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20',
									'flex items-center justify-center',
									isSelected
										? 'bg-primary border-primary text-primary-foreground'
										: 'bg-background border-border hover:border-primary/60',
									'cursor-pointer touch-manipulation'
								)}
								aria-label={`${isSelected ? 'Deselect' : 'Select'} ${element.title}`}
								aria-checked={isSelected}
								role="checkbox"
							>
								{isSelected && (
									<Check
										className="w-3.5 h-3.5 text-primary-foreground"
										strokeWidth={3}
										aria-hidden="true"
									/>
								)}
							</button>

							{/* Content */}
							<div className="flex-1 min-w-0">
								<h3
									className={cn(
										'font-semibold text-foreground mb-1',
										isSelected ? 'text-foreground' : 'text-foreground'
									)}
								>
									{element.title}
								</h3>
								{element.description && (
									<p className="text-sm text-muted-foreground leading-relaxed">
										{element.description}
									</p>
								)}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

