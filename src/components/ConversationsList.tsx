import { useEffect, useState, useCallback } from 'react'
import { fetchConversations } from './fetchConversations'
import type { Conversation } from '../types/conversation'

export default function ConversationsList() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const handleLoadConversations = useCallback(() => {
    fetchConversations(setConversations, setLoading, setError)
  }, [])

  useEffect(() => {
    handleLoadConversations()
  }, [handleLoadConversations, retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No conversations yet</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => {
            // TODO: Navigate to conversation view
            console.log('Selected conversation:', conversation.id)
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {conversation.recipientNickname}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Last message: {new Date(conversation.lastMessageTimestamp * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}