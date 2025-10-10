import { Plus, X } from 'lucide-react'
import React from 'react'

import { ElementCard } from '../ElementCard'

import type { Element } from '../ElementCard/types'

// SuggestionData type definition
export interface SuggestionData {
	party_element_id: string
	created_on: Date
	description: string | null
	element_name: string
	is_suggestion: boolean
	suggestion_status: 'pending' | 'approved' | 'rejected'
	image: {
		image_id: string
		description: string | null
		image_url: string
		name: string | null
		created_on: Date
	} | null
	materials: Array<{
		created_on: Date
		description: string | null
		link: string | null
		party_element_material_name: string
		party_element_material_id: string
		status: 'needed' | 'recommended' | 'purchased' | 'ignored'
	}>
	category?: string
}

interface SuggestionElementCardProps {
	suggestion: SuggestionData
	onApply: (elementId: string) => Promise<void>
	onReject: (elementId: string) => Promise<void>
	isApplying?: boolean
	isRejecting?: boolean
	layout: { type: 'grid' | 'list'; aspectRatio?: 'square' | 'portrait' | 'landscape' }
	mode: { type: 'selection' | 'view' | 'edit' }
	contentVariant?: 'default' | 'minimal'
	isSelected?: boolean
	onToggle?: (elementId: string) => void
	onClick?: (element: Element) => void
	onDelete?: (elementId: string) => Promise<void>
	className?: string
}

export function SuggestionElementCard({
	suggestion,
	onApply,
	onReject,
	isApplying = false,
	isRejecting = false,
	layout,
	mode,
	contentVariant = 'default',
	isSelected = false,
	onToggle,
	onClick,
	onDelete,
	className = '',
}: SuggestionElementCardProps) {
	const handleApply = async (e: React.MouseEvent) => {
		e.stopPropagation()
		try {
			await onApply(suggestion.party_element_id)
		} catch (error) {
			console.error('Error applying suggestion:', error)
		}
	}

	const handleReject = async (e: React.MouseEvent) => {
		e.stopPropagation()
		try {
			await onReject(suggestion.party_element_id)
		} catch (error) {
			console.error('Error rejecting suggestion:', error)
		}
	}

	// Convert SuggestionData to Element for ElementCard
	const elementData: Element = {
		party_element_id: suggestion.party_element_id,
		element_name: suggestion.element_name,
		category: suggestion.category || 'Suggestion',
		description: suggestion.description || undefined,
		image_url: suggestion.image?.image_url,
		created_at: suggestion.created_on.toISOString(),
		updated_at: suggestion.created_on.toISOString(),
	}

	return (
		<div className="relative group">
			{/* Use ElementCard for the main content */}
			<ElementCard
				element={elementData}
				layout={layout}
				mode={mode}
				contentVariant={contentVariant}
				isSelected={isSelected}
				onToggle={onToggle || (() => {})}
				onClick={onClick || (() => {})}
				onDelete={onDelete}
				className={className}
			/>

			{/* Pinterest-style Hover Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl pointer-events-none" />

			{/* Subtle Add Button - top-right corner */}
			<button
				onClick={handleApply}
				disabled={isApplying || isRejecting}
				className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
				aria-label="Add to party"
			>
				{isApplying ? (
					<div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
				) : (
					<Plus className="w-4 h-4" />
				)}
			</button>

			{/* Reject Button - subtle, top-left corner */}
			<button
				onClick={handleReject}
				disabled={isApplying || isRejecting}
				className="absolute top-3 left-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-20 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Reject suggestion"
			>
				{isRejecting ? (
					<div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
				) : (
					<X className="w-3 h-3" />
				)}
			</button>
		</div>
	)
}
