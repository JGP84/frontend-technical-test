import { useEffect, useState, useCallback } from 'react'
import { fetchMessages } from './fetchMessages'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import type { Message } from '../types/message'

interface ConversationViewProps {
  conversationId: number
  recipientNickname: string
  onBack: () => void
}

export default function ConversationView({
  conversationId,
  recipientNickname,
  onBack
}: ConversationViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const currentUserId = getLoggedUserId()

  const handleLoadMessages = useCallback(() => {
    fetchMessages(conversationId, setMessages, setLoading, setError)
  }, [conversationId])

  useEffect(() => {
    handleLoadMessages()
  }, [handleLoadMessages, retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to conversations
          </button>
          <h2 className="text-lg font-semibold mt-2">{recipientNickname}</h2>
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to conversations
          </button>
          <h2 className="text-lg font-semibold mt-2">{recipientNickname}</h2>
        </div>
        <div className="flex-1 p-4">
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
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to conversations
        </button>
        <h2 className="text-lg font-semibold mt-2">{recipientNickname}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.authorId === currentUserId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.authorId === currentUserId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.body}</p>
                <p className="text-xs mt-1 opacity-75">
                  {new Date(message.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}