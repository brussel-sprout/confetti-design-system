import { useState } from 'react'
import { DatePicker } from './DatePicker'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DatePicker> = {
	title: 'Atoms/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A modern, accessible date picker component with keyboard navigation, multiple view modes, and comprehensive date selection features.',
			},
		},
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'The size of the date picker input',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'outline', 'filled'],
			description: 'The visual style variant',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the date picker is disabled',
		},
		required: {
			control: { type: 'boolean' },
			description: 'Whether the date picker is required',
		},
		mode: {
			control: { type: 'select' },
			options: ['single', 'range'],
			description: 'Date selection mode (range mode coming soon)',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default date picker
export const Default: Story = {
	args: {
		placeholder: 'Select a date...',
	},
}

// With label and helper text
export const WithLabel: Story = {
	args: {
		label: 'Event Date',
		placeholder: 'Choose event date',
		helperText: 'Select the date for your event',
	},
}

// With error state
export const WithError: Story = {
	args: {
		label: 'Deadline',
		placeholder: 'Select deadline',
		error: 'Please select a valid date',
	},
}

// Different sizes
export const Sizes: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<DatePicker label="Small" size="sm" placeholder="Small date picker" />
			<DatePicker label="Medium" size="md" placeholder="Medium date picker" />
			<DatePicker label="Large" size="lg" placeholder="Large date picker" />
		</div>
	),
}

// Different variants
export const Variants: Story = {
	render: () => (
		<div className="space-y-4 w-80">
			<DatePicker label="Default" variant="default" placeholder="Default variant" />
			<DatePicker label="Outline" variant="outline" placeholder="Outline variant" />
			<DatePicker label="Filled" variant="filled" placeholder="Filled variant" />
		</div>
	),
}

// With date restrictions
export const WithRestrictions: Story = {
	render: () => {
		const today = new Date()
		const nextWeek = new Date()
		nextWeek.setDate(today.getDate() + 7)
		const nextMonth = new Date()
		nextMonth.setMonth(today.getMonth() + 1)

		return (
			<div className="space-y-4 w-80">
				<DatePicker
					label="Future Dates Only"
					placeholder="Select future date"
					minDate={today}
					helperText="Only future dates are allowed"
				/>
				<DatePicker
					label="Date Range"
					placeholder="Select date in range"
					minDate={nextWeek}
					maxDate={nextMonth}
					helperText="Select between next week and next month"
				/>
			</div>
		)
	},
}

// Controlled component
export const Controlled: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date | null>(null)

		return (
			<div className="space-y-4 w-80">
				<DatePicker
					label="Controlled Date Picker"
					placeholder="Select a date"
					value={selectedDate || undefined}
					onChange={setSelectedDate}
					helperText="This is a controlled component"
				/>
				{selectedDate && (
					<div className="p-3 bg-muted rounded-lg">
						<p className="text-sm">
							Selected: {selectedDate.toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
				)}
			</div>
		)
	},
}

// Disabled state
export const Disabled: Story = {
	args: {
		label: 'Disabled Date Picker',
		placeholder: 'Cannot select date',
		disabled: true,
		helperText: 'This date picker is disabled',
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		label: 'Interactive Date Picker',
		placeholder: 'Try different configurations',
		size: 'md',
		variant: 'default',
		disabled: false,
		required: false,
		helperText: 'Use the controls to test different states',
	},
}