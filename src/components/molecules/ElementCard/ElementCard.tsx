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
			return 'flex flex-row items-center gap-4 p-4'
		}
		return 'p-0'
	}

	// Get image container class
	const getImageContainerClass = () => {
		if (layout.type === 'list') {
			return 'flex-shrink-0 w-24 h-24'
		}
		return `relative ${getAspectClass()} w-full`
	}

	return (
		<div
			className={`relative overflow-hidden rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer touch-manipulation group w-full max-w-full hover-scale ${
				isSelected
					? 'ring-2 ring-primary/50 shadow-lg border-primary/30'
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
			{isSelected && (
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1] pointer-events-none flex flex-col items-center justify-center animate-fade-in">
					{/* Title Overlay - Centered */}
					<div className="text-center px-4 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
						<h3 className="text-white font-bold text-xl leading-tight drop-shadow-lg mb-1">
							{element.element_name}
						</h3>
						{element.category && (
							<p className="text-white/90 text-sm drop-shadow-md">{element.category}</p>
						)}
					</div>
				</div>
			)}

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
		</div>
	)
}
