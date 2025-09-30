import { Message } from '../types/message'

interface Props {
  message: Message
  isOwn: boolean
}

export default function MessageBubble({ message, isOwn }: Props) {
  return (
    <div className={`mb-2 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
        <p>{message.body}</p>
        <p className="text-xs opacity-75 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
      </div>
    </div>
  )
}