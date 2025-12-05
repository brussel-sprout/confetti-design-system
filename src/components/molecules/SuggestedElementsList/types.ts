export interface SuggestedElement {
	id: string
	title: string
	description: string
}

export interface SuggestedElementsListProps {
	title?: string
	description?: string
	elements: SuggestedElement[]
	selectedIds?: string[]
	onSelectionChange?: (selectedIds: string[]) => void
	className?: string
}

