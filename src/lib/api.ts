export let API_URL = 'http://localhost:3005'

export type ApiResponse<T> = T | { error: string }

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_URL}${endpoint}`)
      if (!res.ok) {
        return { error: `HTTP ${res.status}: ${res.statusText}` }
      }
      return res.json()
    } catch (error) {
      return { error: 'Network error - please check connection' }
    }
  },

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        return { error: `HTTP ${res.status}: ${res.statusText}` }
      }
      return res.json()
    } catch (error) {
      return { error: 'Network error - please check connection' }
    }
  }
}