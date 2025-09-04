import { TimelineItem } from './TimelineItem'
import type { TimelineEvent } from './TimelineItem'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TimelineItem> = {
	title: 'Molecules/TimelineItem',
	component: TimelineItem,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Individual timeline item component for displaying event details with status indicators and actions.',
			},
		},
	},
	argTypes: {
		event: {
			description: 'The timeline event data to display',
		},
		isFirst: {
			control: { type: 'boolean' },
			description: 'Whether this is the first item in the timeline',
		},
		isLast: {
			control: { type: 'boolean' },
			description: 'Whether this is the last item in the timeline',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleEvent: TimelineEvent = {
	id: '1',
	title: 'Setup Decorations',
	description: 'Hang balloons, streamers, and set up photo booth area',
	startTime: '14:00',
	endTime: '15:30',
	location: 'Main Party Room',
	attendees: 3,
	category: 'setup',
	priority: 'high',
	assignedTo: ['Sarah', 'Mike'],
	notes: 'Remember to test the photo booth lighting'
}

export const Pending: Story = {
	args: {
		event: sampleEvent,
		onEdit: (event) => console.log('Edit:', event),
		onDelete: (id) => console.log('Delete:', id),
	},
}

export const WithDuration: Story = {
	args: {
		event: { ...sampleEvent, duration: 90, endTime: undefined },
		onEdit: (event) => console.log('Edit:', event),
		onDelete: (id) => console.log('Delete:', id),
	},
}

export const WithNotes: Story = {
	args: {
		event: { ...sampleEvent, notes: 'This is an important note about the event setup' },
		onEdit: (event) => console.log('Edit:', event),
		onDelete: (id) => console.log('Delete:', id),
	},
}

export const HighPriority: Story = {
	args: {
		event: { ...sampleEvent, priority: 'critical' },
		onEdit: (event) => console.log('Edit:', event),
		onDelete: (id) => console.log('Delete:', id),
	},
}

export const AllCategories: Story = {
	render: () => (
		<div className="space-y-0 w-96">
			<TimelineItem
				event={{ ...sampleEvent, category: 'setup', title: 'Setup Task' }}
				isFirst
			/>
			<TimelineItem
				event={{ ...sampleEvent, id: '2', category: 'activity', title: 'Party Activity', startTime: '15:00' }}
			/>
			<TimelineItem
				event={{ ...sampleEvent, id: '3', category: 'meal', title: 'Meal Service', startTime: '16:00' }}
			/>
			<TimelineItem
				event={{ ...sampleEvent, id: '4', category: 'cleanup', title: 'Cleanup', startTime: '17:00' }}
				isLast
			/>
		</div>
	),
}

export const MinimalEvent: Story = {
	args: {
		event: {
			id: '1',
			title: 'Quick Task',
			startTime: '14:00',
			category: 'other',
			priority: 'low',
		},
	},
}