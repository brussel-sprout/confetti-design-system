import { StatusBadge } from './StatusBadge'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof StatusBadge> = {
	title: 'Atoms/StatusBadge',
	component: StatusBadge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Status badges for indicating different states like popularity, availability, or special features.',
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['popular', 'coming-soon', 'new', 'featured'],
			description: 'The visual style variant of the badge',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the badge',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Most Popular',
		variant: 'popular',
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			<StatusBadge variant="popular">Most Popular</StatusBadge>
			<StatusBadge variant="coming-soon">Coming Soon</StatusBadge>
			<StatusBadge variant="new">New</StatusBadge>
			<StatusBadge variant="featured">Featured</StatusBadge>
		</div>
	),
}