import React, { useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn'
import { Icon } from '../Icon'

export interface DrawerProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	className?: string
	position?: 'left' | 'right' | 'top' | 'bottom'
	size?: 'sm' | 'md' | 'lg' | 'xl'
	showCloseButton?: boolean
	closeOnOverlayClick?: boolean
	closeOnEscape?: boolean
}

const Drawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className = '',
	position = 'right',
	size = 'md',
	showCloseButton = true,
	closeOnOverlayClick = true,
	closeOnEscape = true,
}) => {
	const drawerRef = useRef<HTMLDivElement>(null)

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

	const positionClasses = {
		left: 'left-0 top-0 h-full',
		right: 'right-0 top-0 h-full',
		top: 'top-0 left-0 w-full',
		bottom: 'bottom-0 left-0 w-full',
	}

	const sizeClasses = {
		sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
		md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
		lg: position === 'left' || position === 'right' ? 'w-[28rem]' : 'h-[28rem]',
		xl: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
	}

	const animationClasses = {
		left: 'animate-drawer-slide-in-left',
		right: 'animate-drawer-slide-in-right',
		top: 'animate-drawer-slide-in-top',
		bottom: 'animate-drawer-slide-in-bottom',
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={handleOverlayClick}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-modal-backdrop" />
			
			{/* Drawer Content */}
			<div
				ref={drawerRef}
				className={cn(
					'absolute bg-background shadow-xl border-border overflow-hidden',
					'flex flex-col',
					positionClasses[position],
					sizeClasses[size],
					animationClasses[position],
					className
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between p-4 border-b border-border">
						{title && (
							<h2 className="text-lg font-semibold text-foreground">
								{title}
							</h2>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
								aria-label="Close drawer"
							>
								<Icon name="x" size="sm" />
							</button>
						)}
					</div>
				)}

				{/* Content */}
				<div className="flex-1 overflow-y-auto">
					{children}
				</div>
			</div>
		</div>
	)
}

export { Drawer }
