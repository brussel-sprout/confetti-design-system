import { PartySelectionLayout } from './PartySelectionLayout'
import type { PartyOption } from './PartySelectionLayout'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PartySelectionLayout> = {
	title: 'Organisms/PartySelectionLayout',
	component: PartySelectionLayout,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A complete party selection layout with header, card grid, and navigation footer. Matches the design shown in the screenshot.',
			},
		},
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Main heading text',
		},
		subtitle: {
			control: { type: 'text' },
			description: 'Subtitle description text',
		},
		selectedId: {
			control: { type: 'text' },
			description: 'ID of the currently selected party option',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const partyOptions: PartyOption[] = [
	{
		id: 'birthday',
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
	{
		id: 'baby-shower',
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
	{
		id: 'dinner-party',
		title: 'Dinner Party',
		description: 'Host an elegant evening with fine dining and sophisticated ambiance',
		icon: 'dinner',
		features: [
			'Elegant table settings',
			'Menu planning assistance',
			'Ambient lighting',
			'Wine pairing suggestions'
		],
		status: 'inactive',
		badge: {
			text: 'Coming Soon',
			variant: 'coming-soon'
		}
	}
]

export const Default: Story = {
	args: {
		options: partyOptions,
		onSelect: (id) => console.log('Selected:', id),
		onBack: () => console.log('Back clicked'),
		onContinue: (id) => console.log('Continue with:', id),
	},
}

export const WithSelection: Story = {
	args: {
		options: partyOptions,
		selectedId: 'birthday',
		onSelect: (id) => console.log('Selected:', id),
		onBack: () => console.log('Back clicked'),
		onContinue: (id) => console.log('Continue with:', id),
	},
}

export const CustomContent: Story = {
	args: {
		title: 'Choose Your Event Type',
		subtitle: 'Select the type of event you want to plan and we\'ll help you create something amazing.',
		options: partyOptions,
		onSelect: (id) => console.log('Selected:', id),
		onBack: () => console.log('Back clicked'),
		onContinue: (id) => console.log('Continue with:', id),
	},
}