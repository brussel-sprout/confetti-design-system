// SuggestionData extends the same structure as ElementData (which extends PublicPartyElement)
export interface SuggestionData {
	party_element_id: string
	created_on: Date
	description: string | null
	element_name: string
	is_suggestion: boolean
	suggestion_status: 'pending' | 'approved' | 'rejected'
	image: {
		image_id: string
		description: string | null
		image_url: string
		name: string | null
		created_on: Date
	} | null
	materials: Array<{
		created_on: Date
		description: string | null
		link: string | null
		party_element_material_name: string
		party_element_material_id: string
		status: 'needed' | 'recommended' | 'purchased' | 'ignored'
	}>
	category?: string
}
