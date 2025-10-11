import { z } from 'zod'

export const SuggestionStatus = z.enum(['pending', 'approved', 'rejected'])
export type SuggestionStatusType = z.infer<typeof SuggestionStatus>

// Material types
export type MaterialStatus = 'needed' | 'recommended' | 'purchased' | 'ignored'
export type MaterialStatusAction = 'needed' | 'purchased' | 'ignored'
