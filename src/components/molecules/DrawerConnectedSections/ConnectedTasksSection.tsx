import { Calendar, CheckCircle2 } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedTasksSectionProps } from './types'

// Helper to get priority color and label
const getPriorityInfo = (importance_level?: 1 | 2 | 3) => {
	switch (importance_level) {
		case 1:
			return {
				label: 'High',
				className: 'bg-red-500/10 text-red-700 dark:text-red-400',
			}
		case 2:
			return {
				label: 'Medium',
				className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
			}
		case 3:
			return {
				label: 'Low',
				className: 'bg-green-500/10 text-green-700 dark:text-green-400',
			}
		default:
			return {
				label: 'Medium',
				className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
			}
	}
}

export const ConnectedTasksSection: React.FC<ConnectedTasksSectionProps> = ({
	tasks,
	onNavigateToTask,
	className,
}) => {
	if (tasks.length === 0) return null

	return (
		<div className={cn('bg-muted/5 rounded-2xl p-5 border border-border/30', className)}>
			<div className="flex items-center gap-2 mb-4">
				<CheckCircle2 className="w-5 h-5 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Connected Tasks</h3>
				<div className="ml-auto flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
					{tasks.length}
				</div>
			</div>
			<div className="space-y-2">
				{tasks.map((task) => {
					const priorityInfo = getPriorityInfo(task.importance_level)
					const isCompleted = !!task.completed_on

					return (
						<button
							key={task.party_task_id}
							onClick={() => onNavigateToTask?.(task.party_task_id)}
							disabled={!onNavigateToTask}
							className={cn(
								'w-full text-left p-3 rounded-lg',
								'bg-background hover:bg-muted/50 transition-colors group mobile-touch-target border border-border/30 hover:border-border/60',
								!onNavigateToTask && 'cursor-default'
							)}
						>
							<div className="flex items-start gap-3">
								{/* Completion Status Indicator */}
								<div className="mt-1">
									{isCompleted ? (
										<CheckCircle2 className="w-4 h-4 text-green-600" />
									) : (
										<div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
									)}
								</div>

								{/* Task Info */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1 flex-wrap">
										{/* Priority Badge */}
										<span
											className={cn(
												'px-2 py-0.5 text-xs font-semibold rounded-full',
												priorityInfo.className
											)}
										>
											{priorityInfo.label}
										</span>

										{/* Completion Status Badge */}
										<span
											className={cn(
												'px-2 py-0.5 text-xs font-semibold rounded-full',
												isCompleted
													? 'bg-green-500/10 text-green-700 dark:text-green-400'
													: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
											)}
										>
											{isCompleted ? 'Completed' : 'Pending'}
										</span>
									</div>

									{/* Task Name */}
									<p
										className={cn(
											'text-sm text-foreground font-medium truncate',
											isCompleted && 'line-through text-muted-foreground'
										)}
									>
										{task.party_task_name}
									</p>

									{/* Due Date */}
									{task.due_date && (
										<div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
											<Calendar size={12} />
											<span>Due {new Date(task.due_date).toLocaleDateString()}</span>
										</div>
									)}
								</div>
							</div>
						</button>
					)
				})}
			</div>
		</div>
	)
}
