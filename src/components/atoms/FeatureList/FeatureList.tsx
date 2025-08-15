import React from 'react'
import { cn } from '../../../utils/cn'

export interface FeatureListProps {
	items: string[]
	variant?: 'active' | 'inactive'
	className?: string
}

const FeatureList = React.forwardRef<HTMLUListElement, FeatureListProps>(
	({ items, variant = 'active', className = '', ...props }, ref) => {
		const listClasses = cn('space-y-2', className)

		const itemClasses = cn(
			'flex items-center text-sm',
			variant === 'active' ? 'text-foreground' : 'text-muted-foreground'
		)

		const dotClasses = cn(
			'w-2 h-2 rounded-full mr-3 flex-shrink-0',
			variant === 'active' ? 'bg-primary' : 'bg-muted-foreground/40'
		)

		return (
			<ul ref={ref} className={listClasses} {...props}>
				{items.map((item, index) => (
					<li key={index} className={itemClasses}>
						<div className={dotClasses} />
						{item}
					</li>
				))}
			</ul>
		)
	}
)

FeatureList.displayName = 'FeatureList'

export { FeatureList }