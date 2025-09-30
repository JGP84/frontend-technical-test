import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import Image from 'next/image'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/assets/lbc-logo.webp" alt="Leboncoin" width={40} height={40} />
          <h1 className="ml-2 text-xl font-bold">Leboncoin Messages</h1>
        </div>
      </header>
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
