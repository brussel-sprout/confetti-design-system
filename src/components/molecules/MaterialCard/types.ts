import type { MaterialStatus, MaterialStatusAction } from '../../../types/shared'

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
	isNew?: boolean
}

export interface MaterialCardProps {
	material: Material
	onEdit?: (material: Material) => void
	onStatusChange?: (materialId: string, status: MaterialStatusAction) => void
	variant?: 'active' | 'completed'
	className?: string
}
