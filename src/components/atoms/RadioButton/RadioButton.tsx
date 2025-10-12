import React from 'react'

import { cn } from '../../../utils/cn'

export interface RadioOption {
	value: string
	label: string
	disabled?: boolean
	helperText?: string
}

export interface RadioButtonProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
	label?: string
	error?: string
	helperText?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline'
	required?: boolean
	options: RadioOption[]
	orientation?: 'horizontal' | 'vertical'
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
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
			options,
			orientation = 'vertical',
			name,
			value,
			onChange,
			...props
		},
		ref
	) => {
		const groupId = id || `radio-group-${Math.random().toString(36).substr(2, 9)}`
		const radioName = name || groupId

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
				'border-2 border-border rounded-full',
				'checked:bg-primary checked:border-primary',
				'hover:border-primary/60'
			),
			outline: cn(
				'border-2 border-border rounded-full',
				'checked:bg-transparent checked:border-primary',
				'hover:border-primary/60'
			),
		}

		const radioClasses = cn(
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			error ? 'border-destructive focus:ring-destructive/20' : '',
			className
		)

		const containerClasses = cn(
			'flex gap-4',
			orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
		)

		return (
			<div className="w-full">
				{label && (
					<fieldset>
						<legend className="block text-sm font-medium text-foreground mb-3">
							{label}
							{required && <span className="text-destructive ml-1">*</span>}
						</legend>

						<div className={containerClasses}>
							{options.map((option, index) => {
								const optionId = `${groupId}-${index}`
								return (
									<div key={option.value} className="flex items-start gap-3">
										<div className="flex items-center h-5">
											<input
												ref={index === 0 ? ref : undefined}
												id={optionId}
												type="radio"
												name={radioName}
												value={option.value}
												className={radioClasses}
												required={required}
												disabled={option.disabled}
												checked={value === option.value}
												onChange={onChange}
												{...props}
											/>
										</div>

										<div className="flex-1">
											<label
												htmlFor={optionId}
												className={cn(
													'block text-sm font-medium cursor-pointer',
													option.disabled ? 'text-muted-foreground' : 'text-foreground'
												)}
											>
												{option.label}
											</label>
											{option.helperText && (
												<p className="mt-1 text-sm text-muted-foreground">{option.helperText}</p>
											)}
										</div>
									</div>
								)
							})}
						</div>

						{helperText && !error && (
							<p className="mt-3 text-sm text-muted-foreground">{helperText}</p>
						)}
					</fieldset>
				)}

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		)
	}
)

RadioButton.displayName = 'RadioButton'

export { RadioButton }
