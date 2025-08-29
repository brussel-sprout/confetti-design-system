import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface ProgressStepperStep {
	id: string
	label: string
	status: 'completed' | 'current' | 'upcoming'
}

export interface ProgressStepperProps {
	steps: ProgressStepperStep[]
	className?: string
}

const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>(
	({ steps, className = '', ...props }, ref) => {
		return (
			<div ref={ref} className={cn('w-full', className)} {...props}>
				{/* Steps Container */}
				<div className="flex items-center justify-between relative">
					{/* Background connecting line */}
					<div className="absolute top-6 left-6 right-6 h-0.5 bg-muted z-0" />
					
					{/* Progress connecting line */}
					<div
						className="absolute top-6 left-6 h-0.5 bg-primary z-0"
						style={{
							width: steps.length > 1 
								? `${(steps.filter(s => s.status === 'completed').length / (steps.length - 1)) * 100}%`
								: '0%',
							right: 'auto',
							maxWidth: `calc(100% - 48px)` // Account for circle widths
						}}
					/>

					{steps.map((step, index) => {
						const isCompleted = step.status === 'completed'
						const isCurrent = step.status === 'current'
						const isUpcoming = step.status === 'upcoming'

						return (
							<div key={step.id} className="flex flex-col items-center relative z-10">
								{/* Step Circle */}
								<div
									className={cn(
										'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg relative',
										'transition-all duration-300',
										isCompleted && 'bg-primary',
										isCurrent && 'bg-primary',
										isUpcoming && 'bg-muted text-muted-foreground'
									)}
								>
									{isCompleted ? (
										<div>
											<Check className="w-6 h-6" />
										</div>
									) : (
										<span>{index + 1}</span>
									)}
								</div>

								{/* Step Label */}
								<div
									className="mt-3 text-center"
								>
									<span
										className={cn(
											'text-sm font-medium whitespace-nowrap',
											isCompleted && 'text-primary',
											isCurrent && 'text-primary',
											isUpcoming && 'text-muted-foreground'
										)}
									>
										{step.label}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
)

ProgressStepper.displayName = 'ProgressStepper'

export { ProgressStepper }