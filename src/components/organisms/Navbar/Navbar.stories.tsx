import { User, Settings, LogOut } from 'lucide-react'

import { Logo } from '../../atoms/Logo'
import { PartyDetailsForm } from '../PartyDetailsForm'
import { 
	Navbar, 
	NavbarLeft, 
	NavbarRight, 
	NavbarLink, 
	NavbarAccountDropdown,
	NavbarDropdownItem,
	NavbarDropdownDivider
} from './Navbar'

import type { Meta, StoryObj } from '@storybook/react'
import type { PartyDetails } from '../PartyDetailsForm'

const meta: Meta<typeof Navbar> = {
	title: 'Organisms/Navbar',
	component: Navbar,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A composable navigation bar system with individual atoms and molecules that can be assembled to create different navbar states and layouts.',
			},
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

const longPartyDetails: PartyDetails = {
	name: 'Annual Company Holiday Celebration Extravaganza',
	date: '2024-12-25',
	time: '18:30',
	headCount: 150,
	address: '1234 Very Long Street Name Avenue, Downtown Business District, San Francisco, California 94102'
}
// Logged out state composition
export const LoggedOut: Story = {
	render: () => (
		<Navbar>
			<NavbarLeft>
				<Logo size="sm" />
			</NavbarLeft>
			<NavbarRight>
				<NavbarLink href="/login">Login</NavbarLink>
				<NavbarLink href="/sign-up" variant="primary">Sign Up</NavbarLink>
			</NavbarRight>
		</Navbar>
	),
	parameters: {
		docs: {
			description: {
				story: 'Navbar composed for logged out users with login and signup links.',
			},
		},
	},
}

// Logged in state composition
export const LoggedIn: Story = {
	render: () => (
		<div className="pb-48">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" />
				</NavbarLeft>
				<NavbarRight>
					<NavbarAccountDropdown username="John Doe">
						<NavbarDropdownItem>
							<User className="w-4 h-4" />
							Profile
						</NavbarDropdownItem>
						<NavbarDropdownItem>
							<Settings className="w-4 h-4" />
							Settings
						</NavbarDropdownItem>
						<NavbarDropdownDivider />
						<NavbarDropdownItem variant="destructive">
							<LogOut className="w-4 h-4" />
							Logout
						</NavbarDropdownItem>
					</NavbarAccountDropdown>
				</NavbarRight>
			</Navbar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Navbar composed for logged in users with account dropdown containing profile, settings, and logout options.',
			},
		},
	},
}

// Logged in with party details
export const LoggedInWithPartyDetails: Story = {
	render: () => (
		<div className="pb-96">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" />
				</NavbarLeft>
				<div className="flex-1 max-w-2xl mx-8 min-w-0">
					<PartyDetailsForm
						partyDetails={samplePartyDetails}
						onSave={(details) => console.log('Saved:', details)}
					/>
				</div>
				<NavbarRight>
					<NavbarAccountDropdown username="John Doe">
						<NavbarDropdownItem>
							<User className="w-4 h-4" />
							Profile
						</NavbarDropdownItem>
						<NavbarDropdownItem>
							<Settings className="w-4 h-4" />
							Settings
						</NavbarDropdownItem>
						<NavbarDropdownDivider />
						<NavbarDropdownItem variant="destructive">
							<LogOut className="w-4 h-4" />
							Logout
						</NavbarDropdownItem>
					</NavbarAccountDropdown>
				</NavbarRight>
			</Navbar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Logged in navbar with party details form in the center. Shows how the form adapts to available space between logo and account dropdown.',
			},
		},
	},
}

// Logged in with long party details
export const LoggedInWithLongPartyDetails: Story = {
	render: () => (
		<div className="pb-96">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" />
				</NavbarLeft>
				<div className="flex-1 max-w-2xl mx-8 min-w-0">
					<PartyDetailsForm
						partyDetails={longPartyDetails}
						onSave={(details) => console.log('Saved:', details)}
					/>
				</div>
				<NavbarRight>
					<NavbarAccountDropdown username="Jane Smith">
						<NavbarDropdownItem>
							<User className="w-4 h-4" />
							Profile
						</NavbarDropdownItem>
						<NavbarDropdownItem>
							<Settings className="w-4 h-4" />
							Settings
						</NavbarDropdownItem>
						<NavbarDropdownDivider />
						<NavbarDropdownItem variant="destructive">
							<LogOut className="w-4 h-4" />
							Logout
						</NavbarDropdownItem>
					</NavbarAccountDropdown>
				</NavbarRight>
			</Navbar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Logged in navbar with long party details that demonstrate text truncation behavior when space is limited.',
			},
		},
	},
}

// Narrow viewport simulation
export const LoggedInNarrowViewport: Story = {
	render: () => (
		<div className="pb-96 max-w-md mx-auto">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" variant="icon-only" />
				</NavbarLeft>
				<div className="flex-1 mx-4 min-w-0">
					<PartyDetailsForm
						partyDetails={samplePartyDetails}
						onSave={(details) => console.log('Saved:', details)}
					/>
				</div>
				<NavbarRight>
					<NavbarAccountDropdown username="John">
						<NavbarDropdownItem>
							<User className="w-4 h-4" />
							Profile
						</NavbarDropdownItem>
						<NavbarDropdownItem>
							<Settings className="w-4 h-4" />
							Settings
						</NavbarDropdownItem>
						<NavbarDropdownDivider />
						<NavbarDropdownItem variant="destructive">
							<LogOut className="w-4 h-4" />
							Logout
						</NavbarDropdownItem>
					</NavbarAccountDropdown>
				</NavbarRight>
			</Navbar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Logged in navbar in a narrow viewport showing how the party details form adapts to very limited space. Uses icon-only logo and shortened username.',
			},
		},
	},
}
// With page content
export const WithPageContent: Story = {
	render: () => (
		<div className="min-h-screen bg-background">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" />
				</NavbarLeft>
				<NavbarRight>
					<NavbarLink href="/login">Login</NavbarLink>
					<NavbarLink href="/sign-up" variant="primary">Sign Up</NavbarLink>
				</NavbarRight>
			</Navbar>
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

// Custom composition example
export const CustomComposition: Story = {
	render: () => (
		<div className="pb-48">
			<Navbar>
				<NavbarLeft>
					<Logo size="sm" />
				</NavbarLeft>
				<NavbarRight>
					<NavbarLink href="/events">Events</NavbarLink>
					<NavbarLink href="/pricing">Pricing</NavbarLink>
					<NavbarAccountDropdown username="Jane Smith">
						<NavbarDropdownItem>
							<User className="w-4 h-4" />
							My Profile
						</NavbarDropdownItem>
						<NavbarDropdownItem>
							<Settings className="w-4 h-4" />
							Account Settings
						</NavbarDropdownItem>
						<NavbarDropdownDivider />
						<NavbarDropdownItem variant="destructive">
							<LogOut className="w-4 h-4" />
							Sign Out
						</NavbarDropdownItem>
					</NavbarAccountDropdown>
				</NavbarRight>
			</Navbar>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Example of custom navbar composition with additional navigation links and customized dropdown text.',
			},
		},
	},
}