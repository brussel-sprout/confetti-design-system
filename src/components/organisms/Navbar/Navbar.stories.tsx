import { Navbar } from './Navbar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Navbar> = {
	title: 'Organisms/Navbar',
	component: Navbar,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A responsive navigation bar component with logo and authentication links. Designed for composition with different states and content.',
			},
		},
	},
	argTypes: {
		className: {
			control: { type: 'text' },
			description: 'Additional CSS classes',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default logged out state
export const LoggedOut: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Default navbar state for logged out users with login and signup buttons.',
			},
		},
	},
}

// With page content below
export const WithPageContent: Story = {
	render: (args) => (
		<div className="min-h-screen bg-background">
			<Navbar {...args} />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center space-y-6">
					<h1 className="text-4xl font-bold text-foreground">Welcome to PartyPlanner</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Create amazing events with our AI-powered party planning platform. From intimate
						gatherings to grand celebrations, we help you plan the perfect event.
					</p>
					<div className="flex justify-center gap-4">
						<button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
							Get Started
						</button>
						<button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors">
							Learn More
						</button>
					</div>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Navbar with sample page content showing how it appears in context.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test navbar functionality.',
			},
		},
	},
}