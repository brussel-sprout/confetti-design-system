import { User, Settings, LogOut, ChevronDown } from 'lucide-react'

import { 
	Dropdown, 
	DropdownTrigger, 
	DropdownContent, 
	DropdownItem, 
	DropdownDivider 
} from './Dropdown'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
	title: 'Molecules/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible dropdown component system with trigger, content, items, and dividers. Supports click outside and escape key to close.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Basic dropdown
export const Basic: Story = {
	render: () => (
		<div className="pb-48">
			<Dropdown>
				<DropdownTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
					Click me
				</DropdownTrigger>
				<DropdownContent>
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
					<DropdownItem>Option 3</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Basic dropdown with simple text options.',
			},
		},
	},
}

// With icons and dividers
export const WithIconsAndDividers: Story = {
	render: () => (
		<div className="pb-48">
			<Dropdown>
				<DropdownTrigger className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">
					Menu
					<ChevronDown className="w-4 h-4" />
				</DropdownTrigger>
				<DropdownContent>
					<DropdownItem>
						<User className="w-4 h-4" />
						Profile
					</DropdownItem>
					<DropdownItem>
						<Settings className="w-4 h-4" />
						Settings
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem variant="destructive">
						<LogOut className="w-4 h-4" />
						Logout
					</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Dropdown with icons, dividers, and destructive variant.',
			},
		},
	},
}

// Different alignments
export const Alignments: Story = {
	render: () => (
		<div className="pb-48 flex gap-8">
			<Dropdown>
				<DropdownTrigger className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
					Left Aligned
				</DropdownTrigger>
				<DropdownContent align="left">
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
				</DropdownContent>
			</Dropdown>

			<Dropdown>
				<DropdownTrigger className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
					Center Aligned
				</DropdownTrigger>
				<DropdownContent align="center">
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
				</DropdownContent>
			</Dropdown>

			<Dropdown>
				<DropdownTrigger className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
					Right Aligned
				</DropdownTrigger>
				<DropdownContent align="right">
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Dropdown content can be aligned to left, center, or right.',
			},
		},
	},
}

// Account dropdown example
export const AccountDropdown: Story = {
	render: () => (
		<div className="pb-48">
			<Dropdown>
				<DropdownTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
					John Doe
					<ChevronDown className="w-4 h-4" />
				</DropdownTrigger>
				<DropdownContent>
					<DropdownItem>
						<User className="w-4 h-4" />
						Profile
					</DropdownItem>
					<DropdownItem>
						<Settings className="w-4 h-4" />
						Settings
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem variant="destructive">
						<LogOut className="w-4 h-4" />
						Logout
					</DropdownItem>
				</DropdownContent>
			</Dropdown>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Example of how to create an account dropdown similar to navbar usage.',
			},
		},
	},
}