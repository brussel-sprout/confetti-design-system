export interface PartyEvent {
  id: string
  title: string
  description?: string
  startTime: string // HH:mm format
  endTime?: string // HH:mm format - optional for milestone events
  eventType: 'duration' | 'milestone'
  category: 'setup' | 'activity' | 'meal' | 'entertainment' | 'cleanup' | 'other'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTasks?: string[]
  relatedElements?: string[]
  color?: string
  assignedTo?: string[]
  location?: string
  attendees?: number
  notes?: string
}

export interface TimelinePosition {
  top: number
  height: number
  stackIndex: number
}

export interface OverlapGroup {
  events: InternalEvent[]
  startTime: Date
  endTime: Date
}

export interface InternalEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime?: Date
  eventType: 'duration' | 'milestone'
  category: 'setup' | 'activity' | 'meal' | 'entertainment' | 'cleanup' | 'other'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTasks?: string[]
  relatedElements?: string[]
  color?: string
  assignedTo?: string[]
  location?: string
  attendees?: number
  notes?: string
}

export type TimeScale = '30min' | '15min' | '5min'

export const categoryIcons = {
  setup: 'Wrench',
  activity: 'Calendar',
  meal: 'Utensils',
  entertainment: 'Music',
  cleanup: 'Broom',
  other: 'Circle'
} as const

export const categoryColors = {
  setup: {
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-800',
    marker: 'bg-orange-500'
  },
  activity: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800',
    marker: 'bg-blue-500'
  },
  meal: {
    bg: 'bg-pink-100',
    border: 'border-pink-300',
    text: 'text-pink-800',
    marker: 'bg-pink-500'
  },
  entertainment: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-800',
    marker: 'bg-purple-500'
  },
  cleanup: {
    bg: 'bg-green-100',
    border: 'border-green-300',
    text: 'text-green-800',
    marker: 'bg-green-500'
  },
  other: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-800',
    marker: 'bg-gray-500'
  }
} as const

export const priorityBorders = {
  low: 'border-l-2',
  medium: 'border-l-4',
  high: 'border-l-6',
  critical: 'border-l-8'
} as const

export const milestoneIcons = {
  setup: 'Settings',
  activity: 'Play',
  meal: 'Cake',
  entertainment: 'Star',
  cleanup: 'CheckCircle',
  other: 'MapPin'
} as const