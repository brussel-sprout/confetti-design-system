import type React from 'react'

export interface EditableFieldProps {
	value: string
	onSave: (value: string) => void
	onCancel?: () => void
	placeholder?: string
	className?: string
	multiline?: boolean
	showEditIcon?: boolean
	onClick?: () => void
	forceEditing?: boolean
	ref?: React.Ref<HTMLTextAreaElement | HTMLInputElement>
	validation?: (value: string) => string | null
	autoFocus?: boolean
}

export interface EditableFieldState {
	isEditing: boolean
	editValue: string
}

