import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, CheckCircle } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { ProgressStep } from '../../molecules/ProgressStep'
import { ProgressBar } from '../../atoms/ProgressBar'
import { Button } from '../../atoms/Button'

export interface ProgressStepData {
	id: string
	title: string
	description: string
	status: 'pending' | 'running' | 'completed' | 'failed'
	progress: number
	estimatedTime: string
}

export interface ProgressCategory {
	id: string
	name: string
	steps: ProgressStepData[]
	status: 'pending' | 'running' | 'completed'
}

export interface ProgressTrackerProps {
	isOpen: boolean
	onClose?: () => void
	categories: ProgressCategory[]
	onComplete?: () => void
	title?: string
	subtitle?: string
	allowClose?: boolean
	className?: string
}

const ProgressTracker = React.forwardRef<HTMLDivElement, ProgressTrackerProps>(
	(
		{
			isOpen,
			onClose,
			categories,
			onComplete,
			title = 'Creating Your Party',
			subtitle = 'We\'re working behind the scenes to make your party perfect',
			allowClose = false,
			className = '',
			...props
		},
		ref
	) => {
		const [currentActivity, setCurrentActivity] = useState<string>('')
		const [isCompleted, setIsCompleted] = useState(false)

		// Calculate overall progress
		const totalSteps = categories.reduce((acc, cat) => acc + cat.steps.length, 0)
		const completedSteps = categories.reduce(
			(acc, cat) => acc + cat.steps.filter(step => step.status === 'completed').length,
			0
		)
		const overallProgress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

		// Get current running step for activity display
		useEffect(() => {
			const runningStep = categories
				.flatMap(cat => cat.steps)
				.find(step => step.status === 'running')

			if (runningStep) {
				setCurrentActivity(runningStep.description)
			} else if (overallProgress === 100) {
				setCurrentActivity('Finalizing your party setup...')
				if (!isCompleted) {
					setTimeout(() => {
						setIsCompleted(true)
						onComplete?.()
					}, 1500)
				}
			}
		}, [categories, overallProgress, isCompleted, onComplete])

		if (!isOpen) return null

		return (
			<AnimatePresence>
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						ref={ref}
						className={cn(
							'w-full max-w-2xl max-h-[90vh] overflow-hidden',
							'bg-background border border-border rounded-2xl shadow-2xl',
							className
						)}
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						{...props}
					>
						{/* Header */}
						<div className="p-6 border-b border-border">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<motion.div
										className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
										animate={{ rotate: isCompleted ? 0 : 360 }}
										transition={{ duration: 2, repeat: isCompleted ? 0 : Infinity, ease: 'linear' }}
									>
										{isCompleted ? (
											<CheckCircle className="w-5 h-5 text-success" />
										) : (
											<Sparkles className="w-5 h-5 text-primary" />
										)}
									</motion.div>
									<div>
										<h2 className="text-xl font-bold text-foreground">{title}</h2>
										<p className="text-sm text-muted-foreground">{subtitle}</p>
									</div>
								</div>
								{allowClose && onClose && (
									<Button variant="ghost" size="sm" onClick={onClose}>
										<X className="w-4 h-4" />
									</Button>
								)}
							</div>

							{/* Overall Progress */}
							<div className="mt-4">
								<ProgressBar
									progress={overallProgress}
									variant={isCompleted ? 'success' : 'default'}
									size="md"
									animated
									showPercentage
									label="Overall Progress"
								/>
							</div>

							{/* Current Activity */}
							<AnimatePresence mode="wait">
								<motion.div
									key={currentActivity}
									className="mt-3 p-3 bg-muted/30 rounded-lg"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
								>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
										<span className="text-sm text-foreground font-medium">
											{currentActivity || 'Preparing...'}
										</span>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Progress Steps */}
						<div className="p-6 max-h-96 overflow-y-auto">
							<div className="space-y-6">
								{categories.map((category, categoryIndex) => (
									<motion.div
										key={category.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
									>
										<div className="mb-4">
											<h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
											<div className="space-y-4">
												{category.steps.map((step, stepIndex) => (
													<ProgressStep
														key={step.id}
														title={step.title}
														description={step.description}
														status={step.status}
														progress={step.progress}
														estimatedTime={step.estimatedTime}
														isLast={
															categoryIndex === categories.length - 1 &&
															stepIndex === category.steps.length - 1
														}
													/>
												))}
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Footer */}
						{isCompleted && (
							<motion.div
								className="p-6 border-t border-border bg-success/5"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="text-center">
									<CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
									<h3 className="text-lg font-semibold text-success mb-2">Party Created Successfully!</h3>
									<p className="text-sm text-muted-foreground mb-4">
										Your party is ready! You can now start planning and inviting guests.
									</p>
									<Button onClick={onClose} className="w-full">
										Continue to Party Dashboard
									</Button>
								</div>
							</motion.div>
						)}
					</motion.div>
				</motion.div>
			</AnimatePresence>
		)
	}
)

ProgressTracker.displayName = 'ProgressTracker'

export { ProgressTracker }