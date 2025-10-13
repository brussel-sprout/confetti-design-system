import React, { useState } from 'react'

import { cn } from '../../../utils/cn'

import type { StatusDropdownProps } from './types'

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
	currentStatus,
	onStatusChange,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const statuses: Array<'pending' | 'approved' | 'rejected'> = ['pending', 'approved', 'rejected']

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'approved':
				return 'bg-green-100 text-green-800 border-green-200'
			case 'rejected':
				return 'bg-red-100 text-red-800 border-red-200'
			default:
				return 'bg-yellow-100 text-yellow-800 border-yellow-200'
		}
	}

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'approved':
				return 'Approved'
			case 'rejected':
				return 'Rejected'
			default:
				return 'Pending'
		}
	}

	return (
		<div className={cn('relative', className)}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover-scale',
					getStatusColor(currentStatus)
				)}
			>
				{getStatusLabel(currentStatus)}
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-xl z-10 min-w-[120px] overflow-hidden animate-fade-in-up">
					{statuses.map((status, index) => (
						<button
							key={status}
							onClick={() => {
								onStatusChange(status)
								setIsOpen(false)
							}}
							className={cn(
								'w-full text-left px-3 py-2 text-sm hover:bg-muted transition-all duration-200 first:rounded-t-lg last:rounded-b-lg hover-scale animate-fade-in-up',
								getStatusColor(status)
							)}
							style={{ animationDelay: `${index * 0.05}s` }}
						>
							{getStatusLabel(status)}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
