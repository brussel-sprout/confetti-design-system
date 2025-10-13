import React from 'react'

import { EditableField } from './EditableField'

import type { EditableFieldProps } from './types'

export interface EditableTextAreaProps extends EditableFieldProps {
	/**
	 * Minimum character length validation
	 */
	minLength?: number
	/**
	 * Maximum character length validation
	 */
	maxLength?: number
	/**
	 * Number of rows for the textarea
	 */
	rows?: number
}

export const EditableTextArea = React.forwardRef<HTMLTextAreaElement, EditableTextAreaProps>(
	({ minLength = 2, maxLength, validation, rows = 3, ...props }, ref) => {
		const validate = (value: string): string | null => {
			// Run custom validation if provided
			if (validation) {
				const customError = validation(value)
				if (customError) return customError
			}

			// Check minimum length
			if (value.length < minLength) {
				return `Must be at least ${minLength} characters`
			}

			// Check maximum length
			if (maxLength && value.length > maxLength) {
				return `Must be ${maxLength} characters or less`
			}

			return null
		}

		return <EditableField ref={ref} {...props} multiline validation={validate} />
	}
)

EditableTextArea.displayName = 'EditableTextArea'

