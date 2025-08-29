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
					{steps.map((step, index) => {
						const isCompleted = step.status === 'completed'
						const isCurrent = step.status === 'current'
						const isUpcoming = step.status === 'upcoming'
						const isLast = index === steps.length - 1

						return (
							<div key={step.id} className="flex items-center flex-1">
								{/* Step Circle */}
								<div className="relative flex flex-col items-center">
									<motion.div
										className={cn(
											'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg relative z-10',
											'transition-all duration-300',
											isCompleted && 'bg-primary',
											isCurrent && 'bg-primary',
											isUpcoming && 'bg-muted text-muted-foreground'
										)}
										initial={{ scale: 0.8 }}
										animate={{ scale: 1 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										{isCompleted ? (
											<motion.div
												initial={{ scale: 0, rotate: -180 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{ duration: 0.3 }}
											>
												<Check className="w-6 h-6" />
											</motion.div>
										) : (
											<span>{index + 1}</span>
										)}
									</motion.div>

									{/* Step Label */}
									<motion.div
										className="mt-3 text-center"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
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
									</motion.div>
								</div>

								{/* Connector Line */}
								{!isLast && (
									<div className="flex-1 mx-4 relative">
										{/* Background Line */}
										<div className="h-1 bg-muted rounded-full" />
										
										{/* Progress Line */}
										<motion.div
											className={cn(
												'absolute top-0 left-0 h-1 rounded-full',
												isCompleted ? 'bg-primary' : 'bg-muted'
											)}
											initial={{ width: '0%' }}
											animate={{ 
												width: isCompleted ? '100%' : '0%'
											}}
											transition={{ 
												duration: 0.5, 
												delay: index * 0.2 + 0.3,
												ease: 'easeOut'
											}}
										/>
									</div>
								)}
							</div>
						)
					})}
				</div>

				{/* Progress Indicator Bar */}
				<div className="mt-6 w-full">
					<div className="h-1 bg-muted rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-primary rounded-full"
							initial={{ width: '0%' }}
							animate={{ 
								width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`
							}}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						/>
					</div>
				</div>
			</div>
		)
	}
)

ProgressStepper.displayName = 'ProgressStepper'

export { ProgressStepper }