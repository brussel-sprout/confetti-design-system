import type { MaterialStatus, MaterialStatusAction } from '../../../types/shared'

export interface PartyElement {
	id: string
	name: string
	description?: string
	image?: {
		url: string
	}
}

export interface Material {
	id: string
	name: string
	description?: string
	status: MaterialStatus
	image?: {
		url: string
	}
	link?: string
	elementName?: string
}

export interface MaterialGroupProps {
	element: PartyElement
	materials: Material[]
	activeCount: number
	completedCount: number
	totalCount: number
	isExpanded?: boolean
	onToggleExpanded?: () => void
	onEditMaterial: (material: Material) => void
	onStatusChange?: (materialId: string, status: MaterialStatusAction) => void
	className?: string
}
