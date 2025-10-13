import type React from 'react'

export interface DrawerFooterProps {
	onCancel: () => void
	onSave?: () => void
	onPrimaryAction?: () => void
	primaryLabel?: string
	cancelLabel?: string
	showCancel?: boolean
	showSave?: boolean
	isLoading?: boolean
	isSaving?: boolean
	disabled?: boolean
	className?: string
	children?: React.ReactNode
}

