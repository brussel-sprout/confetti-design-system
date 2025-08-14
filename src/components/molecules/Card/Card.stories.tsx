import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'
import { Card, CardContent, CardFooter, CardHeader } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
	title: 'Molecules/Card',
	component: Card,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible card component with header, content, and footer sections. Perfect for displaying content in organized containers.',
			},
		},
	},
	argTypes: {
		children: {
			control: { type: 'text' },
			description: 'The content inside the card',
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

// Basic card
export const Basic: Story = {
	render: () => (
		<Card className="w-80">
			<CardContent>
				<p>This is a basic card with just content.</p>
			</CardContent>
		</Card>
	),
	parameters: {
		docs: {
			description: {
				story: 'Simple card with only content section.',
			},
		},
	},
}

// Card with header
export const WithHeader: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<h3 className="text-lg font-semibold">Card Title</h3>
				<p className="text-sm text-muted-foreground">Card subtitle or description</p>
			</CardHeader>
			<CardContent>
				<p>This card has a header with title and subtitle.</p>
			</CardContent>
		</Card>
	),
	parameters: {
		docs: {
			description: {
				story: 'Card with header section containing title and subtitle.',
			},
		},
	},
}

// Card with footer
export const WithFooter: Story = {
	render: () => (
		<Card className="w-80">
			<CardContent>
				<p>This card has content and a footer with actions.</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline" size="sm">
					Cancel
				</Button>
				<Button size="sm">Save</Button>
			</CardFooter>
		</Card>
	),
	parameters: {
		docs: {
			description: {
				story: 'Card with content and footer containing action buttons.',
			},
		},
	},
}

// Complete card
export const Complete: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold">Project Status</h3>
						<p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
					</div>
					<Badge variant="success">Active</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div>
						<p className="text-sm font-medium">Progress</p>
						<div className="w-full bg-muted rounded-full h-2 mt-1">
							<div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
						</div>
						<p className="text-xs text-muted-foreground mt-1">75% complete</p>
					</div>
					<p className="text-sm">
						This project is progressing well and is on track to meet the deadline.
					</p>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" size="sm">
					View Details
				</Button>
				<Button size="sm">Update</Button>
			</CardFooter>
		</Card>
	),
	parameters: {
		docs: {
			description: {
				story: 'Complete card example with header, content, and footer sections.',
			},
		},
	},
}

// Interactive playground
export const Playground: Story = {
	args: {
		children: 'Interactive Card',
		className: 'w-80',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground to test different card configurations.',
			},
		},
	},
}
