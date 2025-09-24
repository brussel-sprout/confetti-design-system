import React from 'react'
import { 
  Wrench,
  Cake,
  Music,
  Trash2,
  Calendar,
  Circle
} from 'lucide-react'
import { cn } from '../../../utils/cn'
import { PartyEvent } from '../../../types/timeline'
import { categoryColors } from '../../../types/timeline'

interface MilestoneMarkerProps {
  event: PartyEvent
  top: number
  stackIndex: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

const milestoneIcons = {
  setup: Wrench,
  activity: Calendar,
  meal: Cake,
  entertainment: Music,
  cleanup: Trash2,
  other: Circle,
}

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  event,
  top,
  isSelected,
  onClick,
  className
}) => {
  const Icon = milestoneIcons[event.category]
  const colors = categoryColors[event.category]

  return (
    <div 
      className={cn("absolute cursor-pointer flex items-center z-30", className)} 
      style={{ top: `${top}px`, left: 0, right: 0 }} 
      onClick={onClick}
    >
      {/* Icon on the left */}
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center z-40",
        "text-primary-foreground shadow-md transition-all duration-200 ease-in-out",
        colors.marker,
        isSelected 
          ? 'ring-2 ring-primary scale-110' 
          : 'hover:scale-105'
      )}>
        <Icon size={12} />
      </div>
      
      {/* Bold horizontal line spanning full width */}
      <div 
        className={cn(
          "absolute left-3 right-0 h-1 transition-colors duration-200",
          isSelected ? 'bg-primary' : 'bg-gray-600'
        )}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
      
      {/* Details on the right */}
      <div className={cn(
        "absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md",
        "bg-background border border-border shadow-sm transition-all duration-200",
        isSelected 
          ? 'bg-primary/10 border-primary' 
          : 'hover:bg-muted/50'
      )}>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{event.title}</span>
          <span className="text-xs text-muted-foreground">{event.startTime}</span>
        </div>
      </div>
    </div>
  )
}