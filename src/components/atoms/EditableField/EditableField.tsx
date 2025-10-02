import { Edit, Save, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../../../utils/cn'

export interface EditableFieldProps {
	value: string
	onSave: (value: string) => void
	onCancel: () => void
	placeholder?: string
	className?: string
	multiline?: boolean
	minLength?: number
}

const EditableField: React.FC<EditableFieldProps> = ({
	value,
	onSave,
	onCancel,
	placeholder,
	className = '',
	multiline = false,
	minLength = 2,
}) => {
	const [editValue, setEditValue] = useState(value)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		setEditValue(value)
	}, [value])

	const handleSave = () => {
		const trimmedValue = editValue.trim()

		// Validation: ensure minimum length requirements
		if (trimmedValue.length < minLength) {
			alert(`${multiline ? 'Description' : 'Name'} must be at least ${minLength} characters long`)
			return
		}

		if (trimmedValue !== value.trim()) {
			onSave(trimmedValue)
		}
		setIsEditing(false)
	}

	const handleCancel = () => {
		setEditValue(value)
		setIsEditing(false)
		onCancel()
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (multiline) {
			if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				handleSave()
			} else if (e.key === 'Escape') {
				handleCancel()
			}
		} else {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSave()
			} else if (e.key === 'Escape') {
				handleCancel()
			}
		}
	}

	if (!isEditing) {
		return (
			<div
				className={cn(
					'group cursor-pointer hover:bg-muted/50 rounded p-2 transition-colors',
					className
				)}
				onClick={() => setIsEditing(true)}
				data-editable="true"
			>
				{multiline ? (
					<p className="text-muted-foreground text-sm leading-relaxed">
						{value || placeholder || 'Click to add description...'}
					</p>
				) : (
					<h2 className="text-base sm:text-lg font-semibold truncate">
						{value || placeholder || 'Click to add name...'}
					</h2>
				)}
				<div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
					<Edit size={14} className="text-muted-foreground" />
					<span className="text-xs text-muted-foreground">Click to edit</span>
				</div>
			</div>
		)
	}

	if (multiline) {
		return (
			<div className={cn('space-y-2', className)}>
				<textarea
					value={editValue}
					onChange={(e) => setEditValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder || 'Enter description...'}
					className="w-full p-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
					rows={3}
					autoFocus
				/>
				<div className="flex gap-2">
					<button
						onClick={handleSave}
						className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
					>
						<Save size={14} />
						Save
					</button>
					<button
						onClick={handleCancel}
						className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-foreground rounded text-sm hover:bg-muted/80 transition-colors"
					>
						<X size={14} />
						Cancel
					</button>
				</div>
				<div className="text-xs text-muted-foreground">
					Press Cmd+Enter to save, Escape to cancel
				</div>
			</div>
		)
	}

	return (
		<div className={cn('space-y-2', className)}>
			<input
				type="text"
				value={editValue}
				onChange={(e) => setEditValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder || 'Enter name...'}
				className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
				autoFocus
			/>
			<div className="flex gap-2">
				<button
					onClick={handleSave}
					className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors"
				>
					<Save size={14} />
					Save
				</button>
				<button
					onClick={handleCancel}
					className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-foreground rounded text-sm hover:bg-muted/80 transition-colors"
				>
					<X size={14} />
					Cancel
				</button>
			</div>
			<div className="text-xs text-muted-foreground">Press Enter to save, Escape to cancel</div>
		</div>
	)
}

EditableField.displayName = 'EditableField'

export { EditableField }
