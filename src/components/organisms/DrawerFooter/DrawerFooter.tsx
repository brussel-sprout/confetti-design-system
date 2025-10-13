import React from 'react'

import { cn } from '../../../utils/cn'
import { Button } from '../../atoms/Button'

import type { DrawerFooterProps } from './types'

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
	onCancel,
	onSave,
	onPrimaryAction,
	primaryLabel = 'Save',
	cancelLabel = 'Cancel',
	showCancel = true,
	showSave = true,
	isLoading = false,
	isSaving = false,
	disabled = false,
	className,
	children,
}) => {
	const handlePrimaryAction = () => {
		if (onPrimaryAction) {
			onPrimaryAction()
		} else if (onSave) {
			onSave()
		}
	}

	return (
		<div className={cn('bg-background border-t border-border/30 p-4 flex-shrink-0', className)}>
			{children ? (
				children
			) : (
				<div className="flex flex-col sm:flex-row gap-3">
					{showCancel && (
						<Button
							variant="secondary"
							size="md"
							onClick={onCancel}
							disabled={isLoading || isSaving}
							className="order-2 sm:order-1 w-full sm:w-auto rounded-lg"
						>
							{cancelLabel}
						</Button>
					)}
					{showSave && (onSave || onPrimaryAction) && (
						<Button
							variant="default"
							size="md"
							onClick={handlePrimaryAction}
							disabled={disabled || isLoading || isSaving}
							loading={isSaving}
							className="order-1 sm:order-2 w-full sm:w-auto rounded-lg"
						>
							{primaryLabel}
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

