import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MessagesList from '../../components/MessagesList'
import MessageInput from '../../components/MessageInput'
import Link from 'next/link'

const ConversationDetail: NextPage = () => {
  const { id } = useRouter().query
  const [refreshKey, setRefreshKey] = useState(0)

  if (!id) return <p>Loading...</p>

  return (
    <>
      <aside className="fixed top-16 left-0 w-64 h-full bg-white border-r md:block hidden">
        <Link href="/conversations" className="block p-4 text-blue-500 hover:bg-gray-100">
          ← Back to conversations
        </Link>
      </aside>

      <header className="fixed top-16 md:left-64 left-0 right-0 p-4 bg-white border-b">
        Conversation {id}
      </header>

      <main className="pt-32 md:ml-64">
        <MessagesList key={refreshKey} conversationId={Number(id)} />
        <MessageInput conversationId={Number(id)} onSend={() => setRefreshKey(k => k + 1)} />
      </main>
    </>
  )
}

export default ConversationDetail