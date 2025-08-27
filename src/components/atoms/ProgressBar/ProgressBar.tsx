import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../utils/cn'

export interface ProgressBarProps {
	progress: number // 0-100
	variant?: 'default' | 'success' | 'warning' | 'error'
	size?: 'sm' | 'md' | 'lg'
	showPercentage?: boolean
	animated?: boolean
	className?: string
	label?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
	(
		{
			progress,
			variant = 'default',
			size = 'md',
			showPercentage = false,
			animated = true,
			className = '',
			label,
			...props
		},
		ref
	) => {
		const clampedProgress = Math.max(0, Math.min(100, progress))

		const sizeClasses = {
			sm: 'h-2',
			md: 'h-3',
			lg: 'h-4',
		}

		const variantClasses = {
			default: 'bg-primary',
			success: 'bg-success',
			warning: 'bg-warning',
			error: 'bg-destructive',
		}

		const backgroundClasses = {
			default: 'bg-primary/10',
			success: 'bg-success/10',
			warning: 'bg-warning/10',
			error: 'bg-destructive/10',
		}

		return (
			<div ref={ref} className={cn('w-full', className)} {...props}>
				{(label || showPercentage) && (
					<div className="flex items-center justify-between mb-2">
						{label && <span className="text-sm font-medium text-foreground">{label}</span>}
						{showPercentage && (
							<span className="text-sm text-muted-foreground">{Math.round(clampedProgress)}%</span>
						)}
					</div>
				)}
				
				<div
					className={cn(
						'w-full rounded-full overflow-hidden',
						sizeClasses[size],
						backgroundClasses[variant]
					)}
				>
					<motion.div
						className={cn(
							'h-full rounded-full transition-colors duration-200',
							variantClasses[variant],
							animated && 'relative overflow-hidden'
						)}
						initial={{ width: 0 }}
						animate={{ width: `${clampedProgress}%` }}
						transition={{
							duration: animated ? 0.8 : 0,
							ease: 'easeOut',
						}}
					>
						{animated && clampedProgress > 0 && (
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
								initial={{ x: '-100%' }}
								animate={{ x: '100%' }}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									ease: 'linear',
								}}
							/>
						)}
					</motion.div>
				</div>
			</div>
		)
	}
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }