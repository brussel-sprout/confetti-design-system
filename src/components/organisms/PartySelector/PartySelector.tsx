import React, { useState } from 'react'
import { cn } from '../../../utils/cn'
import { PartyCard } from '../../molecules/PartyCard'
import { Button } from '../../atoms/Button'

export interface PartyOption {
	id: string
	title: string
	description: string
	icon: string
	features: string[]
	status: 'active' | 'inactive'
	badge?: {
		text: string
		variant: 'popular' | 'coming-soon' | 'new' | 'featured'
	}
}

export interface PartySelectorProps {
	title: string
	subtitle: string
	options: PartyOption[]
	selectedId?: string
	onSelect?: (id: string) => void
	onBack?: () => void
	onContinue?: (selectedId: string) => void
	className?: string
}

const PartySelector = React.forwardRef<HTMLDivElement, PartySelectorProps>(
	({ title, subtitle, options, selectedId, onSelect, onBack, onContinue, className = '', ...props }, ref) => {
		const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId)

		const handleCardClick = (id: string) => {
			const option = options.find(opt => opt.id === id)
			if (option?.status === 'active') {
				setInternalSelectedId(id)
				onSelect?.(id)
			}
		}

		const handleContinue = () => {
			if (internalSelectedId) {
				onContinue?.(internalSelectedId)
			}
		}

		const currentSelectedId = selectedId ?? internalSelectedId
		const canContinue = currentSelectedId && options.find(opt => opt.id === currentSelectedId)?.status === 'active'

		return (
			<div ref={ref} className={cn('max-w-6xl mx-auto p-8', className)} {...props}>
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{subtitle}
					</p>
				</div>

				{/* Party Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{options.map((option) => (
						<PartyCard
							key={option.id}
							title={option.title}
							description={option.description}
							icon={option.icon}
							features={option.features}
							status={option.status}
							badge={option.badge}
							onClick={() => handleCardClick(option.id)}
							className={cn(
								currentSelectedId === option.id && option.status === 'active'
									? 'ring-2 ring-primary ring-offset-2'
									: ''
							)}
						/>
					))}
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						onClick={onBack}
						className="flex items-center gap-2"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</Button>

					<div className="text-muted-foreground">
						{canContinue ? 'Ready to continue' : 'Select a party type to continue'}
					</div>
				</div>
			</div>
		)
	}
)

PartySelector.displayName = 'PartySelector'

export { PartySelector }