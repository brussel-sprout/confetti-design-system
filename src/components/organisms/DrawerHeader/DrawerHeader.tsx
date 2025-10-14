import { Copy, Trash2, X as XIcon } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '../../../utils/cn'
import { EditableTextField } from '../EditableField/EditableTextField'

import type { DrawerHeaderProps } from './types'

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
	title,
	onClose,
	showDelete = false,
	onDelete,
	isDeleting = false,
	showCloseButton = true,
	showDuplicate = false,
	onDuplicate,
	isDuplicating = false,
	className,
	titleContent,
	prefixContent,
	isEditable = false,
	onTitleChange,
	titlePlaceholder = 'Enter title...',
	maxTitleLength = 100,
	variant = 'default',
}) => {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

	const handleDelete = async () => {
		if (onDelete) {
			await onDelete()
			setShowDeleteConfirm(false)
		}
	}

	return (
		<div
			className={cn(
				'flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0',
				className
			)}
		>
			<div className="flex items-center gap-3 flex-1 min-w-0">
				{prefixContent}
				{isEditable && onTitleChange ? (
					<div className="flex-1 min-w-0">
						<EditableTextField
							value={typeof title === 'string' ? title : ''}
							onSave={onTitleChange}
							placeholder={titlePlaceholder}
							maxLength={maxTitleLength}
							className={cn(
								'text-lg font-semibold transition-all duration-200',
								variant === 'completed' && 'line-through text-muted-foreground'
							)}
						/>
					</div>
				) : (
					<h2
						className={cn(
							'text-lg font-semibold text-foreground transition-all duration-200',
							variant === 'completed' && 'line-through text-muted-foreground'
						)}
					>
						{title}
					</h2>
				)}
				{titleContent}
			</div>
			<div className="flex items-center gap-2">
				{/* Duplicate Button */}
				{showDuplicate && onDuplicate && (
					<button
						type="button"
						onClick={onDuplicate}
						disabled={isDuplicating}
						className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted mobile-touch-target"
						aria-label="Duplicate"
					>
						<Copy className="w-5 h-5" />
					</button>
				)}
				{/* Delete Button (with inline confirmation) */}
				{showDelete && onDelete && (
					<>
						{showDeleteConfirm ? (
							<>
								<span className="text-sm text-muted-foreground">Delete?</span>
								<button
									type="button"
									onClick={() => setShowDeleteConfirm(false)}
									disabled={isDeleting}
									className="py-1.5 px-3 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium mobile-touch-target"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleDelete}
									disabled={isDeleting}
									className="py-1.5 px-3 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors text-sm font-medium disabled:opacity-50 mobile-touch-target"
								>
									{isDeleting ? 'Deleting...' : 'Delete'}
								</button>
							</>
						) : (
							<button
								type="button"
								onClick={() => setShowDeleteConfirm(true)}
								className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-muted mobile-touch-target"
								aria-label="Delete"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						)}
					</>
				)}
				{/* Close Button */}
				{showCloseButton && (
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted mobile-touch-target"
						aria-label="Close"
					>
						<XIcon size={20} />
					</button>
				)}
			</div>
		</div>
	)
}
