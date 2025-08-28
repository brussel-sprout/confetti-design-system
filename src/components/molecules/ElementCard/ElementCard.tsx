import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { ActionButtons } from './ActionButtons'
import { CategoryBadge } from './CategoryBadge'
import { ElementContent } from './ElementContent'
import { ElementImage } from './ElementImage'

import type { ElementCardProps } from './types'

export const ElementCard: React.FC<ElementCardProps> = ({
	element,
	layout,
	mode,
	contentVariant = 'default',
	isSelected,
	onToggle,
	onClick,
	onDelete,
	className = '',
}) => {
	const handleCardClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onClick(element)
	}

	// Get aspect ratio class based on layout
	const getAspectClass = () => {
		if (layout.type === 'list') return 'aspect-[16/9]'
		if (className) return className

		switch (layout.aspectRatio) {
			case 'portrait':
				return 'aspect-[4/5]'
			case 'landscape':
				return 'aspect-[4/3]'
			case 'square':
			default:
				return 'aspect-square'
		}
	}

	// Get card layout class
	const getCardLayoutClass = () => {
		if (layout.type === 'list') {
			return 'flex flex-row items-center space-x-4 p-4'
		}
		return ''
	}

	// Get image container class
	const getImageContainerClass = () => {
		if (layout.type === 'list') {
			return 'flex-shrink-0 w-24 h-24'
		}
		return `relative ${getAspectClass()} w-full`
	}

	return (
		<motion.div
			layout
			whileHover={{ scale: layout.type === 'list' ? 1.01 : 1.02 }}
			whileTap={{ scale: 0.98 }}
			className={`relative overflow-hidden rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer touch-manipulation group mobile-touch-target w-full max-w-full ${
				isSelected
					? 'ring-2 ring-primary shadow-xl border-primary scale-[1.02]'
					: 'hover:shadow-lg hover:border-primary/20'
			} ${getCardLayoutClass()} ${className}`}
			onClick={handleCardClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault()
					handleCardClick(e as any)
				}
			}}
			aria-label={`${mode.type === 'selection' ? 'Select' : 'View'} ${element.element_name}`}
		>
			{/* Selection Overlay - Subtle overlay for selected state */}
			<AnimatePresence>
				{isSelected && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-[1] pointer-events-none flex items-center justify-center"
					>
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ delay: 0.1, duration: 0.2 }}
							className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							Selected
						</motion.div>
					/>
				)}
			</AnimatePresence>

			{/* Image Container */}
			<div className={getImageContainerClass()}>
				<ElementImage element={element} layout={layout.type} isSelected={isSelected} />

				{/* Category Badge - Top Left */}
				{contentVariant !== 'minimal' && element.category && (
					<div className="absolute top-3 left-3 z-[2]">
						<CategoryBadge category={element.category} variant="overlay" />
					</div>
				)}

				{/* Action Buttons - Top Right */}
				<ActionButtons
					mode={mode.type}
					isSelected={isSelected}
					elementId={element.party_element_id}
					elementName={element.element_name}
					onToggle={onToggle}
					onDelete={onDelete}
				/>
			</div>

			{/* Content Section */}
			<ElementContent
				element={element}
				layout={layout.type}
				mode={mode.type}
				isSelected={isSelected}
				onToggle={onToggle}
				onDelete={onDelete}
				contentVariant={contentVariant}
			/>
		</motion.div>
	)
}