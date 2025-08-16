import { Logo } from './Logo'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Logo> = {
	title: 'Atoms/Logo',
	component: Logo,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A logo component featuring an AI brain icon in a rounded square with "Party Planner" text. Multiple sizes and variants available.',
			},
		},
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the logo',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'minimal', 'icon-only'],
			description: 'The visual variant of the logo',
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

// Default logo
export const Default: Story = {
	args: {
		size: 'md',
		variant: 'default',
	},
}

// All sizes
export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-8">
			<div className="text-center space-y-2">
				<Logo size="sm" />
				<p className="text-xs text-muted-foreground">Small</p>
			</div>
			<div className="text-center space-y-2">
				<Logo size="md" />
				<p className="text-xs text-muted-foreground">Medium</p>
			</div>
			<div className="text-center space-y-2">
				<Logo size="lg" />
				<p className="text-xs text-muted-foreground">Large</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different sizes available for the logo component.',
			},
		},
	},
}

// All variants
export const Variants: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<Logo variant="default" />
				<p className="text-xs text-muted-foreground">Default</p>
			</div>
			<div className="text-center space-y-2">
				<Logo variant="minimal" />
				<p className="text-xs text-muted-foreground">Minimal (icon only)</p>
			</div>
			<div className="text-center space-y-2">
				<Logo variant="icon-only" />
				<p className="text-xs text-muted-foreground">Icon Only</p>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different variants of the logo component.',
			},
		},
	},
}

// In navigation context
export const InNavigation: Story = {
	render: () => (
		<div className="bg-background border border-border rounded-lg p-4 w-full max-w-md">
			<div className="flex items-center justify-between">
				<Logo size="sm" />
				<div className="flex items-center gap-2">
					<button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
						Login
					</button>
					<button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Logo used in a navigation context.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		size: 'md',
		variant: 'default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different logo configurations.',
			},
		},
	},
}