import React, { useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn'
import { Icon } from '../Icon'

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
	showCloseButton?: boolean
	closeOnOverlayClick?: boolean
	closeOnEscape?: boolean
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className = '',
	size = 'md',
	showCloseButton = true,
	closeOnOverlayClick = true,
	closeOnEscape = true,
}) => {
	const modalRef = useRef<HTMLDivElement>(null)

	// Handle escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (closeOnEscape && event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			// Prevent body scroll
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, closeOnEscape, onClose])

	// Handle overlay click
	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (closeOnOverlayClick && event.target === event.currentTarget) {
			onClose()
		}
	}

	if (!isOpen) return null

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl',
		full: 'max-w-full mx-4',
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			onClick={handleOverlayClick}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-modal-backdrop" />
			
			{/* Modal Content */}
			<div
				ref={modalRef}
				className={cn(
					'relative bg-background rounded-xl shadow-xl border border-border',
					'w-full max-h-[90vh] overflow-hidden',
					'animate-modal-content',
					sizeClasses[size],
					className
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between p-6 border-b border-border">
						{title && (
							<h2 className="text-xl font-semibold text-foreground">
								{title}
							</h2>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
								aria-label="Close modal"
							>
								<Icon name="x" size="sm" />
							</button>
						)}
					</div>
				)}

				{/* Content */}
				<div className="overflow-y-auto max-h-[calc(90vh-120px)]">
					{children}
				</div>
			</div>
		</div>
	)
}

export { Modal }
