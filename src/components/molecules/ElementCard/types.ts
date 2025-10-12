export interface Element {
	party_element_id: string
	element_name: string
	category?: string
	description?: string
	image_url?: string
	created_at?: string
	updated_at?: string
}

export interface Layout {
	type: 'grid' | 'list'
	aspectRatio?: 'square' | 'portrait' | 'landscape'
}

export interface Mode {
	type: 'selection' | 'view' | 'edit'
}

export interface ElementCardProps {
	element: Element
	layout: Layout
	mode: Mode
	contentVariant?: 'default' | 'minimal' | 'detailed'
	isSelected?: boolean
	onToggle?: (elementId: string) => void
	onClick: (element: Element) => void
	onDelete?: (elementId: string) => void
	className?: string
}
