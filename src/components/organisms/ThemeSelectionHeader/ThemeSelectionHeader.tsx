import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../utils/cn'
import { ProgressStepper } from '../../molecules/ProgressStepper'
import type { ProgressStepperStep } from '../../molecules/ProgressStepper'

export interface ThemeSelectionHeaderProps {
	currentStep?: number
	title?: string
	subtitle?: string
	className?: string
}

const ThemeSelectionHeader = React.forwardRef<HTMLDivElement, ThemeSelectionHeaderProps>(
	(
		{
			currentStep = 2,
			title = 'Choose Your Theme',
			subtitle = 'Perfect themes for your birthday',
			className = '',
			...props
		},
		ref
	) => {
		const steps: ProgressStepperStep[] = [
			{
				id: 'party-type',
				label: 'Party Type',
				status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming',
			},
			{
				id: 'theme',
				label: 'Theme',
				status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming',
			},
			{
				id: 'elements',
				label: 'Elements',
				status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming',
			},
			{
				id: 'details',
				label: 'Details',
				status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming',
			},
			{
				id: 'review',
				label: 'Review',
				status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'current' : 'upcoming',
			},
		]

		return (
			<div ref={ref} className={cn('w-full', className)} {...props}>
				{/* Progress Stepper */}
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<ProgressStepper steps={steps} />
				</motion.div>

				{/* Main Content */}
				<motion.div
					className="text-center space-y-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
				>
					{/* Main Title with Gradient */}
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
						{title}
					</h1>

					{/* Subtitle */}
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						{subtitle}
					</p>
				</motion.div>
			</div>
		)
	}
)

ThemeSelectionHeader.displayName = 'ThemeSelectionHeader'

export { ThemeSelectionHeader }