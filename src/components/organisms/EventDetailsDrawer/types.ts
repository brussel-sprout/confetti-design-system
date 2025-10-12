import type { ConnectedElement, EventData, EventMode } from '../../../types/shared'

export interface EventDetailsDrawerProps {
	isOpen: boolean
	onClose: () => void
	mode: EventMode
	partyId: string

	// Event data (undefined for create mode)
	event?: EventData

	// Initial start time for create mode (optional)
	initialStartTime?: Date

	// Connected elements (for display and navigation)
	connectedElements?: ConnectedElement[]

	// Callbacks
	onSave: (data: {
		event_name: string
		description: string | null
		absoluteStart: Date
		absoluteEnd: Date
	}) => Promise<void>

	onDelete?: () => Promise<void>
	onNavigateToElement?: (elementId: string) => void
}

export interface EventFormData {
	event_name: string
	description: string
	startDate: string // YYYY-MM-DD
	startTime: string // HH:MM
	endDate: string // YYYY-MM-DD
	endTime: string // HH:MM
}

export interface ValidationErrors {
	event_name?: string
	description?: string
	startDateTime?: string
	endDateTime?: string
}
