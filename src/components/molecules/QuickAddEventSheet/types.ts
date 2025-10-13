export interface QuickAddEventSheetProps {
	isOpen: boolean
	onClose: () => void
	startTime: Date
	endTime: Date
	onSave: (eventName: string) => Promise<void>
	onOpenFullDetails: (eventName: string) => void
	onPreviewChange?: (eventName: string) => void
	position?: { x: number; y: number }
}
