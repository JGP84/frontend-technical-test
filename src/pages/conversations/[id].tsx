import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ConversationDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Conversation Detail</h1>
      <p>Conversation ID: {id}</p>
      <p>Messages will be implemented here.</p>
    </div>
  )
}

export default ConversationDetail