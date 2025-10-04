import { Calendar, Star } from 'lucide-react'
import React from 'react'

import { cn } from '../../../utils/cn'

export interface DetailsGridProps {
	dueDate?: Date | null
	importanceLevel?: 1 | 2 | 3
	onUpdateDueDate?: (date: Date | null) => void
	onUpdateImportance?: (level: 1 | 2 | 3) => void
	className?: string
}

const DetailsGrid: React.FC<DetailsGridProps> = ({
	dueDate,
	importanceLevel,
	onUpdateDueDate,
	onUpdateImportance,
	className = '',
}) => {
	return (
		<div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-3', className)}>
			<div className="flex items-center gap-2">
				<Calendar size={16} className="text-blue-600 flex-shrink-0" />
				<input
					type="date"
					className="flex-1 text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0"
					value={dueDate ? new Date(dueDate).toISOString().slice(0, 10) : ''}
					onChange={(e) => {
						const value = e.target.value
						onUpdateDueDate?.(value ? new Date(value) : null)
					}}
				/>
			</div>
			<div className="flex items-center gap-2">
				<Star size={16} className="text-yellow-600 flex-shrink-0" />
				<select
					className="flex-1 text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0"
					value={importanceLevel || 2}
					onChange={(e) => {
						onUpdateImportance?.(Number(e.target.value) as 1 | 2 | 3)
					}}
				>
					<option value={1}>High</option>
					<option value={2}>Medium</option>
					<option value={3}>Low</option>
				</select>
			</div>
		</div>
	)
}

DetailsGrid.displayName = 'DetailsGrid'

export { DetailsGrid }
