import React from 'react'
import { Drawer as VaulDrawer } from 'vaul'

import { cn } from '../../../utils/cn'
import { Icon } from '../Icon'

export interface DrawerProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	className?: string
	direction?: 'top' | 'bottom' | 'left' | 'right'
	width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
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
	direction = 'right',
	width = 'md',
	showCloseButton = true,
	closeOnOverlayClick = true,
}) => {
	const widthClasses = {
		sm: direction === 'left' || direction === 'right' ? 'w-80' : 'h-80',
		md: direction === 'left' || direction === 'right' ? 'w-96' : 'h-96',
		lg: direction === 'left' || direction === 'right' ? 'w-[28rem]' : 'h-[28rem]',
		xl: direction === 'left' || direction === 'right' ? 'w-[32rem]' : 'h-[32rem]',
		full: direction === 'left' || direction === 'right' ? 'w-full' : 'h-full',
	}

	return (
		<VaulDrawer.Root
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (!open) {
					onClose()
				}
			}}
			direction={direction}
			dismissible={closeOnOverlayClick}
			modal={true}
		>
			<VaulDrawer.Portal>
				<VaulDrawer.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
				<VaulDrawer.Content
					className={cn(
						'fixed bg-background shadow-xl border-border overflow-hidden z-50',
						'flex flex-col',
						widthClasses[width],
						className
					)}
				>
					{/* Header */}
					{(title || showCloseButton) && (
						<div className="flex items-center justify-between p-4 border-b border-border">
							{title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
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
					<div className="flex-1 overflow-y-auto">{children}</div>
				</VaulDrawer.Content>
			</VaulDrawer.Portal>
		</VaulDrawer.Root>
	)
}

export { Drawer }
