import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'

export const loggedUserId = getLoggedUserId()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Leboncoin Messages</h1>
      </header>
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
