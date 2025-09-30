import { useState, useEffect } from 'react'
import { Message } from '../types/message'
import MessageBubble from './MessageBubble'
import { getLoggedUserId } from '../utils/getLoggedUserId'

interface Props {
  conversationId: number
}

export default function MessagesList({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const userId = getLoggedUserId()

  useEffect(() => {
    fetch(`http://localhost:3005/messages?conversationId=${conversationId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load messages')
        return res.json()
      })
      .then(data => {
        setMessages(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [conversationId])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    alert(error)
    return <p className="p-4 text-red-500">Error loading messages</p>
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} isOwn={message.authorId === userId} />
      ))}
    </div>
  )
}