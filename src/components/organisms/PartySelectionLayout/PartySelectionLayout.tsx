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

export interface PartySelectionLayoutProps {
	title?: string
	subtitle?: string
	options: PartyOption[]
	selectedId?: string
	onSelect?: (id: string) => void
	onBack?: () => void
	onContinue?: (selectedId: string) => void
	className?: string
}

const PartySelectionLayout = React.forwardRef<HTMLDivElement, PartySelectionLayoutProps>(({ 
		title = "What type of party are you planning?",
		subtitle = "Choose your party type to get personalized themes and recommendations tailored just for you.",
		options, 
		selectedId, 
		onSelect, 
		onBack, 
		onContinue, 
		className = '', 
		...props 
	}, ref) => {
		const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId)

		const handleCardClick = (id: string) => {
			const option = options.find(opt => opt.id === id)
			if (option?.status === 'active') {
				setInternalSelectedId(id)
				onSelect?.(id)
			}
		}

		const handleContinue = () => {
			if (currentSelectedId) {
				onContinue?.(currentSelectedId)
			}
		}

		const currentSelectedId = selectedId ?? internalSelectedId
		const canContinue = currentSelectedId && options.find(opt => opt.id === currentSelectedId)?.status === 'active'

		return (
			<div ref={ref} className={cn('min-h-screen bg-background flex flex-col animate-fade-in', className)} {...props}>
				{/* Main Content Container */}
				<div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-12">
					{/* Header Section */}
					<div className="text-center mb-16 animate-slide-in-right">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
							{title}
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
							{subtitle}
						</p>
					</div>

					{/* Party Cards Grid */}
					<div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						{options.map((option, index) => (
							<div
								key={option.id}
								className="animate-slide-in-right"
								style={{ animationDelay: `${0.1 * index}s` }}
							>
								<PartyCard
									title={option.title}
									description={option.description}
									icon={option.icon}
									features={option.features}
									status={option.status}
									badge={option.badge}
									onClick={() => handleCardClick(option.id)}
									className={cn(
										'h-full transition-all duration-300',
										currentSelectedId === option.id && option.status === 'active'
											? 'ring-2 ring-primary ring-offset-4 shadow-xl scale-[1.02]'
											: ''
									)}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Footer Navigation */}
				<div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
					<div className="max-w-7xl mx-auto px-6 py-6">
						<div className="flex items-center justify-between">
							{/* Back Button */}
							<div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
								<Button
									variant="ghost"
									onClick={onBack}
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
									</svg>
									Back
								</Button>
							</div>

							{/* Status Text */}
							<div className="hidden md:flex items-center text-muted-foreground">
								{canContinue ? (
									<span className="flex items-center gap-2">
										<div className="w-2 h-2 bg-success rounded-full"></div>
										Select a party type to continue
									</span>
								) : (
									'Select a party type to continue'
								)}
							</div>

							{/* Continue Button */}
							<div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
								<Button
									onClick={handleContinue}
									disabled={!canContinue}
									className={cn(
										'transition-all duration-300',
										canContinue 
											? 'bg-primary hover:bg-primary/90' 
											: 'bg-muted text-muted-foreground cursor-not-allowed',
										canContinue 
											? 'ring-2 ring-primary ring-offset-2 shadow-lg'
											: ''
									)}
								>
									Continue
									<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		)
	}
)

PartySelectionLayout.displayName = 'PartySelectionLayout'

export { PartySelectionLayout }