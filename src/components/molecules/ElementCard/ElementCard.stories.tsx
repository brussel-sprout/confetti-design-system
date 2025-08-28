import { ElementCard } from './ElementCard'
import type { Element, Layout, Mode } from './types'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ElementCard> = {
	title: 'Molecules/ElementCard',
	component: ElementCard,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A flexible element card component for displaying party elements with different layouts, modes, and content variants.',
			},
		},
	},
	argTypes: {
		layout: {
			control: { type: 'object' },
			description: 'Layout configuration for the card',
		},
		mode: {
			control: { type: 'object' },
			description: 'Mode configuration for the card',
		},
		contentVariant: {
			control: { type: 'select' },
			options: ['default', 'minimal', 'detailed'],
			description: 'Content display variant',
		},
		isSelected: {
			control: { type: 'boolean' },
			description: 'Whether the card is selected',
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleElement: Element = {
	party_element_id: '1',
	element_name: 'Birthday Balloons',
	category: 'Decorations',
	description: 'Colorful birthday balloons to brighten up your party',
	image_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
	created_at: '2024-01-15T10:30:00Z',
	updated_at: '2024-01-15T10:30:00Z',
}

const gridLayout: Layout = {
	type: 'grid',
	aspectRatio: 'square',
}

const listLayout: Layout = {
	type: 'list',
}

const selectionMode: Mode = {
	type: 'selection',
}

const viewMode: Mode = {
	type: 'view',
}

const editMode: Mode = {
	type: 'edit',
}

export const GridSelection: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: selectionMode,
		contentVariant: 'default',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Toggled:', id),
	},
}

export const GridSelected: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: selectionMode,
		contentVariant: 'default',
		isSelected: true,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Toggled:', id),
	},
}

export const ListSelection: Story = {
	args: {
		element: sampleElement,
		layout: listLayout,
		mode: selectionMode,
		contentVariant: 'default',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Toggled:', id),
	},
}

export const ViewMode: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: viewMode,
		contentVariant: 'default',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Favorited:', id),
	},
}

export const EditMode: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: editMode,
		contentVariant: 'default',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onDelete: (id) => console.log('Deleted:', id),
	},
}

export const MinimalContent: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: selectionMode,
		contentVariant: 'minimal',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Toggled:', id),
	},
}

export const DetailedContent: Story = {
	args: {
		element: sampleElement,
		layout: gridLayout,
		mode: viewMode,
		contentVariant: 'detailed',
		isSelected: false,
		onClick: (element) => console.log('Clicked:', element),
		onToggle: (id) => console.log('Favorited:', id),
	},
}

export const AllLayouts: Story = {
	render: () => (
		<div className="space-y-8 w-full max-w-4xl">
			<div>
				<h3 className="text-lg font-semibold mb-4">Grid Layout</h3>
				<div className="grid grid-cols-3 gap-4">
					<ElementCard
						element={sampleElement}
						layout={gridLayout}
						mode={selectionMode}
						onClick={(element) => console.log('Clicked:', element)}
						onToggle={(id) => console.log('Toggled:', id)}
					/>
					<ElementCard
						element={{ ...sampleElement, party_element_id: '2', element_name: 'Party Hats' }}
						layout={gridLayout}
						mode={selectionMode}
						isSelected={true}
						onClick={(element) => console.log('Clicked:', element)}
						onToggle={(id) => console.log('Toggled:', id)}
					/>
					<ElementCard
						element={{ ...sampleElement, party_element_id: '3', element_name: 'Confetti' }}
						layout={gridLayout}
						mode={selectionMode}
						onClick={(element) => console.log('Clicked:', element)}
						onToggle={(id) => console.log('Toggled:', id)}
					/>
				</div>
			</div>
			
			<div>
				<h3 className="text-lg font-semibold mb-4">List Layout</h3>
				<div className="space-y-2">
					<ElementCard
						element={sampleElement}
						layout={listLayout}
						mode={selectionMode}
						onClick={(element) => console.log('Clicked:', element)}
						onToggle={(id) => console.log('Toggled:', id)}
					/>
					<ElementCard
						element={{ ...sampleElement, party_element_id: '2', element_name: 'Party Hats' }}
						layout={listLayout}
						mode={selectionMode}
						isSelected={true}
						onClick={(element) => console.log('Clicked:', element)}
						onToggle={(id) => console.log('Toggled:', id)}
					/>
				</div>
			</div>
		</div>
	),
}