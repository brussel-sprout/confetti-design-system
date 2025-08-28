import React from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '../../../utils/cn'
import type { Element } from './types'

interface ElementImageProps {
	element: Element
	layout: 'grid' | 'list'
}

export const ElementImage: React.FC<ElementImageProps> = ({ element, layout }) => {
	const [imageError, setImageError] = React.useState(false)
	const [imageLoading, setImageLoading] = React.useState(true)

	const handleImageLoad = () => {
		setImageLoading(false)
	}

	const handleImageError = () => {
		setImageError(true)
		setImageLoading(false)
	}

	const containerClasses = cn(
		'relative overflow-hidden bg-muted/30',
		layout === 'list' ? 'w-full h-full rounded-lg' : 'w-full h-full'
	)

	if (!element.image_url || imageError) {
		return (
			<div className={cn(containerClasses, 'flex items-center justify-center')}>
				<ImageIcon className="w-8 h-8 text-muted-foreground/50" />
			</div>
		)
	}

	return (
		<div className={containerClasses}>
			{imageLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-muted/30">
					<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
				</div>
			)}
			<img
				src={element.image_url}
				alt={element.element_name}
				className={cn(
					'w-full h-full object-cover transition-opacity duration-300',
					imageLoading ? 'opacity-0' : 'opacity-100'
				)}
				onLoad={handleImageLoad}
				onError={handleImageError}
				loading="lazy"
			/>
		</div>
	)
}