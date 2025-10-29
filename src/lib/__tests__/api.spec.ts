import { api } from '../api'

describe('API client', () => {
  it('should handle successful GET request', async () => {
    const result = await api.get('/users')
    expect(result).not.toHaveProperty('error')
    expect(Array.isArray(result)).toBe(true)
  })

  it('should handle HTTP error', async () => {
    const result = await api.get('/notfound')
    expect(result).toHaveProperty('error')
    expect((result as any).error).toBe('HTTP 404: Not Found')
  })

  it('should handle network error', async () => {
    // Mock fetch to simulate network error
    const originalFetch = global.fetch
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')))

    const result = await api.get('/test')
    expect(result).toHaveProperty('error')
    expect((result as any).error).toBe('Network error - please check connection')

    global.fetch = originalFetch
  })

  it('should handle successful POST request', async () => {
    const testData = { nickname: 'TestUser', token: 'test123' }
    const result = await api.post('/users', testData)
    expect(result).not.toHaveProperty('error')
    expect(result).toHaveProperty('id')
    expect((result as any).nickname).toBe(testData.nickname)
    expect((result as any).token).toBe(testData.token)
  })

  it('should handle POST network error', async () => {
    // Mock fetch to simulate network error
    const originalFetch = global.fetch
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')))

    const result = await api.post('/users', { nickname: 'Test' })
    expect(result).toHaveProperty('error')
    expect((result as any).error).toBe('Network error - please check connection')

    global.fetch = originalFetch
  })
})