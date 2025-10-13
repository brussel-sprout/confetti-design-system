import type React from 'react'

export interface FilterDrawerProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	activeFiltersCount?: number
	children: React.ReactNode
	onApplyFilters?: () => void
	onResetFilters?: () => void
	applyLabel?: string
	resetLabel?: string
	showApplyButton?: boolean
	showResetButton?: boolean
}
