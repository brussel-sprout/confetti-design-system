import React from 'react'

import { cn } from '../../../utils/cn'

interface CategoryBadgeProps {
	category: string
	variant?: 'default' | 'overlay'
	size?: 'sm' | 'md'
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
	category,
	variant = 'default',
	size = 'sm',
}) => {
	const baseClasses = cn(
		'inline-flex items-center justify-center font-medium rounded-full',
		'transition-colors duration-200'
	)

	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
	}

	const variantClasses = {
		default: 'bg-secondary text-secondary-foreground',
		overlay: 'bg-background/80 text-foreground backdrop-blur-sm border border-border shadow-sm',
	}

	return (
		<span className={cn(baseClasses, sizeClasses[size], variantClasses[variant])}>{category}</span>
	)
}
