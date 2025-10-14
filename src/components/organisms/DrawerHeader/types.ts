import type React from 'react'

export interface DrawerHeaderProps {
	title: string | React.ReactNode
	onClose: () => void
	showDelete?: boolean
	onDelete?: () => void
	isDeleting?: boolean
	showCloseButton?: boolean
	className?: string
	// Duplicate button support
	showDuplicate?: boolean
	onDuplicate?: () => void
	isDuplicating?: boolean
	// Custom title content (for additional elements like badges, dropdowns, etc.)
	titleContent?: React.ReactNode
	// Content before the title (like checkboxes, icons, etc.)
	prefixContent?: React.ReactNode
	// Editable title support
	isEditable?: boolean
	onTitleChange?: (newTitle: string) => void | Promise<void>
	titlePlaceholder?: string
	maxTitleLength?: number
	// Variant for different states (e.g., completed task)
	variant?: 'default' | 'completed'
}
