import { Badge } from './Badge'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> = {
	title: 'Atoms/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A versatile badge component for displaying status, labels, and small pieces of information. Multiple variants and sizes available.',
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'secondary', 'outline', 'destructive', 'success', 'warning', 'info'],
			description: 'The visual style variant of the badge',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the badge',
		},
		children: {
			control: { type: 'text' },
			description: 'The content inside the badge',
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

// Default badge
export const Default: Story = {
	args: {
		children: 'Badge',
		variant: 'default',
		size: 'md',
	},
}

// All variants
export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="info">Info</Badge>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'All available badge variants with their distinct visual styles.',
			},
		},
	},
}

// All sizes
export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
			<Badge size="lg">Large</Badge>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different badge sizes for various use cases.',
			},
		},
	},
}

// With icons
export const WithIcons: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			<Badge>
				<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
				Success
			</Badge>
			<Badge variant="warning">
				<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
					/>
				</svg>
				Warning
			</Badge>
			<Badge variant="info">
				<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				Info
			</Badge>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Badges with icons for better visual communication.',
			},
		},
	},
}

// Status indicators
export const StatusIndicators: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 bg-success rounded-full"></div>
				<Badge variant="success">Online</Badge>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 bg-warning rounded-full"></div>
				<Badge variant="warning">Away</Badge>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 bg-destructive rounded-full"></div>
				<Badge variant="destructive">Offline</Badge>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Badges used as status indicators with colored dots.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		children: 'Interactive Badge',
		variant: 'default',
		size: 'md',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different badge configurations.',
			},
		},
	},
}