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
}
