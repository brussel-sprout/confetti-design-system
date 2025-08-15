import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '../../../utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
	size?: 'sm' | 'md' | 'lg'
	children: React.ReactNode
	className?: string
	disabled?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'default',
			size = 'md',
			className = '',
			disabled = false,
			loading = false,
			children,
			...props
		},
		ref
	) => {
		const baseClasses = cn(
			'inline-flex items-center justify-center gap-2',
			'font-medium font-sans',
			'transition-all duration-200 ease-in-out',
			'focus:outline-none focus:ring-2 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			'rounded-lg backdrop-blur-sm',
			'border-2',
			'cursor-pointer'
		)

		const sizeClasses = {
			sm: 'px-3 py-2 text-sm',
			md: 'px-4 py-2.5 text-base',
			lg: 'px-6 py-3 text-lg',
		}

		const variantClasses = {
			default: cn(
				'bg-primary text-primary-foreground',
				'hover:bg-primary/80',
				'focus:ring-primary/20',
				'border-primary'
			),
			secondary: cn(
				'bg-secondary text-secondary-foreground',
				'hover:bg-secondary/80',
				'focus:ring-secondary/20',
				'border-secondary'
			),
			outline: cn(
				'bg-background/80 text-foreground',
				'hover:bg-background/40',
				'focus:ring-border/20',
				'border-border/30'
			),
			ghost: cn(
				'bg-transparent text-foreground',
				'hover:bg-background/40',
				'focus:ring-border/20',
				'border-transparent'
			),
			destructive: cn(
				'bg-destructive text-destructive-foreground',
				'hover:bg-destructive/80',
				'focus:ring-destructive/20',
				'border-destructive'
			),
		}

		const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className)

		return (
			<motion.button
				ref={ref}
				className={classes}
				disabled={disabled || loading}
				whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
				whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
				{...props}
			>
				{loading && (
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
				)}
				{children}
			</motion.button>
		)
	}
)

Button.displayName = 'Button'

export { Button }
