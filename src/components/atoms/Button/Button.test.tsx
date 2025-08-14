import { fireEvent, render, screen } from '@storybook/test'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
	it('renders with default props', () => {
		render(<Button>Click me</Button>)
		const button = screen.getByRole('button', { name: 'Click me' })
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
	})

	it('renders with different variants', () => {
		const { rerender } = render(<Button variant="secondary">Secondary</Button>)
		expect(screen.getByRole('button')).toHaveClass('bg-secondary', 'text-secondary-foreground')

		rerender(<Button variant="outline">Outline</Button>)
		expect(screen.getByRole('button')).toHaveClass('bg-background/80', 'text-foreground')

		rerender(<Button variant="ghost">Ghost</Button>)
		expect(screen.getByRole('button')).toHaveClass('bg-transparent', 'text-foreground')

		rerender(<Button variant="destructive">Destructive</Button>)
		expect(screen.getByRole('button')).toHaveClass('bg-destructive', 'text-destructive-foreground')
	})

	it('renders with different sizes', () => {
		const { rerender } = render(<Button size="sm">Small</Button>)
		expect(screen.getByRole('button')).toHaveClass('px-3', 'py-2', 'text-sm')

		rerender(<Button size="md">Medium</Button>)
		expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2.5', 'text-base')

		rerender(<Button size="lg">Large</Button>)
		expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
	})

	it('shows loading state', () => {
		render(<Button loading>Loading</Button>)
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
		expect(screen.getByRole('button')).toHaveClass('opacity-50')
		// Check for loading spinner
		expect(button.querySelector('.w-4.h-4.border-2')).toBeInTheDocument()
	})

	it('shows disabled state', () => {
		render(<Button disabled>Disabled</Button>)
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
		expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
	})

	it('handles click events', () => {
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click me</Button>)

		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('does not handle click events when disabled', () => {
		const handleClick = vi.fn()
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>
		)

		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('does not handle click events when loading', () => {
		const handleClick = vi.fn()
		render(
			<Button loading onClick={handleClick}>
				Loading
			</Button>
		)

		fireEvent.click(screen.getByRole('button'))
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('applies custom className', () => {
		render(<Button className="custom-class">Custom</Button>)
		expect(screen.getByRole('button')).toHaveClass('custom-class')
	})

	it('forwards ref correctly', () => {
		const ref = vi.fn()
		render(<Button ref={ref}>Ref</Button>)
		expect(ref).toHaveBeenCalled()
	})

	it('spreads additional props', () => {
		render(
			<Button data-testid="test-button" aria-label="Test">
				Test
			</Button>
		)
		const button = screen.getByTestId('test-button')
		expect(button).toHaveAttribute('aria-label', 'Test')
	})

	it('has proper accessibility attributes', () => {
		render(<Button>Accessible</Button>)
		const button = screen.getByRole('button')
		expect(button).toHaveAttribute('type', 'submit') // default button type
	})
})
