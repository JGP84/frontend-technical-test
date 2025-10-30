import { api } from '../lib/api'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import type { Conversation } from '../types/conversation'

type SetConversations = (conversations: Conversation[]) => void
type SetLoading = (loading: boolean) => void
type SetError = (error: string | null) => void

export const fetchConversations = async (
  setConversations: SetConversations,
  setLoading: SetLoading,
  setError: SetError
): Promise<void> => {
  try {
    setLoading(true)
    setError(null)

    const userId = getLoggedUserId()
    if (userId <= 0) {
      setError('Invalid user ID')
      setLoading(false) 
      return
    }

    const result = await api.get<Conversation[]>(`/conversations/${userId}`)

    if ('error' in result) {
      setError(result.error)
    } else if (Array.isArray(result)) {
      setConversations(result)
    } else {
      setError('Invalid response format')
    }
  } catch (error) {
    setError('Failed to load conversations')
  } finally {
    setLoading(false)
  }
}