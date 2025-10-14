import type React from 'react'

export interface ConnectedItem {
	id: string
	name: string
	image?: {
		image_url: string
	} | null
	[key: string]: unknown
}

export interface ConnectedItemsSectionProps {
	items: ConnectedItem[]
	title: string
	onItemClick: (itemId: string) => void
	icon?: React.ReactNode
	emptyMessage?: string
	className?: string
}
