import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible input component with support for labels, error states, helper text, and icons. Multiple variants and sizes available.',
			},
		},
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
			description: 'The HTML input type',
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the input',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'outline', 'filled'],
			description: 'The visual style variant',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the input is disabled',
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Placeholder text',
		},
		label: {
			control: { type: 'text' },
			description: 'Label text above the input',
		},
		error: {
			control: { type: 'text' },
			description: 'Error message to display below the input',
		},
		helperText: {
			control: { type: 'text' },
			description: 'Helper text to display below the input',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default input
export const Default: Story = {
	args: {
		placeholder: 'Enter text...',
		type: 'text',
	},
}

// With label
export const WithLabel: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'Enter your email',
		type: 'email',
	},
}

// With helper text
export const WithHelperText: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
		helperText: 'Must be at least 8 characters long',
	},
}

// With error
export const WithError: Story = {
	args: {
		label: 'Email Address',
		type: 'email',
		placeholder: 'Enter your email',
		error: 'Please enter a valid email address',
	},
}

// All variants
export const Variants: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<Input label="Default Variant" placeholder="Default style" />
			<Input label="Outline Variant" variant="outline" placeholder="Outline style" />
			<Input label="Filled Variant" variant="filled" placeholder="Filled style" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different visual variants of the input component.',
			},
		},
	},
}

// All sizes
export const Sizes: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<Input label="Small" size="sm" placeholder="Small input" />
			<Input label="Medium" size="md" placeholder="Medium input" />
			<Input label="Large" size="lg" placeholder="Large input" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Different sizes available for the input component.',
			},
		},
	},
}

// With icons
export const WithIcons: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<Input
				label="Search"
				placeholder="Search..."
				type="search"
				leftIcon={
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				}
			/>
			<Input
				label="Email"
				placeholder="Enter email"
				type="email"
				rightIcon={
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
						/>
					</svg>
				}
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Inputs with left and right icons for better visual context.',
			},
		},
	},
}

// Different types
export const InputTypes: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<Input label="Text" type="text" placeholder="Enter text" />
			<Input label="Email" type="email" placeholder="Enter email" />
			<Input label="Password" type="password" placeholder="Enter password" />
			<Input label="Number" type="number" placeholder="Enter number" />
			<Input label="Tel" type="tel" placeholder="Enter phone number" />
			<Input label="URL" type="url" placeholder="Enter URL" />
			<Input label="Search" type="search" placeholder="Search..." />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'All supported HTML input types with appropriate styling.',
			},
		},
	},
}

// Disabled state
export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		placeholder: 'This input is disabled',
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled input that cannot be interacted with.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		label: 'Interactive Input',
		placeholder: 'Try different configurations',
		type: 'text',
		size: 'md',
		variant: 'default',
		disabled: false,
		helperText: 'This is helper text',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different input configurations.',
			},
		},
	},
}
