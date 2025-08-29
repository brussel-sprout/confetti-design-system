import { ThemeSelectionHeader } from './ThemeSelectionHeader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ThemeSelectionHeader> = {
	title: 'Organisms/ThemeSelectionHeader',
	component: ThemeSelectionHeader,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A complete theme selection header with progress stepper, gradient title, and subtitle. Matches the design from the screenshot.',
			},
		},
	},
	argTypes: {
		currentStep: {
			control: { type: 'range', min: 1, max: 5, step: 1 },
			description: 'Current step in the process (1-5)',
		},
		title: {
			control: { type: 'text' },
			description: 'Main heading text',
		},
		subtitle: {
			control: { type: 'text' },
			description: 'Subtitle description text',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default - matches screenshot exactly
export const Default: Story = {
	args: {
		currentStep: 2,
		title: 'Choose Your Theme',
		subtitle: 'Perfect themes for your birthday',
	},
}

// Different steps
export const Step1: Story = {
	args: {
		currentStep: 1,
		title: 'Select Party Type',
		subtitle: 'What kind of celebration are you planning?',
	},
}

export const Step3: Story = {
	args: {
		currentStep: 3,
		title: 'Pick Your Elements',
		subtitle: 'Choose decorations and party essentials',
	},
}

export const Step4: Story = {
	args: {
		currentStep: 4,
		title: 'Add Details',
		subtitle: 'Finalize your party information',
	},
}

export const Step5: Story = {
	args: {
		currentStep: 5,
		title: 'Review & Confirm',
		subtitle: 'Everything looks perfect for your celebration',
	},
}

// Custom content
export const CustomContent: Story = {
	args: {
		currentStep: 2,
		title: 'Design Your Experience',
		subtitle: 'Create something truly memorable',
	},
}

// In page context
export const InPageContext: Story = {
	render: (args) => (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-6xl mx-auto">
				<ThemeSelectionHeader {...args} />
				
				{/* Sample content below */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-muted/30 rounded-xl p-6 h-48 flex items-center justify-center">
							<span className="text-muted-foreground">Theme Option {i}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	),
	args: {
		currentStep: 2,
		title: 'Choose Your Theme',
		subtitle: 'Perfect themes for your birthday',
	},
}