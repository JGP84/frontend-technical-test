import { useState, useEffect } from 'react'
import { Conversation } from '../types/conversation'
import ConversationItem from './ConversationItem'

export default function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/conversations')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load conversations')
        return res.json()
      })
      .then(data => {
        setConversations(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    alert(error)
    return <p className="p-4 text-red-500">Error loading conversations</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 p-4">Conversations</h1>
      <div className="space-y-0">
        {conversations.map(conversation => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  )
}