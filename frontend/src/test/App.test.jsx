import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

describe('application foundation', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      const body = url.endsWith('/options/1')
        ? { id: 1, theme: 'light', alternative: 0, own_textual_data: '' }
        : []
      return Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(body),
      })
    }))
  })

  afterEach(() => vi.unstubAllGlobals())

  it('loads and renders the dashboard', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
  })
})
