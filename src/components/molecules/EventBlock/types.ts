import type { SuggestionStatusType } from '../../../types/shared'

export interface TimelineEvent {
	id: string
	absoluteStart: Date
	absoluteEnd: Date
	event_name: string
	description: string
	is_suggestion: boolean
	suggestion_status: SuggestionStatusType
}
