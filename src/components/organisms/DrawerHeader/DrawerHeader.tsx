import { Copy, Trash2, X as XIcon } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '../../../utils/cn'

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
				'flex items-center justify-between p-4 border-b border-border flex-shrink-0',
				className
			)}
		>
			<div className="flex items-center gap-3 flex-1 min-w-0">
				<h2 className="text-lg font-semibold text-foreground">{title}</h2>
				{titleContent}
			</div>
			<div className="flex items-center gap-2">
				{/* Duplicate Button */}
				{showDuplicate && onDuplicate && (
					<button
						type="button"
						onClick={onDuplicate}
						disabled={isDuplicating}
						className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 mobile-touch-target flex items-center justify-center"
						aria-label="Duplicate"
					>
						<Copy className="w-4 h-4 text-muted-foreground" />
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
								className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 mobile-touch-target flex items-center justify-center"
								aria-label="Delete"
							>
								<Trash2 className="w-4 h-4 text-muted-foreground" />
							</button>
						)}
					</>
				)}
				{/* Close Button */}
				{showCloseButton && (
					<button
						onClick={onClose}
						className="p-2 hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 mobile-touch-target flex items-center justify-center"
						aria-label="Close drawer"
					>
						<XIcon size={16} />
					</button>
				)}
			</div>
		</div>
	)
}
