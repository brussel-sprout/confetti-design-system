import React from 'react'
import { cn } from '../../../utils/cn'

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
	label?: string
	error?: string
	helperText?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline' | 'filled'
	required?: boolean
	showStepper?: boolean
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			label,
			error,
			helperText,
			leftIcon,
			rightIcon,
			size = 'md',
			variant = 'default',
			className = '',
			id,
			required = false,
			showStepper = true,
			min,
			max,
			step = 1,
			value,
			onChange,
			...props
		},
		ref
	) => {
		const inputId = id || `number-input-${Math.random().toString(36).substr(2, 9)}`

		const baseClasses = cn(
			'w-full transition-all duration-200 ease-in-out',
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'placeholder:text-muted-foreground'
		)

		const sizeClasses = {
			sm: 'px-3 py-2 text-sm',
			md: 'px-4 py-3 text-base',
			lg: 'px-4 py-4 text-lg',
		}

		const variantClasses = {
			default: cn(
				'bg-background border border-border',
				'focus:border-primary focus:ring-primary/20',
				'hover:border-primary/60'
			),
			outline: cn(
				'bg-transparent border-2 border-border',
				'focus:border-primary focus:ring-primary/20',
				'hover:border-primary/40'
			),
			filled: cn(
				'bg-muted/50 border border-transparent',
				'focus:bg-background focus:border-primary focus:ring-primary/20',
				'hover:bg-muted/70'
			),
		}

		const inputClasses = cn(
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			'rounded-xl',
			leftIcon ? 'pl-10' : '',
			(rightIcon || showStepper) ? 'pr-16' : '',
			error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
			className
		)

		const handleIncrement = () => {
			const currentValue = Number(value) || 0
			const newValue = currentValue + Number(step)
			if (max === undefined || newValue <= Number(max)) {
				const event = {
					target: { value: newValue.toString() }
				} as React.ChangeEvent<HTMLInputElement>
				onChange?.(event)
			}
		}

		const handleDecrement = () => {
			const currentValue = Number(value) || 0
			const newValue = currentValue - Number(step)
			if (min === undefined || newValue >= Number(min)) {
				const event = {
					target: { value: newValue.toString() }
				} as React.ChangeEvent<HTMLInputElement>
				onChange?.(event)
			}
		}

		return (
			<div className="w-full">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<div className="relative">
					{leftIcon && (
						<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
							{leftIcon}
						</div>
					)}

					<input
						ref={ref}
						id={inputId}
						type="number"
						className={inputClasses}
						required={required}
						min={min}
						max={max}
						step={step}
						value={value}
						onChange={onChange}
						{...props}
					/>

					{showStepper && (
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col">
							<button
								type="button"
								className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
								onClick={handleIncrement}
								disabled={max !== undefined && Number(value) >= Number(max)}
							>
								<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
								</svg>
							</button>
							<button
								type="button"
								className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
								onClick={handleDecrement}
								disabled={min !== undefined && Number(value) <= Number(min)}
							>
								<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>
					)}

					{rightIcon && !showStepper && (
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
							{rightIcon}
						</div>
					)}
				</div>

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}

				{helperText && !error && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
			</div>
		)
	}
)

NumberInput.displayName = 'NumberInput'

export { NumberInput }