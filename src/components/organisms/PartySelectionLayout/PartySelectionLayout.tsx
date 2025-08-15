import React, { useState } from 'react'
import { motion } from 'framer-motion'
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

const PartySelectionLayout = React.forwardRef<HTMLDivElement, PartySelectionLayoutProps>(
	({ 
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
			<div 
				ref={ref} 
				className={cn('min-h-screen bg-background flex flex-col', className)} 
				transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
			>
				{/* Main Content Container */}
				<div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-12">
					{/* Header Section */}
					<motion.div 
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
							{title}
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
							{subtitle}
						</p>
					</motion.div>

					{/* Party Cards Grid */}
					<motion.div 
						className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{options.map((option, index) => (
							<motion.div
								key={option.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 * index }}
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
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Footer Navigation */}
				<motion.div 
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="max-w-7xl mx-auto px-6 py-6">
						<div className="flex items-center justify-between">
							{/* Back Button */}
					initial={{ opacity: 0, y: 5 }}
								variant="ghost"
								onClick={onBack}
								className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
								Back
							</Button>

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

					transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
							<Button
							initial={{ opacity: 0, y: 10 }}
							transition={{ 
								duration: 0.3, 
								delay: 0.05 * index,
								ease: "easeOut"
							}}
								className={cn(
									'transition-all duration-300',
									canContinue 
										? 'bg-primary hover:bg-primary/90' 
										? 'ring-2 ring-primary ring-offset-2 shadow-lg'
								)}
							>
								Continue
								<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		)
				initial={{ opacity: 0, y: 5 }}
)

PartySelectionLayout.displayName = 'PartySelectionLayout'

export { PartySelectionLayout }