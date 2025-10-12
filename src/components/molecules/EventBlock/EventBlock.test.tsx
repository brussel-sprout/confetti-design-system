import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { EventBlock } from './EventBlock'

import type { EventBlockProps } from './EventBlock'
import type { TimelineEvent } from './types'

// Mock navigator.vibrate
const mockVibrate = vi.fn()
Object.defineProperty(navigator, 'vibrate', {
	value: mockVibrate,
	writable: true,
	configurable: true,
})

describe('EventBlock', () => {
	const mockEvent: TimelineEvent = {
		id: 'event-1',
		event_name: 'Test Event',
		description: 'Test event description',
		absoluteStart: new Date('2025-10-12T10:00:00'),
		absoluteEnd: new Date('2025-10-12T11:00:00'),
		is_suggestion: false,
		suggestion_status: 'approved',
	}

	const defaultProps: EventBlockProps = {
		event: mockEvent,
		startTime: new Date('2025-10-12T09:00:00'),
		endTime: new Date('2025-10-12T18:00:00'),
		pixelsPerMinute: 2,
		stackIndex: 0,
		totalStacks: 1,
		isSelected: false,
		isDimmed: false,
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('Rendering', () => {
		it('renders event with correct name', () => {
			render(<EventBlock {...defaultProps} />)
			expect(screen.getByText('Test Event')).toBeInTheDocument()
		})

		it('renders event with description when height is sufficient', () => {
			render(<EventBlock {...defaultProps} />)
			expect(screen.getByText('Test event description')).toBeInTheDocument()
		})

		it('shows selected indicator when isSelected is true', () => {
			const { container } = render(<EventBlock {...defaultProps} isSelected={true} />)
			const indicator = container.querySelector('.bg-primary')
			expect(indicator).toBeInTheDocument()
		})

		it('applies dimmed style when isDimmed is true', () => {
			const { container } = render(<EventBlock {...defaultProps} isDimmed={true} />)
			const eventCard = container.querySelector('[data-timeline-event="true"]')
			expect(eventCard).toHaveClass('opacity-40')
		})
	})

	describe('Desktop Mouse Interactions', () => {
		it('calls onClick when clicking without movement', async () => {
			const onClick = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onClick={onClick} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!

			// Simulate click without movement
			fireEvent.mouseDown(eventCard, { clientX: 100, clientY: 100 })
			fireEvent.mouseUp(eventCard, { clientX: 100, clientY: 100 })
			fireEvent.click(eventCard)

			await waitFor(() => {
				expect(onClick).toHaveBeenCalledTimes(1)
			})
		})

		it('does NOT call onClick when dragging more than 10px', async () => {
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Simulate drag with >10px movement on the content div (where handlers are)
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 100, clientY: 115 }) // 15px vertical movement

			// After dragging, the click handler should prevent onClick
			fireEvent.click(eventCard)

			// onClick should NOT be called because drag was detected
			expect(onClick).not.toHaveBeenCalled()
		})

		it('calls onClick when movement is less than 10px', async () => {
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Simulate small movement (< 10px)
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 102, clientY: 103 }) // ~3.6px movement
			fireEvent.mouseUp(contentDiv, { clientX: 102, clientY: 103 })
			fireEvent.click(eventCard)

			await waitFor(() => {
				expect(onClick).toHaveBeenCalledTimes(1)
			})
		})

		it('calls onTimeChange when dragging is detected', async () => {
			const onTimeChange = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onTimeChange={onTimeChange} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Simulate drag with movement
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 100, clientY: 120 }) // 20px vertical movement

			// Wait for drag to be detected and state to update
			await waitFor(() => {
				// After movement > 10px, drag should have started
				expect(eventCard.getAttribute('data-timeline-dragging')).toBe('true')
			})

			// Trigger document-level mousemove to continue drag (this triggers onTimeChange)
			fireEvent.mouseMove(document, { clientY: 130 })

			// onTimeChange should be called
			expect(onTimeChange).toHaveBeenCalled()

			// End drag
			fireEvent.mouseUp(document)
		})

		it('does not trigger drag when onTimeChange is not provided', () => {
			const onClick = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onClick={onClick} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!

			// Try to drag
			fireEvent.mouseDown(eventCard, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(eventCard, { clientX: 100, clientY: 120 })
			fireEvent.mouseUp(eventCard)
			fireEvent.click(eventCard)

			// Should still open drawer since drag is disabled
			expect(onClick).toHaveBeenCalledTimes(1)
		})

		it('resize handles trigger drag without opening drawer', async () => {
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const resizeHandle = container.querySelector('.cursor-ns-resize')!

			// Click resize handle
			fireEvent.mouseDown(resizeHandle, { clientY: 100 })
			fireEvent.click(resizeHandle) // This click is on the handle itself

			// The handle stops propagation, so onClick should not be called
			expect(onClick).not.toHaveBeenCalled()
		})
	})

	describe('Mobile Touch Interactions', () => {
		it('calls onClick on quick tap', async () => {
			const onClick = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onClick={onClick} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!

			// Simulate quick tap
			fireEvent.touchStart(eventCard, {
				touches: [{ clientX: 100, clientY: 100 }],
			})
			fireEvent.touchEnd(eventCard)
			fireEvent.click(eventCard)

			await waitFor(() => {
				expect(onClick).toHaveBeenCalledTimes(1)
			})
		})

		it('triggers drag after long-press (300ms) with haptic feedback', async () => {
			vi.useFakeTimers()
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Start touch
			fireEvent.touchStart(contentDiv, {
				touches: [{ clientX: 100, clientY: 100 }],
			})

			// Advance time to trigger long-press
			vi.advanceTimersByTime(300)

			// Check haptic feedback was triggered
			expect(mockVibrate).toHaveBeenCalledWith(50)

			// Simulate drag movement
			fireEvent.touchMove(document, {
				touches: [{ clientY: 120 }],
			})
			fireEvent.touchEnd(document)

			// Should not open drawer after drag
			fireEvent.click(eventCard)
			expect(onClick).not.toHaveBeenCalled()

			vi.useRealTimers()
		})

		it('cancels long-press when movement detected early', async () => {
			vi.useFakeTimers()
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Start touch
			fireEvent.touchStart(contentDiv, {
				touches: [{ clientX: 100, clientY: 100 }],
			})

			// Move before long-press completes (only 100ms elapsed)
			vi.advanceTimersByTime(100)
			fireEvent.touchMove(contentDiv, {
				touches: [{ clientX: 100, clientY: 115 }], // >10px movement
			})

			// Complete the interaction
			fireEvent.touchEnd(contentDiv)

			// Click after movement should be blocked
			fireEvent.click(eventCard)

			// Long-press was cancelled, but movement was detected (hasDragged=true)
			// So drawer should NOT open
			expect(onClick).not.toHaveBeenCalled()
			expect(mockVibrate).not.toHaveBeenCalled()

			vi.useRealTimers()
		})

		it('ignores multi-touch events', () => {
			const onClick = vi.fn()
			const onTimeChange = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Multi-touch start
			fireEvent.touchStart(contentDiv, {
				touches: [
					{ clientX: 100, clientY: 100 },
					{ clientX: 150, clientY: 100 },
				],
			})

			fireEvent.touchEnd(contentDiv)

			// Should not trigger anything
			expect(onTimeChange).not.toHaveBeenCalled()
		})
	})

	describe('State Management and Cleanup', () => {
		it('resets state properly after drag completion', async () => {
			const onTimeChange = vi.fn()
			const onClick = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// First drag
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 100, clientY: 120 })

			// Wait for drag to start
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBe('true')
			})

			fireEvent.mouseMove(document, { clientY: 130 })
			fireEvent.mouseUp(document)

			// Wait for drag to end
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBeNull()
			})

			// Second interaction should be a clean click (hasDragged should be reset on new mouseDown)
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseUp(contentDiv)
			fireEvent.click(eventCard)

			// Should open drawer since this is a new clean interaction
			expect(onClick).toHaveBeenCalled()
		})

		it('handles rapid sequential interactions', async () => {
			const onTimeChange = vi.fn()
			const onClick = vi.fn()
			const { container } = render(
				<EventBlock {...defaultProps} onClick={onClick} onTimeChange={onTimeChange} />
			)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Rapid click-drag-click sequence
			// First click
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseUp(contentDiv)
			fireEvent.click(eventCard)

			expect(onClick).toHaveBeenCalledTimes(1)

			// Then drag
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 100, clientY: 120 })

			// Wait for drag to start
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBe('true')
			})

			fireEvent.mouseUp(document)

			// Wait for drag to end
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBeNull()
			})

			// Then another click (new mouseDown resets hasDragged)
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseUp(contentDiv)
			fireEvent.click(eventCard)

			// Both clean clicks should register
			expect(onClick).toHaveBeenCalledTimes(2)
		})

		it('cleans up touch timer on unmount', () => {
			vi.useFakeTimers()
			const { container, unmount } = render(<EventBlock {...defaultProps} onTimeChange={vi.fn()} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!

			// Start long-press
			fireEvent.touchStart(eventCard, {
				touches: [{ clientX: 100, clientY: 100 }],
			})

			// Unmount before long-press completes
			unmount()

			// Advance timers - should not crash
			vi.advanceTimersByTime(300)

			// Verify no haptic feedback was triggered after unmount
			expect(mockVibrate).not.toHaveBeenCalled()

			vi.useRealTimers()
		})
	})

	describe('Delete Functionality', () => {
		it('calls onDelete when delete button is clicked', () => {
			const onDelete = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onDelete={onDelete} />)

			const deleteButton = container.querySelector('[aria-label="Delete event"]')!
			fireEvent.click(deleteButton)

			expect(onDelete).toHaveBeenCalledWith('event-1')
		})

		it('does not render delete button when onDelete is not provided', () => {
			const { container } = render(<EventBlock {...defaultProps} />)

			const deleteButton = container.querySelector('[aria-label="Delete event"]')
			expect(deleteButton).not.toBeInTheDocument()
		})
	})

	describe('Visual Feedback', () => {
		it('applies dragging styles during drag operation', async () => {
			const onTimeChange = vi.fn()
			const { container } = render(<EventBlock {...defaultProps} onTimeChange={onTimeChange} />)

			const eventCard = container.querySelector('[data-timeline-event="true"]')!
			const contentDiv = eventCard.querySelector('.cursor-move')!

			// Start drag
			fireEvent.mouseDown(contentDiv, { clientX: 100, clientY: 100 })
			fireEvent.mouseMove(contentDiv, { clientX: 100, clientY: 120 })

			// Wait for drag state to be applied
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBe('true')
			})

			// Check dragging styles are applied
			expect(eventCard).toHaveClass('opacity-70')

			// End drag
			fireEvent.mouseUp(document)

			// Wait for drag state to be cleared
			await waitFor(() => {
				expect(eventCard.getAttribute('data-timeline-dragging')).toBeNull()
			})
		})

		it('shows resize handles on desktop only', () => {
			const { container } = render(<EventBlock {...defaultProps} onTimeChange={vi.fn()} />)

			const resizeHandles = container.querySelectorAll('.cursor-ns-resize')
			expect(resizeHandles).toHaveLength(2) // top and bottom

			// Check they have md: hidden class (mobile hidden)
			resizeHandles.forEach((handle) => {
				expect(handle).toHaveClass('hidden', 'md:flex')
			})
		})
	})
})
