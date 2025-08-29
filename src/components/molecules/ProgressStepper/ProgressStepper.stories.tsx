import { ProgressStepper } from './ProgressStepper'
import type { ProgressStepperStep } from './ProgressStepper'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProgressStepper> = {
	title: 'Molecules/ProgressStepper',
	component: ProgressStepper,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A horizontal progress stepper component showing the current step in a multi-step process with animated transitions.',
			},
		},
	},
	argTypes: {
		steps: {
			description: 'Array of steps with their current status',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleSteps: ProgressStepperStep[] = [
	{
		id: 'party-type',
		label: 'Party Type',
		status: 'completed',
	},
	{
		id: 'theme',
		label: 'Theme',
		status: 'current',
	},
	{
		id: 'elements',
		label: 'Elements',
		status: 'upcoming',
	},
	{
		id: 'details',
		label: 'Details',
		status: 'upcoming',
	},
	{
		id: 'review',
		label: 'Review',
		status: 'upcoming',
	},
]

export const Default: Story = {
	args: {
		steps: sampleSteps,
	},
}

export const FirstStep: Story = {
	args: {
		steps: sampleSteps.map((step, index) => ({
			...step,
			status: index === 0 ? 'current' : 'upcoming',
		})),
	},
}

export const MiddleStep: Story = {
	args: {
		steps: sampleSteps.map((step, index) => ({
			...step,
			status: index < 2 ? 'completed' : index === 2 ? 'current' : 'upcoming',
		})),
	},
}

export const LastStep: Story = {
	args: {
		steps: sampleSteps.map((step, index) => ({
			...step,
			status: index < 4 ? 'completed' : 'current',
		})),
	},
}

export const AllCompleted: Story = {
	args: {
		steps: sampleSteps.map(step => ({
			...step,
			status: 'completed',
		})),
	},
}

export const ThreeSteps: Story = {
	args: {
		steps: [
			{
				id: 'setup',
				label: 'Setup',
				status: 'completed',
			},
			{
				id: 'configure',
				label: 'Configure',
				status: 'current',
			},
			{
				id: 'finish',
				label: 'Finish',
				status: 'upcoming',
			},
		],
	},
}