import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MessagesList from '../../components/MessagesList'
import MessageInput from '../../components/MessageInput'
import Link from 'next/link'

const ConversationDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [refreshKey, setRefreshKey] = useState(0)

  if (!id) return <p>Loading...</p>

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 border-r bg-white">
        <Link href="/conversations" className="block p-4 text-blue-500 hover:bg-gray-100">
          ← Back to conversations
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="p-4 border-b text-xl font-bold bg-white">Conversation {id}</h1>
        <MessagesList key={refreshKey} conversationId={Number(id)} />
        <MessageInput conversationId={Number(id)} onSend={() => setRefreshKey(prev => prev + 1)} />
      </div>
    </div>
  )
}

export default ConversationDetail