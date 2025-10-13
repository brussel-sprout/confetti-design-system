import { Calendar, CheckCircle2 } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedTasksSectionProps } from './types'

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
				{tasks.map((task) => (
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
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<span
										className={cn(
											'px-2 py-0.5 text-xs font-semibold rounded-full',
											task.completed_on
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										)}
									>
										{task.completed_on ? 'Completed' : 'Pending'}
									</span>
								</div>
								<p className="text-sm text-foreground font-medium truncate">
									{task.party_task_name}
								</p>
							</div>
						</div>
						{task.due_date && (
							<div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
								<Calendar size={12} />
								<span>{new Date(task.due_date).toLocaleDateString()}</span>
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	)
}
