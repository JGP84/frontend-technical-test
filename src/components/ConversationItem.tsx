import Link from 'next/link'
import { Conversation } from '../types/conversation'

interface Props {
  conversation: Conversation
}

export default function ConversationItem({ conversation }: Props) {
  return (
    <Link href={`/conversations/${conversation.id}`} className="block p-4 border-b hover:bg-gray-100">
      <h3 className="font-semibold">{conversation.recipientNickname}</h3>
      <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
      <p className="text-xs text-gray-400">{new Date(conversation.lastMessageTimestamp).toLocaleString()}</p>
    </Link>
  )
}