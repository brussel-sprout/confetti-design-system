import { ProgressStep } from './ProgressStep'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProgressStep> = {
	title: 'Molecules/ProgressStep',
	component: ProgressStep,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A progress step component showing individual steps in a process with status indicators and progress bars.',
			},
		},
	},
	argTypes: {
		status: {
			control: { type: 'select' },
			options: ['pending', 'running', 'completed', 'failed'],
			description: 'Current status of the step',
		},
		progress: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Progress percentage (only shown when status is running)',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = {
	args: {
		title: 'Theme Analysis',
		description: 'Analyzing your party preferences and style choices',
		status: 'pending',
		estimatedTime: '2 min',
	},
}

export const Running: Story = {
	args: {
		title: 'AI Image Generation',
		description: 'Creating personalized decorations and elements for your party',
		status: 'running',
		progress: 65,
		estimatedTime: '3 min',
	},
}

export const Completed: Story = {
	args: {
		title: 'Vendor Recommendations',
		description: 'Found the best local vendors and suppliers for your party materials',
		status: 'completed',
	},
}

export const Failed: Story = {
	args: {
		title: 'Payment Processing',
		description: 'Unable to process payment. Please check your payment method.',
		status: 'failed',
	},
}

export const AllStates: Story = {
	render: () => (
		<div className="space-y-4 w-96">
			<ProgressStep
				title="Theme Analysis"
				description="Analyzing your party preferences and style choices"
				status="completed"
			/>
			<ProgressStep
				title="AI Image Generation"
				description="Creating personalized decorations and elements"
				status="running"
				progress={75}
				estimatedTime="2 min"
			/>
			<ProgressStep
				title="Vendor Recommendations"
				description="Finding the best local suppliers"
				status="pending"
				estimatedTime="1 min"
			/>
			<ProgressStep
				title="Final Assembly"
				description="Putting everything together"
				status="pending"
				estimatedTime="30 sec"
				isLast
			/>
		</div>
	),
}