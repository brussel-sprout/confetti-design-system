import { Check, Heart, Trash2 } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { Element } from './types'

interface ElementContentProps {
	element: Element
	layout: 'grid' | 'list'
	mode: 'selection' | 'view' | 'edit'
	isSelected?: boolean
	onToggle?: (elementId: string) => void
	onDelete?: (elementId: string) => void
	contentVariant?: 'default' | 'minimal' | 'detailed'
}

export const ElementContent: React.FC<ElementContentProps> = ({
	element,
	layout,
	mode,
	isSelected,
	onToggle,
	onDelete,
	contentVariant = 'default',
}) => {
	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		onToggle?.(element.party_element_id)
	}

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		onDelete?.(element.party_element_id)
	}

	if (contentVariant === 'minimal') {
		return null
	}

	const contentClasses = cn(layout === 'list' ? 'flex-1 flex flex-col justify-center' : 'p-4')

	return (
		<div className={contentClasses}>
			{/* Title */}
			{!isSelected && (
				<h3
					className={cn(
						'font-semibold text-foreground mb-1 line-clamp-2',
						layout === 'list' ? 'text-base' : 'text-sm'
					)}
				>
					{element.element_name}
				</h3>
			)}

			{/* Description */}
			{contentVariant === 'detailed' && element.description && (
				<p className="text-sm text-muted-foreground mb-3 line-clamp-2">{element.description}</p>
			)}

			{/* List Layout Actions */}
			{layout === 'list' && (
				<div className="flex items-center gap-3 mt-3">
					{mode === 'selection' && onToggle && (
						<button
							onClick={handleToggle}
							className={cn(
								'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover-scale',
								isSelected
									? 'bg-primary text-primary-foreground'
									: 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
							)}
						>
							{isSelected ? (
								<>
									<Check className="w-4 h-4" />
									Selected
								</>
							) : (
								'Select'
							)}
						</button>
					)}

					{mode === 'view' && onToggle && (
						<button
							onClick={handleToggle}
							className={cn(
								'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover-scale',
								isSelected
									? 'bg-destructive text-destructive-foreground'
									: 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
							)}
						>
							<Heart className={cn('w-4 h-4', isSelected && 'fill-current')} />
							{isSelected ? 'Favorited' : 'Favorite'}
						</button>
					)}

					{mode === 'edit' && onDelete && (
						<button
							onClick={handleDelete}
							className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all duration-200 hover-scale"
						>
							<Trash2 className="w-4 h-4" />
							Delete
						</button>
					)}
				</div>
			)}

			{/* Metadata */}
			{contentVariant === 'detailed' && element.created_at && (
				<div className="text-xs text-muted-foreground mt-2">
					Added {new Date(element.created_at).toLocaleDateString()}
				</div>
			)}
		</div>
	)
}
