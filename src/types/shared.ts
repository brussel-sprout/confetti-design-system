import { z } from 'zod'

export const SuggestionStatus = z.enum(['pending', 'approved', 'rejected'])
export type SuggestionStatusType = z.infer<typeof SuggestionStatus>

// Material types
export type MaterialStatus = 'needed' | 'recommended' | 'purchased' | 'ignored'
export type MaterialStatusAction = 'needed' | 'purchased' | 'ignored'

// Event types
export type EventMode = 'create' | 'edit'

export interface EventData {
	party_event_id: string
	event_name: string
	description: string | null
	absoluteStart: Date
	absoluteEnd: Date
	is_suggestion?: boolean
	suggestion_status?: SuggestionStatusType
}

export interface ConnectedElement {
	party_element_id: string
	element_name: string
	image?: { image_url: string } | null
}
