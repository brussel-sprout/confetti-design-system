import { AlertCircle, Check, Clock, Loader2 } from 'lucide-react'
import React from 'react'

import { ProgressBar } from '../../atoms/ProgressBar'

import { cn } from '../../../utils/cn'

export interface ProgressStepProps {
	title: string
	description: string
	status: 'pending' | 'running' | 'completed' | 'failed'
	progress?: number // 0-100, only used when status is 'running'
	estimatedTime?: string
	isLast?: boolean
	className?: string
}

const ProgressStep = React.forwardRef<HTMLDivElement, ProgressStepProps>(
	(
		{
			title,
			description,
			status,
			progress = 0,
			estimatedTime,
			isLast = false,
			className = '',
			...props
		},
		ref
	) => {
		const getStatusIcon = () => {
			switch (status) {
				case 'completed':
					return <Check className="w-5 h-5 text-success" />
				case 'running':
					return <Loader2 className="w-5 h-5 text-primary animate-spin" />
				case 'failed':
					return <AlertCircle className="w-5 h-5 text-destructive" />
				default:
					return <Clock className="w-5 h-5 text-muted-foreground" />
			}
		}

		const getStatusColor = () => {
			switch (status) {
				case 'completed':
					return 'border-success bg-success/10'
				case 'running':
					return 'border-primary bg-primary/10'
				case 'failed':
					return 'border-destructive bg-destructive/10'
				default:
					return 'border-muted bg-muted/10'
			}
		}

		const getConnectorColor = () => {
			switch (status) {
				case 'completed':
					return 'bg-success'
				case 'running':
					return 'bg-gradient-to-b from-primary to-muted'
				default:
					return 'bg-muted'
			}
		}

		return (
			<div ref={ref} className={cn('relative flex gap-4', className)} {...props}>
				{/* Status Icon */}
				<div className="flex flex-col items-center">
					<div
						className={cn(
							'w-10 h-10 rounded-full border-2 flex items-center justify-center',
							'transition-all duration-300 animate-bounce-in',
							getStatusColor()
						)}
					>
						<div className="animate-fade-in">{getStatusIcon()}</div>
					</div>

					{/* Connector Line */}
					{!isLast && (
						<div
							className={cn('w-0.5 mt-2 transition-all duration-500', getConnectorColor())}
							style={{
								height: status === 'completed' ? '64px' : '32px',
								animationDelay: '0.2s',
							}}
						/>
					)}
				</div>

				{/* Content */}
				<div className="flex-1 pb-8">
					<div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
						<div className="flex items-center justify-between mb-2">
							<h3
								className={cn(
									'font-semibold transition-colors duration-200',
									status === 'completed'
										? 'text-success'
										: status === 'running'
											? 'text-primary'
											: status === 'failed'
												? 'text-destructive'
												: 'text-muted-foreground'
								)}
							>
								{title}
							</h3>
							{estimatedTime && status === 'running' && (
								<span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
									~{estimatedTime}
								</span>
							)}
						</div>

						<p
							className={cn(
								'text-sm mb-3 transition-colors duration-200',
								status === 'failed' ? 'text-destructive' : 'text-muted-foreground'
							)}
						>
							{description}
						</p>

						{/* Progress Bar for Running Status */}
						{status === 'running' && (
							<div className="animate-slide-down">
								<ProgressBar
									progress={progress}
									variant="default"
									size="sm"
									animated
									showPercentage
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
)

ProgressStep.displayName = 'ProgressStep'

export { ProgressStep }
