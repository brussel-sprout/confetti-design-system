import { Calendar, Clock } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

import type { ConnectedEventsSectionProps } from './types'

export const ConnectedEventsSection: React.FC<ConnectedEventsSectionProps> = ({
	events,
	onNavigateToEvent,
	className,
}) => {
	if (events.length === 0) return null

	const formatDuration = (start: Date, end: Date): string => {
		const durationMs = end.getTime() - start.getTime()
		const durationMinutes = Math.floor(durationMs / (1000 * 60))
		const hours = Math.floor(durationMinutes / 60)
		const minutes = durationMinutes % 60

		if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
		if (hours > 0) return `${hours}h`
		return `${minutes}m`
	}

	return (
		<div className={cn('bg-muted/5 rounded-2xl p-5 border border-border/30', className)}>
			<div className="flex items-center gap-2 mb-4">
				<Calendar className="w-5 h-5 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Connected Events</h3>
				<div className="ml-auto flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
					{events.length}
				</div>
			</div>
			<div className="space-y-2">
				{events.map((event) => (
					<button
						key={event.party_event_id}
						onClick={() => onNavigateToEvent?.(event.party_event_id)}
						disabled={!onNavigateToEvent}
						className={cn(
							'w-full text-left p-3 rounded-lg',
							'bg-background hover:bg-muted/50 transition-colors group mobile-touch-target border border-border/30 hover:border-border/60',
							!onNavigateToEvent && 'cursor-default'
						)}
					>
						<p className="text-sm text-foreground font-medium mb-2">{event.event_name}</p>
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<Clock size={12} />
								<span>
									{new Date(event.absoluteStart).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
							<span>{formatDuration(event.absoluteStart, event.absoluteEnd)}</span>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
