import { Icon } from './Icon'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Icon> = {
	title: 'Atoms/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible icon component that supports different sizes and custom icons for the party planning interface.',
			},
		},
	},
	argTypes: {
		name: {
			control: { type: 'select' },
			options: ['cake', 'baby', 'dinner'],
			description: 'The icon to display',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
			description: 'The size of the icon',
		},
		color: {
			control: { type: 'color' },
			description: 'Custom color for the icon',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: 'cake',
		size: 'md',
	},
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icon name="cake" size="sm" />
			<Icon name="cake" size="md" />
			<Icon name="cake" size="lg" />
			<Icon name="cake" size="xl" />
		</div>
	),
}

export const AllIcons: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icon name="cake" size="lg" />
			<Icon name="baby" size="lg" />
			<Icon name="dinner" size="lg" />
		</div>
	),
}