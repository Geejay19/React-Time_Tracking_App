const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:3010'

export class ApiError extends Error {
  constructor(message, status, endpoint) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.endpoint = endpoint
  }
}

export async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok || payload?.error) {
    throw new ApiError(
      payload?.error ?? `Request failed with status ${response.status}.`,
      response.status,
      endpoint,
    )
  }

  return payload
}

export function serverText(value) {
  return String(value ?? '').replaceAll("'", "''")
}
