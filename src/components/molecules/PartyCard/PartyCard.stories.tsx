import { PartyCard } from './PartyCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PartyCard> = {
	title: 'Molecules/PartyCard',
	component: PartyCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A party selection card with active and inactive states, featuring icons, descriptions, and feature lists.',
			},
		},
	},
	argTypes: {
		status: {
			control: { type: 'select' },
			options: ['active', 'inactive'],
			description: 'The state of the card',
		},
		icon: {
			control: { type: 'select' },
			options: ['cake', 'baby', 'dinner'],
			description: 'The icon to display',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
	args: {
		title: 'Birthday Party',
		description: 'Celebrate another year of life with cake, balloons, and unforgettable memories',
		icon: 'cake',
		features: [
			'Birthday cake & candles',
			'Age-appropriate decorations',
			'Party games & activities',
			'Photo opportunities'
		],
		status: 'active',
		badge: {
			text: 'Most Popular',
			variant: 'popular'
		}
	},
}

export const Inactive: Story = {
	args: {
		title: 'Baby Shower',
		description: 'Welcome the new arrival with sweet celebrations and precious moments',
		icon: 'baby',
		features: [
			'Gender reveal options',
			'Baby-themed decorations',
			'Gift opening setup',
			'Keepsake activities'
		],
		status: 'inactive',
		badge: {
			text: 'Coming Soon',
			variant: 'coming-soon'
		}
	},
}

export const AllStates: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
			<PartyCard
				title="Birthday Party"
				description="Celebrate another year of life with cake, balloons, and unforgettable memories"
				icon="cake"
				features={[
					'Birthday cake & candles',
					'Age-appropriate decorations',
					'Party games & activities',
					'Photo opportunities'
				]}
				status="active"
				badge={{
					text: 'Most Popular',
					variant: 'popular'
				}}
			/>
			<PartyCard
				title="Baby Shower"
				description="Welcome the new arrival with sweet celebrations and precious moments"
				icon="baby"
				features={[
					'Gender reveal options',
					'Baby-themed decorations',
					'Gift opening setup',
					'Keepsake activities'
				]}
				status="inactive"
				badge={{
					text: 'Coming Soon',
					variant: 'coming-soon'
				}}
			/>
		</div>
	),
}