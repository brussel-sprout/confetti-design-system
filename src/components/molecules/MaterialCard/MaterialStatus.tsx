import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../utils/cn'

export interface MaterialStatusProps {
	status: 'needed' | 'recommended' | 'purchased' | 'ignored'
	className?: string
}

const statusConfig = {
	needed: {
		icon: AlertTriangle,
		color: 'text-powder-blue-600',
		ariaLabel: 'Needed',
	},
	recommended: {
		icon: Info,
		color: 'text-cream-600',
		ariaLabel: 'Recommended',
	},
	purchased: {
		icon: CheckCircle,
		color: 'text-blush-600',
		ariaLabel: 'Purchased',
	},
	ignored: {
		icon: XCircle,
		color: 'text-muted-foreground',
		ariaLabel: 'Ignored',
	},
} as const

export const MaterialStatus = React.forwardRef<HTMLDivElement, MaterialStatusProps>(
	({ status, className, ...props }, ref) => {
		const config = statusConfig[status]
		const IconComponent = config.icon

		return (
			<div ref={ref} className={cn('flex-shrink-0', className)} {...props}>
				<IconComponent
					size={16}
					className={cn('transition-colors', config.color)}
					aria-label={config.ariaLabel}
				/>
			</div>
		)
	}
)

MaterialStatus.displayName = 'MaterialStatus'
