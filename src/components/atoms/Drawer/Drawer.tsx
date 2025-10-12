import { XIcon } from 'lucide-react'
import React from 'react'
import { Drawer as VaulDrawer } from 'vaul'

import { cn } from '../../../utils/cn'

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
	showMobileHandle?: boolean
	contentClassName?: string
}

export const Drawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className = '',
	direction = 'right',
	width = 'md',
	showCloseButton = true,
	closeOnOverlayClick = true,
	showMobileHandle = false,
	contentClassName = '',
}) => {
	const getPositionClasses = () => {
		if (width === 'full') {
			if (direction === 'bottom') return 'w-full h-full inset-x-0 bottom-0'
			if (direction === 'top') return 'w-full h-full inset-x-0 top-0'
			if (direction === 'left') return 'h-full w-full inset-y-0 left-0'
			if (direction === 'right') return 'h-full w-full inset-y-0 right-0'
		}

		const sizeMap: Record<Exclude<typeof width, 'full'>, { w: string; h: string }> = {
			sm: { w: 'w-80', h: 'h-80' },
			md: { w: 'w-96', h: 'h-96' },
			lg: { w: 'w-[28rem]', h: 'h-[28rem]' },
			xl: { w: 'w-[32rem]', h: 'h-[32rem]' },
		}

		const { w, h } = sizeMap[width as Exclude<typeof width, 'full'>]

		if (direction === 'left') return `${w} h-full left-0 top-0`
		if (direction === 'right') return `${w} h-full right-0 top-0`
		if (direction === 'top') return `w-full ${h} top-0 left-0`
		if (direction === 'bottom') return `w-full ${h} bottom-0 left-0`

		return `${w} h-full right-0 top-0`
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
						'fixed bg-background border-border overflow-hidden z-50',
						'flex flex-col',
						getPositionClasses(),
						contentClassName
					)}
					style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.25)' }}
				>
					{/* Mobile Handle */}
					{showMobileHandle && direction === 'bottom' && (
						<div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-3" />
					)}

					{/* Header */}
					{(title || showCloseButton) && (
						<div className="flex items-center justify-between p-4 border-b border-border">
							{title && (
								<VaulDrawer.Title className="text-lg font-semibold text-foreground">
									{title}
								</VaulDrawer.Title>
							)}
							{showCloseButton && (
								<button
									onClick={onClose}
									className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
									aria-label="Close drawer"
								>
									<XIcon size={16} />
								</button>
							)}
						</div>
					)}

					{/* Content */}
					<div className={cn('flex-1 overflow-y-auto', className)}>{children}</div>
				</VaulDrawer.Content>
			</VaulDrawer.Portal>
		</VaulDrawer.Root>
	)
}
