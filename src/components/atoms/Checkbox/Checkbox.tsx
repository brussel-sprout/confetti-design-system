import React from 'react'

import { cn } from '../../../utils/cn'

export interface CheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
	label?: string
	error?: string
	helperText?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline'
	required?: boolean
	indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			label,
			error,
			helperText,
			size = 'md',
			variant = 'default',
			className = '',
			id,
			required = false,
			indeterminate = false,
			checked,
			...props
		},
		ref
	) => {
		const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

		const baseClasses = cn(
			'transition-all duration-200 ease-in-out',
			'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'cursor-pointer'
		)

		const sizeClasses = {
			sm: 'w-4 h-4',
			md: 'w-5 h-5',
			lg: 'w-6 h-6',
		}

		const variantClasses = {
			default: cn(
				'border-2 border-border rounded',
				'checked:bg-primary checked:border-primary',
				'hover:border-primary/60'
			),
			outline: cn(
				'border-2 border-border rounded',
				'checked:bg-transparent checked:border-primary',
				'hover:border-primary/60'
			),
		}

		const checkboxClasses = cn(
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			error ? 'border-destructive focus:ring-destructive/20' : '',
			className
		)

		React.useEffect(() => {
			if (ref && typeof ref === 'object' && ref.current) {
				ref.current.indeterminate = indeterminate
			}
		}, [indeterminate, ref])

		return (
			<div className="w-full">
				<div className="flex items-start gap-3">
					<div className="flex items-center h-5">
						<input
							ref={ref}
							id={inputId}
							type="checkbox"
							className={checkboxClasses}
							required={required}
							checked={checked}
							{...props}
						/>
					</div>

					{label && (
						<div className="flex-1">
							<label
								htmlFor={inputId}
								className="block text-sm font-medium text-foreground cursor-pointer"
							>
								{label}
								{required && <span className="text-destructive ml-1">*</span>}
							</label>
							{helperText && !error && (
								<p className="mt-1 text-sm text-muted-foreground">{helperText}</p>
							)}
						</div>
					)}
				</div>

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
