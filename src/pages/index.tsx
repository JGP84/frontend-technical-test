import type { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            🎉 Tailwind CSS Works!
          </h1>
        </div>
        <div className="p-8">
          <div className="text-center">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              ✅ Success
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Hello World!
            </h2>
            <p className="text-gray-600 mb-6">
              Tailwind CSS is properly configured and working. You can see the beautiful styling applied to this card.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}