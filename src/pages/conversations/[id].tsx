import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import MessagesList from '../../components/MessagesList'
import Link from 'next/link'

const ConversationDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <p>Loading...</p>

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <Link href="/conversations" className="block p-4 text-blue-500 hover:bg-gray-100">
          ← Back to conversations
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <h1 className="p-4 border-b text-xl font-bold">Conversation {id}</h1>
        <MessagesList conversationId={Number(id)} />
      </div>
    </div>
  )
}

export default ConversationDetail