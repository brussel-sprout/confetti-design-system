import React from 'react'
import { cn } from '../../../utils/cn'
import { Card, CardContent, CardHeader } from '../Card'
import { Icon } from '../../atoms/Icon'
import { StatusBadge } from '../../atoms/StatusBadge'
import { FeatureList } from '../../atoms/FeatureList'

export interface PartyCardProps {
	title: string
	description: string
	icon: string
	features: string[]
	status?: 'active' | 'inactive'
	badge?: {
		text: string
		variant: 'popular' | 'coming-soon' | 'new' | 'featured'
	}
	onClick?: () => void
	className?: string
}

const PartyCard = React.forwardRef<HTMLDivElement, PartyCardProps>(
	({ title, description, icon, features, status = 'active', badge, onClick, className = '', ...props }, ref) => {
		const isActive = status === 'active'
		const isClickable = isActive && onClick

		const cardClasses = cn(
			'relative transition-all duration-300 cursor-pointer hover-lift',
			isActive
				? 'bg-background border-border shadow-lg hover:shadow-xl hover:scale-[1.02]'
				: 'bg-muted/30 border-muted text-muted-foreground cursor-not-allowed',
			'min-h-[400px]',
			className
		)

		const iconContainerClasses = cn(
			'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto',
			isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
		)

		const titleClasses = cn(
			'text-xl font-semibold mb-3 text-center',
			isActive ? 'text-foreground' : 'text-muted-foreground'
		)

		const descriptionClasses = cn(
			'text-sm text-center mb-6 leading-relaxed',
			isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'
		)


		return (
			<Card
				ref={ref}
				className={cardClasses}
				onClick={isClickable ? onClick : undefined}
				{...props}
			>
				{badge && (
					<div className="absolute -top-2 left-4 animate-slide-in-left">
						<StatusBadge variant={badge.variant}>{badge.text}</StatusBadge>
					</div>
				)}

				<CardHeader className="pt-8 pb-4">
					<div className={iconContainerClasses}>
						<Icon name={icon} size="xl" />
					</div>
					<h3 className={titleClasses}>{title}</h3>
					<p className={descriptionClasses}>{description}</p>
				</CardHeader>

				<CardContent className="pt-0">
					<FeatureList items={features} variant={isActive ? 'active' : 'inactive'} />
				</CardContent>
			</Card>
		)
	}
)

PartyCard.displayName = 'PartyCard'

export { PartyCard }