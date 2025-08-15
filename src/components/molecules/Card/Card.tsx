import React from 'react'

import { cn } from '../../../utils/cn'

export interface CardProps {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export interface CardHeaderProps {
	children: React.ReactNode
	className?: string
}

export interface CardContentProps {
	children: React.ReactNode
	className?: string
}

export interface CardFooterProps {
	children: React.ReactNode
	className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'bg-background border border-border rounded-xl shadow-sm',
					'transition-all duration-300 hover:shadow-lg',
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}
)

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)} {...props}>
				{children}
			</div>
		)
	}
)

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
				{children}
			</div>
		)
	}
)

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ children, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}>
				{children}
			</div>
		)
	}
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
