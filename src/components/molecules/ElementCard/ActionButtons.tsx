import React from 'react'
import { Check, Trash2, Heart } from 'lucide-react'
import { cn } from '../../../utils/cn'

interface ActionButtonsProps {
	mode: 'selection' | 'view' | 'edit'
	isSelected?: boolean
	elementId: string
	elementName: string
	onToggle?: (elementId: string) => void
	onDelete?: (elementId: string) => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
	mode,
	isSelected,
	elementId,
	elementName,
	onToggle,
	onDelete,
}) => {
	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		onToggle?.(elementId)
	}

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		onDelete?.(elementId)
	}

	return (
		<div className="absolute top-3 right-3 z-[2] flex gap-2">
			{/* Selection Button */}
			{mode === 'selection' && onToggle && (
				<button
					onClick={handleToggle}
					className={cn(
						'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover-scale',
						'backdrop-blur-sm border shadow-sm',
						isSelected
							? 'bg-primary text-primary-foreground border-primary'
							: 'bg-background/80 text-muted-foreground border-border hover:bg-background hover:text-foreground'
					)}
					aria-label={`${isSelected ? 'Deselect' : 'Select'} ${elementName}`}
				>
					{isSelected ? (
						<div className="animate-bounce-in">
							<Check className="w-4 h-4" />
						</div>
					) : (
						<div className="w-3 h-3 rounded-full border-2 border-current animate-fade-in" />
					)}
				</button>
			)}

			{/* Favorite Button */}
			{mode === 'view' && (
				<button
					onClick={handleToggle}
					className={cn(
						'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover-scale',
						'backdrop-blur-sm border shadow-sm',
						isSelected
							? 'bg-destructive text-destructive-foreground border-destructive'
							: 'bg-background/80 text-muted-foreground border-border hover:bg-background hover:text-foreground'
					)}
					aria-label={`${isSelected ? 'Remove from' : 'Add to'} favorites`}
				>
					<Heart className={cn('w-4 h-4', isSelected && 'fill-current')} />
				</button>
			)}

			{/* Delete Button */}
			{mode === 'edit' && onDelete && (
				<button
					onClick={handleDelete}
					className="w-8 h-8 rounded-full bg-destructive/80 text-destructive-foreground border border-destructive backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-destructive transition-all duration-200 hover-scale"
					aria-label={`Delete ${elementName}`}
				>
					<Trash2 className="w-4 h-4" />
				</button>
			)}
		</div>
	)
}