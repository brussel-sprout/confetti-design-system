import { AlertCircle, CheckCircle, Clock, Edit3, MapPin, Trash2, Users } from 'lucide-react'
import React from 'react'

import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'

import { cn } from '../../../utils/cn'

export interface TimelineEvent {
	id: string
	title: string
	description?: string
	startTime: string // HH:MM format
	endTime?: string // HH:MM format
	duration?: number // minutes
	location?: string
	attendees?: number
	category: 'setup' | 'activity' | 'meal' | 'cleanup' | 'other'
	priority: 'low' | 'medium' | 'high' | 'critical'
	assignedTo?: string[]
	notes?: string
	status?: 'pending' | 'in-progress' | 'completed' | 'cancelled'
}

export interface TimelineItemProps {
	event: TimelineEvent
	isFirst?: boolean
	isLast?: boolean
	onEdit?: (event: TimelineEvent) => void
	onDelete?: (eventId: string) => void
	onStatusChange?: (eventId: string, status: string) => void
	className?: string
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
	(
		{
			event,
			isFirst = false,
			isLast = false,
			onEdit,
			onDelete,
			onStatusChange,
			className = '',
			...props
		},
		ref
	) => {
		const getCategoryColor = (category: TimelineEvent['category']) => {
			switch (category) {
				case 'setup':
					return 'bg-info text-info-foreground'
				case 'activity':
					return 'bg-primary text-primary-foreground'
				case 'meal':
					return 'bg-warning text-warning-foreground'
				case 'cleanup':
					return 'bg-secondary text-secondary-foreground'
				default:
					return 'bg-muted text-muted-foreground'
			}
		}

		const getPriorityColor = (priority: TimelineEvent['priority']) => {
			switch (priority) {
				case 'critical':
					return 'bg-destructive text-destructive-foreground'
				case 'high':
					return 'bg-warning text-warning-foreground'
				case 'medium':
					return 'bg-info text-info-foreground'
				default:
					return 'bg-muted text-muted-foreground'
			}
		}

		const getStatusIcon = (status: TimelineEvent['status']) => {
			switch (status) {
				case 'completed':
					return <CheckCircle className="w-4 h-4 text-success" />
				case 'in-progress':
					return (
						<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
					)
				case 'cancelled':
					return <AlertCircle className="w-4 h-4 text-destructive" />
				default:
					return <Clock className="w-4 h-4 text-muted-foreground" />
			}
		}

		const formatTime = (time: string) => {
			const [hours, minutes] = time.split(':')
			const hour = parseInt(hours)
			const ampm = hour >= 12 ? 'PM' : 'AM'
			const displayHour = hour % 12 || 12
			return `${displayHour}:${minutes} ${ampm}`
		}

		const getDuration = () => {
			if (event.duration) {
				return `${event.duration} min`
			}
			if (event.endTime) {
				const start = new Date(`2000-01-01T${event.startTime}:00`)
				const end = new Date(`2000-01-01T${event.endTime}:00`)
				const diff = (end.getTime() - start.getTime()) / (1000 * 60)
				return `${diff} min`
			}
			return null
		}

		return (
			<div ref={ref} className={cn('relative flex gap-4 group', className)} {...props}>
				{/* Timeline Line */}
				<div className="flex flex-col items-center">
					{/* Top connector */}
					{!isFirst && <div className="w-0.5 h-6 bg-border" />}

					{/* Time Circle */}
					<div
						className={cn(
							'w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold',
							'border-2 bg-background transition-all duration-200',
							event.status === 'completed'
								? 'border-success bg-success/10 text-success'
								: event.status === 'in-progress'
									? 'border-primary bg-primary/10 text-primary'
									: event.status === 'cancelled'
										? 'border-destructive bg-destructive/10 text-destructive'
										: 'border-border text-muted-foreground'
						)}
					>
						{formatTime(event.startTime).split(' ')[0]}
					</div>

					{/* Bottom connector */}
					{!isLast && <div className="w-0.5 flex-1 min-h-6 bg-border" />}
				</div>

				{/* Content */}
				<div className="flex-1 pb-8">
					<div
						className={cn(
							'bg-background border border-border rounded-xl p-4 transition-all duration-200',
							'hover:shadow-md hover:border-primary/30',
							event.status === 'completed' && 'bg-success/5 border-success/20',
							event.status === 'in-progress' && 'bg-primary/5 border-primary/20',
							event.status === 'cancelled' && 'bg-destructive/5 border-destructive/20'
						)}
					>
						{/* Header */}
						<div className="flex items-start justify-between mb-3">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-semibold text-foreground truncate">{event.title}</h3>
									{getStatusIcon(event.status)}
								</div>

								<div className="flex items-center gap-3 text-sm text-muted-foreground">
									<span className="flex items-center gap-1">
										<Clock className="w-3 h-3" />
										{formatTime(event.startTime)}
										{event.endTime && ` - ${formatTime(event.endTime)}`}
									</span>
									{getDuration() && (
										<span className="text-xs bg-muted px-2 py-0.5 rounded-full">
											{getDuration()}
										</span>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								{onEdit && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onEdit(event)}
										className="h-8 w-8 p-0"
									>
										<Edit3 className="w-3 h-3" />
									</Button>
								)}
								{onDelete && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onDelete(event.id)}
										className="h-8 w-8 p-0 text-destructive hover:text-destructive"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								)}
							</div>
						</div>

						{/* Description */}
						{event.description && (
							<p className="text-sm text-muted-foreground mb-3 leading-relaxed">
								{event.description}
							</p>
						)}

						{/* Badges */}
						<div className="flex items-center gap-2 mb-3">
							<Badge size="sm" className={getCategoryColor(event.category)}>
								{event.category}
							</Badge>
							<Badge size="sm" variant="outline" className={getPriorityColor(event.priority)}>
								{event.priority}
							</Badge>
						</div>

						{/* Details */}
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							{event.location && (
								<span className="flex items-center gap-1">
									<MapPin className="w-3 h-3" />
									{event.location}
								</span>
							)}
							{event.attendees && (
								<span className={cn('flex items-center gap-1', 'font-semibold text-foreground')}>
									<Users className="w-3 h-3" />
									{event.attendees} people
								</span>
							)}
							{getDuration() && (
								<span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
									{getDuration()}
								</span>
							)}
						</div>

						{/* Notes */}
						{event.notes && (
							<div className="mt-3 pt-3 border-t border-border">
								<p className="text-xs text-muted-foreground italic">Note: {event.notes}</p>
							</div>
						)}

						{/* Status Actions */}
						{onStatusChange && event.status !== 'completed' && event.status !== 'cancelled' && (
							<div className="mt-3 pt-3 border-t border-border flex gap-2">
								{event.status === 'pending' && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => onStatusChange(event.id, 'in-progress')}
										className={cn('text-sm text-muted-foreground mb-3', 'text-xs')}
									>
										Start Task
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
)

TimelineItem.displayName = 'TimelineItem'

export { TimelineItem }
