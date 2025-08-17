import { PartyDetailsForm } from './PartyDetailsForm'

import type { Meta, StoryObj } from '@storybook/react'
import type { PartyDetails } from './PartyDetailsForm'

const meta: Meta<typeof PartyDetailsForm> = {
	title: 'Organisms/PartyDetailsForm',
	component: PartyDetailsForm,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A compact party details display for the navbar that expands into a mega-menu form for editing. Shows party name, date, time, guest count, and location as clickable text buttons.',
			},
		},
	},
	argTypes: {
		partyDetails: {
			description: 'The party details to display and edit',
		},
		onSave: {
			description: 'Callback function called when the form is saved',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const samplePartyDetails: PartyDetails = {
	name: 'Sarah\'s Birthday Bash',
	date: '2024-03-15',
	time: '19:00',
	headCount: 25,
	address: '123 Main Street, San Francisco, CA 94102'
}

const emptyPartyDetails: PartyDetails = {
	name: '',
	date: '',
	time: '',
	headCount: 0,
	address: ''
}

// Default with sample data
export const Default: Story = {
	render: () => (
		<div className="pb-96">
			<div className="bg-background border-b border-border p-4">
				<PartyDetailsForm
					partyDetails={samplePartyDetails}
					onSave={(details) => console.log('Saved:', details)}
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Default party details form with sample data. Click any field to edit.',
			},
		},
	},
}

// Empty state
export const EmptyState: Story = {
	render: () => (
		<div className="pb-96">
			<div className="bg-background border-b border-border p-4">
				<PartyDetailsForm
					partyDetails={emptyPartyDetails}
					onSave={(details) => console.log('Saved:', details)}
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Party details form with empty data showing placeholder text.',
			},
		},
	},
}

// In navbar context
export const InNavbar: Story = {
	render: () => (
		<div className="pb-96">
			<nav className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex-shrink-0">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 8-8 8-8-8z" />
									</svg>
								</div>
								<span className="text-base font-semibold text-foreground">Party Planner</span>
							</div>
						</div>
						
						<div className="flex-1 max-w-2xl mx-8 min-w-0">
							<PartyDetailsForm
								partyDetails={samplePartyDetails}
								onSave={(details) => console.log('Saved:', details)}
							/>
						</div>

						<div className="flex items-center gap-4">
							<button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
								John Doe
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</nav>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Party details form integrated into a navbar layout showing how it appears in context.',
			},
		},
	},
}

// Long content that truncates
export const LongContent: Story = {
	render: () => (
		<div className="pb-96">
			<div className="bg-background border-b border-border p-4 max-w-md">
				<PartyDetailsForm
					partyDetails={{
						name: 'Sarah\'s Super Amazing Birthday Celebration Extravaganza',
						date: '2024-12-25',
						time: '18:30',
						headCount: 150,
						address: '1234 Very Long Street Name Avenue, San Francisco, California 94102'
					}}
					onSave={(details) => console.log('Saved:', details)}
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Party details with long content showing how text truncates with ellipsis in narrow containers.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		partyDetails: samplePartyDetails,
		onSave: (details) => console.log('Saved:', details),
	},
	render: (args) => (
		<div className="pb-96">
			<div className="bg-background border-b border-border p-4">
				<PartyDetailsForm {...args} />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different party details configurations.',
			},
		},
	},
}