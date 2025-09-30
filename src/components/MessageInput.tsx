import { useState } from 'react'
import { getLoggedUserId } from '../utils/getLoggedUserId'

interface Props {
  conversationId: number
  onSend: () => void
}

export default function MessageInput({ conversationId, onSend }: Props) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const userId = getLoggedUserId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3005/messages/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: text.trim(),
          timestamp: Date.now()
        })
      })

      if (!response.ok) throw new Error('Failed to send message')

      setText('')
      onSend() // Refetch messages
    } catch (err) {
      alert('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex space-x-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded resize-none"
          rows={2}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  )
}