import React from 'react'
import { cn } from '../../../utils/cn'

export interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
	label?: string
	error?: string
	helperText?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline' | 'filled'
	required?: boolean
}

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
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
			...props
		},
		ref
	) => {
		const inputId = id || `email-input-${Math.random().toString(36).substr(2, 9)}`

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
			rightIcon ? 'pr-10' : '',
			error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
			className
		)

		const defaultLeftIcon = leftIcon || (
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
				/>
			</svg>
		)

		return (
			<div className="w-full">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<div className="relative">
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
						{defaultLeftIcon}
					</div>

					<input
						ref={ref}
						id={inputId}
						type="email"
						className={inputClasses}
						required={required}
						{...props}
					/>

					{rightIcon && (
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

EmailInput.displayName = 'EmailInput'

export { EmailInput }