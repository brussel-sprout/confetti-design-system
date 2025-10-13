export interface DrawerHeaderProps {
	title: string
	onClose: () => void
	onDelete?: () => Promise<void>
	showDelete?: boolean
	className?: string
	// Duplicate button support
	showDuplicate?: boolean
	onDuplicate?: () => void
	isDuplicating?: boolean
}
