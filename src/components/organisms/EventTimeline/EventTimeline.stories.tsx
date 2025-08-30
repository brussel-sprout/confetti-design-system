import { useState } from 'react'
import { EventTimeline } from './EventTimeline'
import type { TimelineEvent } from '../../molecules/TimelineItem'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EventTimeline> = {
	title: 'Organisms/EventTimeline',
	component: EventTimeline,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A comprehensive event timeline component for managing party schedules with filtering, search, and status management.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleEvents: TimelineEvent[] = [
	{
		id: '1',
		title: 'Setup Decorations',
		description: 'Hang balloons, streamers, and set up photo booth area',
		startTime: '14:00',
		endTime: '15:30',
		location: 'Main Party Room',
		attendees: 3,
		category: 'setup',
		priority: 'high',
		status: 'completed',
		assignedTo: ['Sarah', 'Mike'],
		notes: 'Remember to test the photo booth lighting'
	},
	{
		id: '2',
		title: 'Prepare Birthday Cake',
		description: 'Final cake decoration and candle placement',
		startTime: '15:30',
		duration: 45,
		location: 'Kitchen',
		category: 'meal',
		priority: 'critical',
		status: 'in-progress',
		assignedTo: ['Mom'],
	},
	{
		id: '3',
		title: 'Guest Arrival & Welcome',
		description: 'Greet guests and direct them to party area',
		startTime: '16:00',
		endTime: '16:30',
		location: 'Front Entrance',
		attendees: 25,
		category: 'activity',
		priority: 'medium',
		status: 'pending',
		assignedTo: ['Dad', 'Sarah'],
	},
	{
		id: '4',
		title: 'Party Games',
		description: 'Musical chairs, pin the tail, and birthday trivia',
		startTime: '16:30',
		endTime: '17:30',
		location: 'Backyard',
		attendees: 25,
		category: 'activity',
		priority: 'medium',
		status: 'pending',
		notes: 'Have backup indoor games ready in case of rain'
	},
	{
		id: '5',
		title: 'Birthday Song & Cake',
		description: 'Sing happy birthday and cut the cake',
		startTime: '17:30',
		endTime: '18:00',
		location: 'Main Party Room',
		attendees: 25,
		category: 'meal',
		priority: 'critical',
		status: 'pending',
	},
	{
		id: '6',
		title: 'Gift Opening',
		description: 'Open presents and thank guests',
		startTime: '18:00',
		endTime: '18:30',
		location: 'Living Room',
		attendees: 25,
		category: 'activity',
		priority: 'medium',
		status: 'pending',
	},
	{
		id: '7',
		title: 'Cleanup & Farewell',
		description: 'Clean up party area and say goodbye to guests',
		startTime: '19:00',
		endTime: '20:00',
		location: 'Entire House',
		attendees: 5,
		category: 'cleanup',
		priority: 'low',
		status: 'pending',
		assignedTo: ['Everyone'],
	},
]

export const Default: Story = {
	args: {
		events: sampleEvents,
		onAddEvent: () => console.log('Add event clicked'),
		onEditEvent: (event) => console.log('Edit event:', event),
		onDeleteEvent: (id) => console.log('Delete event:', id),
		onStatusChange: (id, status) => console.log('Status change:', id, status),
	},
}

export const Interactive: Story = {
	render: () => {
		const InteractiveTimeline = () => {
			const [events, setEvents] = useState<TimelineEvent[]>(sampleEvents)

			const handleStatusChange = (eventId: string, newStatus: TimelineEvent['status']) => {
				setEvents(prev => prev.map(event => 
					event.id === eventId ? { ...event, status: newStatus } : event
				))
			}

			const handleDeleteEvent = (eventId: string) => {
				setEvents(prev => prev.filter(event => event.id !== eventId))
			}

			return (
				<div className="p-8 min-h-screen bg-background">
					<EventTimeline
						events={events}
						onAddEvent={() => console.log('Add event clicked')}
						onEditEvent={(event) => console.log('Edit event:', event)}
						onDeleteEvent={handleDeleteEvent}
						onStatusChange={handleStatusChange}
					/>
				</div>
			)
		}

		return <InteractiveTimeline />
	},
	parameters: {
		docs: {
			story: {
				inline: false,
				iframeHeight: 800,
			},
		},
	},
}

export const EmptyState: Story = {
	args: {
		events: [],
		onAddEvent: () => console.log('Add event clicked'),
	},
}

export const FilteredView: Story = {
	args: {
		events: sampleEvents,
		onAddEvent: () => console.log('Add event clicked'),
		onEditEvent: (event) => console.log('Edit event:', event),
		onDeleteEvent: (id) => console.log('Delete event:', id),
		onStatusChange: (id, status) => console.log('Status change:', id, status),
	},
}

export const MinimalView: Story = {
	args: {
		events: sampleEvents.slice(0, 3),
		showFilters: false,
		showSearch: false,
		showAddButton: false,
		title: 'Next Events',
		subtitle: 'Upcoming party tasks',
	},
}