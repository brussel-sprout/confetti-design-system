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
					'A responsive navigation bar component with logo and authentication. Supports both logged out (login/signup links) and logged in (account dropdown) states.',
			},
		},
	},
	argTypes: {
		isLoggedIn: {
			control: { type: 'boolean' },
			description: 'Whether the user is logged in',
		},
		username: {
			control: { type: 'text' },
			description: 'Username to display in the account dropdown',
		},
		onProfileClick: {
			action: 'profile clicked',
			description: 'Callback when profile is clicked',
		},
		onSettingsClick: {
			action: 'settings clicked',
			description: 'Callback when settings is clicked',
		},
		onLogoutClick: {
			action: 'logout clicked',
			description: 'Callback when logout is clicked',
		},
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
	args: {
		isLoggedIn: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Default navbar state for logged out users with login and signup buttons.',
			},
		},
	},
}

// Logged in state
export const LoggedIn: Story = {
	args: {
		isLoggedIn: true,
		username: 'John Doe',
	},
	parameters: {
		docs: {
			description: {
				story: 'Navbar state for logged in users with account dropdown containing profile, settings, and logout options.',
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
	args: {
		isLoggedIn: false,
	},
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
	args: {
		isLoggedIn: false,
		username: 'Jane Smith',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test navbar functionality.',
			},
		},
	},
}