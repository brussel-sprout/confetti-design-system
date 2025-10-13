import { Edit, Save, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../../../utils/cn'

import type { EditableFieldProps } from './types'

export const EditableField = React.forwardRef<
	HTMLTextAreaElement | HTMLInputElement,
	EditableFieldProps
>(
	(
		{
			value,
			onSave,
			onCancel,
			placeholder,
			className = '',
			multiline = false,
			showEditIcon = true,
			onClick,
			forceEditing = false,
			validation,
			autoFocus = false,
		},
		ref
	) => {
		const [editValue, setEditValue] = useState(value)
		const [isEditing, setIsEditing] = useState(forceEditing)
		const [error, setError] = useState<string | null>(null)

		useEffect(() => {
			setEditValue(value)
		}, [value])

		useEffect(() => {
			setIsEditing(forceEditing)
		}, [forceEditing])

		const handleSave = () => {
			const trimmedValue = editValue.trim()

			// Run validation if provided
			if (validation) {
				const validationError = validation(trimmedValue)
				if (validationError) {
					setError(validationError)
					return
				}
			}

			// Clear error
			setError(null)

			if (trimmedValue !== value.trim()) {
				onSave(trimmedValue)
			}
			setIsEditing(false)
		}

		const handleCancel = () => {
			setEditValue(value)
			setIsEditing(false)
			setError(null)
			onCancel?.()
		}

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSave()
			} else if (e.key === 'Escape') {
				handleCancel()
			}
		}

		if (!isEditing) {
			return (
				<div
					className={cn(
						'group cursor-pointer hover:scale-101 active:scale-99 transition-transform duration-200',
						className
					)}
					onClick={() => {
						setIsEditing(true)
						onClick?.()
					}}
					data-editable="true"
				>
					{multiline ? (
						<p className="text-muted-foreground text-sm leading-relaxed group-hover:bg-muted/50 rounded p-2 transition-all duration-200">
							{value || placeholder || 'Click to add description...'}
						</p>
					) : (
						<h2 className="text-base sm:text-lg font-semibold truncate group-hover:bg-muted/50 rounded p-2 transition-all duration-200">
							{value || placeholder || 'Click to add name...'}
						</h2>
					)}
					{showEditIcon && (
						<div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1">
							<div className="animate-pulse">
								<Edit size={14} className="text-muted-foreground" />
							</div>
							<span className="text-xs text-muted-foreground">Click to edit</span>
						</div>
					)}
				</div>
			)
		}

		if (multiline) {
			return (
				<div className={cn('space-y-2 animate-fade-in-up', className)}>
					<textarea
						ref={ref as React.Ref<HTMLTextAreaElement>}
						value={editValue}
						onChange={(e) => {
							setEditValue(e.target.value)
							setError(null)
						}}
						onKeyDown={handleKeyDown}
						placeholder={placeholder || 'Enter description...'}
						className={cn(
							'w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200',
							error ? 'border-destructive' : 'border-border'
						)}
						rows={3}
						autoFocus={autoFocus}
					/>
					{error && <p className="text-xs text-destructive">{error}</p>}
					<div className="flex gap-2 animate-fade-in-up animate-delay-100">
						<button
							onClick={handleSave}
							className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-all duration-200 hover-scale flex items-center gap-1"
						>
							<Save size={14} />
							Save
						</button>
						<button
							onClick={handleCancel}
							className="px-3 py-1 bg-muted text-foreground rounded text-sm hover:bg-muted/80 transition-all duration-200 hover-scale flex items-center gap-1"
						>
							<X size={14} />
							Cancel
						</button>
					</div>
				</div>
			)
		}

		return (
			<div className={cn('space-y-2 animate-fade-in-up', className)}>
				<input
					ref={ref as React.Ref<HTMLInputElement>}
					type="text"
					value={editValue}
					onChange={(e) => {
						setEditValue(e.target.value)
						setError(null)
					}}
					onKeyDown={handleKeyDown}
					placeholder={placeholder || 'Enter name...'}
					className={cn(
						'w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover-scale',
						error ? 'border-destructive' : 'border-border'
					)}
					autoFocus={autoFocus}
				/>
				{error && <p className="text-xs text-destructive">{error}</p>}
				<div className="flex gap-2 animate-fade-in-up animate-delay-100">
					<button
						onClick={handleSave}
						className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-all duration-200 hover-scale flex items-center gap-1"
					>
						<Save size={14} />
						Save
					</button>
					<button
						onClick={handleCancel}
						className="px-3 py-1 bg-muted text-foreground rounded text-sm hover:bg-muted/80 transition-all duration-200 hover-scale flex items-center gap-1"
					>
						<X size={14} />
						Cancel
					</button>
				</div>
			</div>
		)
	}
)

EditableField.displayName = 'EditableField'

