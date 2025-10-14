// Connected Elements Section
export interface ConnectedElementsSectionProps {
	elements: Array<{
		party_element_id: string
		element_name: string
		image?: {
			image_url: string
		} | null
	}>
	onNavigateToElement?: (elementId: string) => void
	className?: string
}

// Connected Tasks Section
export interface ConnectedTasksSectionProps {
	tasks: Array<{
		party_task_id: string
		party_task_name: string
		completed_on: Date | null
		due_date?: Date | null
		importance_level?: 1 | 2 | 3
	}>
	onNavigateToTask?: (taskId: string) => void
	className?: string
}

// Connected Materials Section
export interface ConnectedMaterialsSectionProps {
	materials: Array<{
		party_element_material_id: string
		party_element_material_name: string
		status: 'purchased' | 'needed' | 'not_needed' | 'recommended' | 'ignored'
		link?: string | null
		image?: {
			image_url: string
		} | null
		description?: string | null
	}>
	onNavigateToMaterial?: (materialId: string) => void
	className?: string
}

// Connected Events Section
export interface ConnectedEventsSectionProps {
	events: Array<{
		party_event_id: string
		event_name: string
		absoluteStart: Date
		absoluteEnd: Date
	}>
	onNavigateToEvent?: (eventId: string) => void
	className?: string
}
