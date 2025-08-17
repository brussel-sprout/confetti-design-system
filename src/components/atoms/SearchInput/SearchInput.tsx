import React from 'react'
import { cn } from '../../../utils/cn'

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
	label?: string
	error?: string
	helperText?: string
	rightIcon?: React.ReactNode
	size?: 'sm' | 'md' | 'lg'
	variant?: 'default' | 'outline' | 'filled'
	required?: boolean
	onClear?: () => void
	showClearButton?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			label,
			error,
			helperText,
			rightIcon,
			size = 'md',
			variant = 'default',
			className = '',
			id,
			required = false,
			onClear,
			showClearButton = true,
			value,
			...props
		},
		ref
	) => {
		const inputId = id || `search-input-${Math.random().toString(36).substr(2, 9)}`
		const hasValue = value && value.toString().length > 0

		const baseClasses = cn(
			'w-full transition-all duration-200 ease-in-out',
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'placeholder:text-muted-foreground'
		)

		const sizeClasses = {
			sm: 'px-3 py-2 text-sm pl-10',
			md: 'px-4 py-3 text-base pl-10',
			lg: 'px-4 py-4 text-lg pl-12',
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
			(rightIcon || (showClearButton && hasValue)) ? 'pr-10' : '',
			error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : '',
			className
		)

		const searchIcon = (
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
						{searchIcon}
					</div>

					<input
						ref={ref}
						id={inputId}
						type="search"
						className={inputClasses}
						required={required}
						value={value}
						{...props}
					/>

					{showClearButton && hasValue && (
						<button
							type="button"
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							onClick={onClear}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					)}

					{rightIcon && !(showClearButton && hasValue) && (
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

SearchInput.displayName = 'SearchInput'

export { SearchInput }