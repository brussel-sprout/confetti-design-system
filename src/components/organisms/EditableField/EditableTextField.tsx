import React from 'react'

import { EditableField } from './EditableField'

import type { EditableFieldProps } from './types'

export interface EditableTextFieldProps extends Omit<EditableFieldProps, 'multiline'> {
	/**
	 * Minimum character length validation
	 */
	minLength?: number
	/**
	 * Maximum character length validation
	 */
	maxLength?: number
}

export const EditableTextField = React.forwardRef<HTMLInputElement, EditableTextFieldProps>(
	({ minLength = 2, maxLength, validation, ...props }, ref) => {
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

		return <EditableField ref={ref} {...props} validation={validate} />
	}
)

EditableTextField.displayName = 'EditableTextField'

