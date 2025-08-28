import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={handleToggle}
					className={cn(
						'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
						'backdrop-blur-sm border shadow-sm',
						isSelected
							? 'bg-primary text-primary-foreground border-primary'
							: 'bg-background/80 text-muted-foreground border-border hover:bg-background hover:text-foreground'
					)}
					aria-label={`${isSelected ? 'Deselect' : 'Select'} ${elementName}`}
				>
					<AnimatePresence mode="wait">
						{isSelected ? (
							<motion.div
								key="selected"
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								exit={{ scale: 0, rotate: 180 }}
								transition={{ duration: 0.2 }}
							>
								<Check className="w-4 h-4" />
							</motion.div>
						) : (
							<motion.div
								key="unselected"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ duration: 0.2 }}
								className="w-3 h-3 rounded-full border-2 border-current"
							/>
						)}
					</AnimatePresence>
				</motion.button>
			)}

			{/* Favorite Button */}
			{mode === 'view' && (
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={handleToggle}
					className={cn(
						'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
						'backdrop-blur-sm border shadow-sm',
						isSelected
							? 'bg-destructive text-destructive-foreground border-destructive'
							: 'bg-background/80 text-muted-foreground border-border hover:bg-background hover:text-foreground'
					)}
					aria-label={`${isSelected ? 'Remove from' : 'Add to'} favorites`}
				>
					<Heart className={cn('w-4 h-4', isSelected && 'fill-current')} />
				</motion.button>
			)}

			{/* Delete Button */}
			{mode === 'edit' && onDelete && (
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={handleDelete}
					className="w-8 h-8 rounded-full bg-destructive/80 text-destructive-foreground border border-destructive backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-destructive transition-all duration-200"
					aria-label={`Delete ${elementName}`}
				>
					<Trash2 className="w-4 h-4" />
				</motion.button>
			)}
		</div>
	)
}