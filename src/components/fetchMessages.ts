import { api } from '../lib/api'
import type { Message } from '../types/message'

type SetMessages = (messages: Message[]) => void
type SetLoading = (loading: boolean) => void
type SetError = (error: string | null) => void

export const fetchMessages = async (
  conversationId: number,
  setMessages: SetMessages,
  setLoading: SetLoading,
  setError: SetError
): Promise<void> => {
  try {
    setLoading(true)
    setError(null)

    if (conversationId <= 0) {
      setError('Invalid conversation ID')
      return
    }

    const result = await api.get<Message[]>(`/messages/${conversationId}`)

    if ('error' in result) {
      setError(result.error)
      return
    }

    if (Array.isArray(result)) {
      setMessages(result)
      return
    }

    setError('Invalid response format: expected an array of messages')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    setError(`Failed to load messages: ${errorMessage}`)
  } finally {
    setLoading(false)
  }
}