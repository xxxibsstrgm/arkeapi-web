import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 401 })
  }

  const baseUrl = process.env.NEW_API_BASE_URL
  if (!baseUrl) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const res = await fetch(`${baseUrl}/v1/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch models' }, { status: res.status })
    }

    const data = await res.json()
    // OpenAI format: { object: 'list', data: [{ id, object, ... }] }
    const ids: string[] = (data.data ?? []).map((m: { id: string }) => m.id)
    return NextResponse.json({ models: ids })
  } catch {
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 })
  }
}
