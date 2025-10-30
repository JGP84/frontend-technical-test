import { useState, type ReactElement } from 'react'
import ConversationsList from '../components/ConversationsList'
import ConversationView from '../components/ConversationView'
import type { Conversation } from '../types/conversation'

export default function Home(): ReactElement {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
  }

  const handleBackToConversations = () => {
    setSelectedConversation(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Leboncoin Messages</h1>
        </header>
        <main className="min-h-screen">
          {selectedConversation ? (
            <ConversationView
              conversationId={selectedConversation.id}
              recipientNickname={selectedConversation.recipientNickname}
              onBack={handleBackToConversations}
            />
          ) : (
            <ConversationsList onSelectConversation={handleSelectConversation} />
          )}
        </main>
      </div>
    </div>
  )
}