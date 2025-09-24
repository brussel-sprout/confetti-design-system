import type { PartyEvent, InternalEvent, TimelinePosition, OverlapGroup } from '../types/timeline'

/**
 * Converts a time string in HH:mm format to a Date object
 * Uses today's date with the specified time
 */
export function createDateFromTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

/**
 * Transforms PartyEvent objects into InternalEvent format with Date objects
 * for easier time calculations
 */
export function convertToInternalEvent(event: PartyEvent): InternalEvent {
  return {
    ...event,
    startTime: createDateFromTimeString(event.startTime),
    endTime: event.endTime ? createDateFromTimeString(event.endTime) : undefined
  }
}

/**
 * Checks if two time ranges overlap
 */
function timeRangesOverlap(
  start1: Date,
  end1: Date | undefined,
  start2: Date,
  end2: Date | undefined
): boolean {
  // For milestone events (no end time), use the start time as both start and end
  const actualEnd1 = end1 || start1
  const actualEnd2 = end2 || start2
  
  return start1 < actualEnd2 && actualEnd1 > start2
}

/**
 * Groups events that overlap in time for horizontal stacking
 */
export function findOverlapGroups(events: InternalEvent[]): OverlapGroup[] {
  const groups: OverlapGroup[] = []
  const processed = new Set<string>()
  
  for (const event of events) {
    if (processed.has(event.id)) continue
    
    const group: OverlapGroup = {
      events: [event],
      startTime: event.startTime,
      endTime: event.endTime || event.startTime
    }
    
    processed.add(event.id)
    
    // Find all overlapping events
    for (const otherEvent of events) {
      if (processed.has(otherEvent.id)) continue
      
      if (timeRangesOverlap(
        group.startTime,
        group.endTime,
        otherEvent.startTime,
        otherEvent.endTime || otherEvent.startTime
      )) {
        group.events.push(otherEvent)
        processed.add(otherEvent.id)
        
        // Update group time range
        if (otherEvent.startTime < group.startTime) {
          group.startTime = otherEvent.startTime
        }
        const otherEndTime = otherEvent.endTime || otherEvent.startTime
        if (otherEndTime > group.endTime) {
          group.endTime = otherEndTime
        }
      }
    }
    
    groups.push(group)
  }
  
  return groups
}

/**
 * Calculates positioning for events on the timeline
 * Returns a map of event ID to position data
 */
export function calculateEventPositions(
  events: PartyEvent[],
  timeScale: '30min' | '15min' | '5min' = '30min',
  startTime: string = '09:00',
  endTime: string = '23:00'
): Map<string, TimelinePosition> {
  const positions = new Map<string, TimelinePosition>()
  
  if (events.length === 0) return positions
  
  // Convert to internal events for easier date math
  const internalEvents = events.map(convertToInternalEvent)
  
  // Use the provided startTime as reference point for positioning
  const referenceTime = createDateFromTimeString(startTime)
  
  // Calculate pixels per minute based on time scale
  const pixelsPerMinute = timeScale === '5min' ? 4 : timeScale === '15min' ? 2 : 1
  
  // Find overlap groups for horizontal stacking
  const overlapGroups = findOverlapGroups(internalEvents)
  
  // Calculate positions for each event
  for (const group of overlapGroups) {
    group.events.forEach((event, stackIndex) => {
      // Calculate vertical position (top) relative to startTime
      const minutesFromStart = (event.startTime.getTime() - referenceTime.getTime()) / (1000 * 60)
      const top = Math.max(0, minutesFromStart * pixelsPerMinute) // Clamp to prevent negative positions
      
      // Calculate height for duration events
      let height = 0
      if (event.eventType === 'duration' && event.endTime) {
        const durationMinutes = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)
        height = Math.max(durationMinutes * pixelsPerMinute, 30) // Minimum height of 30px
      } else {
        height = 24 // Fixed height for milestone events
      }
      
      positions.set(event.id, {
        top,
        height,
        stackIndex
      })
    })
  }
  
  return positions
}

/**
 * Formats a time string for display
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Calculates the duration between two times
 */
export function calculateDuration(startTime: string, endTime: string): string {
  const start = createDateFromTimeString(startTime)
  const end = createDateFromTimeString(endTime)
  
  const durationMs = end.getTime() - start.getTime()
  const minutes = Math.floor(durationMs / (1000 * 60))
  
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours} hr`
  }
  
  return `${hours} hr ${remainingMinutes} min`
}

/**
 * Generates time slots for the timeline axis
 */
export function generateTimeSlots(
  startTime: string = '09:00',
  endTime: string = '23:00',
  interval: number = 30
): string[] {
  const slots: string[] = []
  const start = createDateFromTimeString(startTime)
  const end = createDateFromTimeString(endTime)
  
  const current = new Date(start)
  
  while (current <= end) {
    const hours = current.getHours().toString().padStart(2, '0')
    const minutes = current.getMinutes().toString().padStart(2, '0')
    slots.push(`${hours}:${minutes}`)
    
    current.setMinutes(current.getMinutes() + interval)
  }
  
  return slots
}

/**
 * Gets the default color for a category
 */
export function getDefaultCategoryColor(category: PartyEvent['category']): string {
  const colors = {
    setup: '#fb923c',
    activity: '#3b82f6',
    meal: '#ec4899',
    entertainment: '#8b5cf6',
    cleanup: '#10b981',
    other: '#6b7280'
  }
  
  return colors[category]
}