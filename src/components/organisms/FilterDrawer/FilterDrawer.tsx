import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../../../utils/cn'
import { Drawer } from '../../atoms/Drawer'
import { DrawerFooter } from '../DrawerFooter'
import { DrawerHeader } from '../DrawerHeader'

import type { FilterDrawerProps } from './types'

// Inline useMediaQuery hook
const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		media.addEventListener('change', listener)
		return () => media.removeEventListener('change', listener)
	}, [matches, query])

	return matches
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
	isOpen,
	onClose,
	title = 'Filters',
	activeFiltersCount = 0,
	children,
	onApplyFilters,
	onResetFilters,
	applyLabel = 'Apply Filters',
	resetLabel = 'Reset Filters',
	showApplyButton = true,
	showResetButton = true,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const handleApply = () => {
		if (onApplyFilters) {
			onApplyFilters()
		}
		onClose()
	}

	const handleReset = () => {
		if (onResetFilters) {
			onResetFilters()
		}
	}

	const headerTitle = (
		<div className="flex items-center gap-2">
			<Filter size={20} className="text-primary" />
			<span>{title}</span>
		</div>
	)

	const titleContent = activeFiltersCount > 0 && (
		<div className="flex items-center gap-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
			{activeFiltersCount}
		</div>
	)

	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			direction={isDesktop ? 'right' : 'bottom'}
			width={isDesktop ? 'lg' : 'full'}
			showCloseButton={false}
			closeOnOverlayClick={true}
			closeOnEscape={true}
			showMobileHandle={!isDesktop}
			contentClassName={isDesktop ? 'w-[500px]' : 'rounded-t-[10px] h-[96%] mt-24'}
			className="p-0 flex flex-col"
		>
			{/* Header */}
			<DrawerHeader
				title={headerTitle}
				onClose={onClose}
				className="border-b border-border"
				titleContent={titleContent}
			/>

			{/* Content */}
			<div className="p-4 flex flex-col flex-1 overflow-y-auto">{children}</div>

			{/* Footer */}
			<DrawerFooter onCancel={onClose} showSave={false} showCancel={false}>
				<div className="flex flex-col sm:flex-row gap-3 w-full">
					{showResetButton && onResetFilters && (
						<button
							onClick={handleReset}
							className={cn(
								'px-4 py-2 border border-border rounded-lg',
								'hover:bg-muted transition-colors text-sm font-medium',
								'order-2 sm:order-1 w-full sm:w-auto mobile-touch-target'
							)}
						>
							{resetLabel}
						</button>
					)}
					{showApplyButton && (
						<button
							onClick={handleApply}
							className={cn(
								'px-4 py-2 bg-primary text-primary-foreground rounded-lg',
								'hover:bg-primary/90 transition-colors text-sm font-medium',
								'order-1 sm:order-2 flex-1 sm:flex-1 mobile-touch-target'
							)}
						>
							{applyLabel}
						</button>
					)}
				</div>
			</DrawerFooter>
		</Drawer>
	)
}
