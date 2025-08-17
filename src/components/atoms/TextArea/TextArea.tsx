import React from 'react'
import { cn } from '../../../utils/cn'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	helperText?: string
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline' | 'filled'
	required?: boolean
	resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
			resize = 'vertical',
			rows = 4,
			...props
		},
		ref
	) => {
		const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

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

		const resizeClasses = {
			none: 'resize-none',
			vertical: 'resize-y',
			horizontal: 'resize-x',
			both: 'resize',
		}

		const textareaClasses = cn(
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			resizeClasses[resize],
			'rounded-xl',
			error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
			className
		)

		return (
			<div className="w-full">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<textarea
					ref={ref}
					id={inputId}
					className={textareaClasses}
					required={required}
					rows={rows}
					{...props}
				/>

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}

				{helperText && !error && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'

export { TextArea }