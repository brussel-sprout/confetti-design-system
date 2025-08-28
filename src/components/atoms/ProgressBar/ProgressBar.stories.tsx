import { useState, useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { userEvent, within } from '@storybook/test'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProgressBar> = {
	title: 'Atoms/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible progress bar component with animations, multiple variants, and customizable appearance.',
			},
		},
	},
	argTypes: {
		progress: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Progress value from 0 to 100',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'success', 'warning', 'error'],
			description: 'Visual variant of the progress bar',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Size of the progress bar',
		},
		showPercentage: {
			control: { type: 'boolean' },
			description: 'Whether to show percentage text',
		},
		animated: {
			control: { type: 'boolean' },
			description: 'Whether to animate the progress bar',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const AnimatedProgressBar = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) return 0
				return prev + 2
			})
		}, 100)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="w-80">
			<ProgressBar
				progress={progress}
				variant="default"
				size="md"
				label="Animated Progress"
				showPercentage
				animated
			/>
		</div>
	)
}

export const Default: Story = {
	args: {
		progress: 65,
		variant: 'default',
		size: 'md',
		showPercentage: true,
		animated: true,
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<ProgressBar progress={75} variant="default" label="Default" showPercentage />
			<ProgressBar progress={100} variant="success" label="Success" showPercentage />
			<ProgressBar progress={45} variant="warning" label="Warning" showPercentage />
			<ProgressBar progress={25} variant="error" label="Error" showPercentage />
		</div>
	),
}

export const AllSizes: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<ProgressBar progress={60} size="sm" label="Small" showPercentage />
			<ProgressBar progress={60} size="md" label="Medium" showPercentage />
			<ProgressBar progress={60} size="lg" label="Large" showPercentage />
		</div>
	),
}

export const AnimatedDemo: Story = {
	render: () => <AnimatedProgressBar />,
	parameters: {
		docs: {
			story: {
				inline: false,
				iframeHeight: 200,
			},
		},
	},
	play: async () => {
		// Allow time for the animation to run and state updates to settle
		await new Promise(resolve => setTimeout(resolve, 500));
	},
}

export const WithoutAnimation: Story = {
	args: {
		progress: 80,
		animated: false,
		label: 'Static Progress',
		showPercentage: true,
	},
}