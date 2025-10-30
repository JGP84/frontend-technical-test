import type { ReactElement } from 'react'
import ConversationsList from '../components/ConversationsList'

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Leboncoin Messages</h1>
        </header>
        <main>
          <ConversationsList />
        </main>
      </div>
    </div>
  )
}