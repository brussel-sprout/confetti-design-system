export type SuggestionStatus = 'pending' | 'approved' | 'rejected'

export interface StatusDropdownProps {
	/**
	 * Current status value
	 */
	currentStatus: SuggestionStatus
	/**
	 * Callback when status changes
	 */
	onStatusChange: (status: SuggestionStatus) => void
	/**
	 * Optional className for styling
	 */
	className?: string
}
