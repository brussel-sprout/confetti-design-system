import { useState, useEffect } from 'react'
import { ProgressTracker } from './ProgressTracker'
import type { ProgressCategory } from './ProgressTracker'
import { userEvent, within } from '@storybook/test'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProgressTracker> = {
	title: 'Organisms/ProgressTracker',
	component: ProgressTracker,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A comprehensive progress tracking modal for party creation flow with real-time updates and animations.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const mockCategories: ProgressCategory[] = [
	{
		id: 'theme-analysis',
		name: 'Theme Analysis & Customization',
		status: 'completed',
		steps: [
			{
				id: 'analyze-preferences',
				title: 'Analyzing Preferences',
				description: 'Processing your party style and theme preferences',
				status: 'completed',
				progress: 100,
				estimatedTime: '30 sec',
			},
			{
				id: 'customize-theme',
				title: 'Customizing Theme',
				description: 'Tailoring the theme to match your vision',
				status: 'completed',
				progress: 100,
				estimatedTime: '45 sec',
			},
		],
	},
	{
		id: 'element-generation',
		name: 'Element Generation & AI Creation',
		status: 'running',
		steps: [
			{
				id: 'generate-elements',
				title: 'Generating Elements',
				description: 'Creating personalized party elements and decorations',
				status: 'running',
				progress: 65,
				estimatedTime: '2 min',
			},
			{
				id: 'ai-images',
				title: 'AI Image Creation',
				description: 'Generating custom images for your party theme',
				status: 'pending',
				progress: 0,
				estimatedTime: '1 min',
			},
		],
	},
	{
		id: 'vendor-recommendations',
		name: 'Material Suggestions & Vendors',
		status: 'pending',
		steps: [
			{
				id: 'find-materials',
				title: 'Finding Materials',
				description: 'Sourcing the best materials for your party',
				status: 'pending',
				progress: 0,
				estimatedTime: '1 min',
			},
			{
				id: 'vendor-matching',
				title: 'Vendor Matching',
				description: 'Connecting you with local party suppliers',
				status: 'pending',
				progress: 0,
				estimatedTime: '45 sec',
			},
		],
	},
	{
		id: 'timeline-generation',
		name: 'Task & Timeline Generation',
		status: 'pending',
		steps: [
			{
				id: 'create-timeline',
				title: 'Creating Timeline',
				description: 'Building your personalized party planning schedule',
				status: 'pending',
				progress: 0,
				estimatedTime: '30 sec',
			},
			{
				id: 'generate-tasks',
				title: 'Generating Tasks',
				description: 'Creating your party planning checklist',
				status: 'pending',
				progress: 0,
				estimatedTime: '20 sec',
			},
		],
	},
]

export const Default: Story = {
	args: {
		isOpen: true,
		categories: mockCategories,
		onClose: () => console.log('Close clicked'),
		onComplete: () => console.log('Progress completed'),
	},
}

export const Interactive: Story = {
	render: (args) => {
		const InteractiveProgressTracker = () => {
			const [isOpen, setIsOpen] = useState(false)
			const [categories, setCategories] = useState<ProgressCategory[]>(mockCategories)

			// Simulate progress updates
			useEffect(() => {
				if (!isOpen) return

				const interval = setInterval(() => {
					setCategories(prev => {
						const newCategories = [...prev]
						
						// Find the first running or pending step
						for (let catIndex = 0; catIndex < newCategories.length; catIndex++) {
							const category = newCategories[catIndex]
							for (let stepIndex = 0; stepIndex < category.steps.length; stepIndex++) {
								const step = category.steps[stepIndex]
								
								if (step.status === 'running') {
									// Increment progress
									if (step.progress < 100) {
										step.progress = Math.min(100, step.progress + 5)
									} else {
										// Mark as completed and move to next
										step.status = 'completed'
										step.progress = 100
										
										// Start next step
										const nextStepIndex = stepIndex + 1
										if (nextStepIndex < category.steps.length) {
											category.steps[nextStepIndex].status = 'running'
										} else {
											// Mark category as completed and start next category
											category.status = 'completed'
											const nextCatIndex = catIndex + 1
											if (nextCatIndex < newCategories.length) {
												newCategories[nextCatIndex].status = 'running'
												newCategories[nextCatIndex].steps[0].status = 'running'
											}
										}
									}
									return newCategories
								} else if (step.status === 'pending' && catIndex === 0 && stepIndex === 0) {
									// Start the first step
									step.status = 'running'
									category.status = 'running'
									return newCategories
								}
							}
						}
						
						return newCategories
					})
				}, 800)

				return () => clearInterval(interval)
			}, [isOpen])

			return (
				<div className="p-8">
					<button
						onClick={() => {
							setIsOpen(true)
							// Reset progress
							setCategories(mockCategories.map(cat => ({
								...cat,
								status: cat.id === 'theme-analysis' ? 'pending' : 'pending',
								steps: cat.steps.map(step => ({
									...step,
									status: 'pending',
									progress: 0,
								}))
							})))
						}}
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
					>
						Start Party Creation
					</button>

					<ProgressTracker
						isOpen={isOpen}
						categories={categories}
						onClose={() => setIsOpen(false)}
						onComplete={() => console.log('Party creation completed!')}
						allowClose={false}
					/>
				</div>
			)
		}

		return <InteractiveProgressTracker />
	},
	parameters: {
		docs: {
			story: {
				inline: false,
				iframeHeight: 600,
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const startButton = canvas.getByText('Start Party Creation');
		
		// Simulate clicking the start button
		await userEvent.click(startButton);
		
		// Allow time for the progress simulation to advance and state updates to be processed
		await new Promise(resolve => setTimeout(resolve, 3000));
	},
}

export const Completed: Story = {
	args: {
		isOpen: true,
		categories: mockCategories.map(cat => ({
			...cat,
			status: 'completed',
			steps: cat.steps.map(step => ({
				...step,
				status: 'completed',
				progress: 100,
			}))
		})),
		onClose: () => console.log('Close clicked'),
		onComplete: () => console.log('Progress completed'),
	},
}