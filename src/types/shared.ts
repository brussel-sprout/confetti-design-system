import { z } from 'zod'

export const SuggestionStatus = z.enum(['pending', 'approved', 'rejected'])
export type SuggestionStatusType = z.infer<typeof SuggestionStatus>

