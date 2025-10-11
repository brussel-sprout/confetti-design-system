export interface TimelineEvent {
    id: string
    start: Date
    end?: Date
  }
  export interface TimelineConfig {
    startTime: Date
    endTime: Date
    suggestedTimeScale: '30min' | '15min' | '5min'
  }
  /**
   * Calculate optimal timeline configuration based on events
   */
  export function calculateOptimalTimelineConfig(
    events: TimelineEvent[],
  ): TimelineConfig {
    if (events.length === 0) {
      // Default: 9 AM to 5 PM with 30min increments
      const startTime = new Date()
      startTime.setHours(9, 0, 0, 0)
      const endTime = new Date()
      endTime.setHours(17, 0, 0, 0)
      return {
        startTime,
        endTime,
        suggestedTimeScale: '30min',
      }
    }
    // Find earliest and latest times
    let earliestTime = new Date(events[0].start)
    let latestTime = new Date(events[0].end || events[0].start)
    events.forEach((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end || event.start)
      if (eventStart < earliestTime) earliestTime = eventStart
      if (eventEnd > latestTime) latestTime = eventEnd
    })
    // Add padding: 30 minutes before earliest, 30 minutes after latest
    const startTime = new Date(earliestTime)
    startTime.setMinutes(startTime.getMinutes() - 30)
    const endTime = new Date(latestTime)
    endTime.setMinutes(endTime.getMinutes() + 30)
    // Round to nearest 30-minute mark for cleaner display
    startTime.setMinutes(Math.floor(startTime.getMinutes() / 30) * 30)
    endTime.setMinutes(Math.ceil(endTime.getMinutes() / 30) * 30)
    // Calculate total duration in hours
    const durationMs = endTime.getTime() - startTime.getTime()
    const durationHours = durationMs / (1000 * 60 * 60)
    // Suggest time scale based on duration
    let suggestedTimeScale: '30min' | '15min' | '5min'
    if (durationHours <= 2) {
      suggestedTimeScale = '5min' // Short events: 5-minute increments
    } else if (durationHours <= 4) {
      suggestedTimeScale = '15min' // Medium events: 15-minute increments
    } else {
      suggestedTimeScale = '30min' // Long events: 30-minute increments
    }
    return {
      startTime,
      endTime,
      suggestedTimeScale,
    }
  }
  /**
   * Format duration for display
   */
  export function formatDuration(startTime: Date, endTime: Date): string {
    const durationMs = endTime.getTime() - startTime.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    if (hours === 0) {
      return `${minutes}m`
    } else if (minutes === 0) {
      return `${hours}h`
    } else {
      return `${hours}h ${minutes}m`
    }
  }
  