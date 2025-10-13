export interface DrawerFooterProps {
	primaryAction: {
		label: string
		onClick: () => void | Promise<void>
		loading?: boolean
		disabled?: boolean
	}
	secondaryAction?: {
		label: string
		onClick: () => void
		disabled?: boolean
	}
	className?: string
}
