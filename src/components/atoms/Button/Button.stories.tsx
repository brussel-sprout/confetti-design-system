import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A versatile button component with multiple variants, sizes, and states. Supports loading states, disabled states, and smooth animations.',
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
			description: 'The visual style variant of the button',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the button',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the button is disabled',
		},
		loading: {
			control: { type: 'boolean' },
			description: 'Whether the button shows a loading spinner',
		},
		children: {
			control: { type: 'text' },
			description: 'The content inside the button',
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

// Default button
export const Default: Story = {
	args: {
		children: 'Button',
		variant: 'default',
		size: 'md',
	},
}

// All variants
export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="default">Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'All available button variants with their distinct visual styles.',
			},
		},
	},
}

// All sizes
export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different button sizes for various use cases.',
			},
		},
	},
}

// Loading state
export const Loading: Story = {
	args: {
		children: 'Loading...',
		loading: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Button in loading state with animated spinner.',
			},
		},
	},
}

// Disabled state
export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled button that cannot be interacted with.',
			},
		},
	},
}

// With icons
export const WithIcons: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				Add Item
			</Button>
			<Button variant="outline">
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
					/>
				</svg>
				Download
			</Button>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Buttons with icons for better visual communication.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		children: 'Click me!',
		variant: 'default',
		size: 'md',
		disabled: false,
		loading: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different button configurations.',
			},
		},
	},
}
