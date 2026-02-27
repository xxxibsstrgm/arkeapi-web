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
    const res = await fetch(`${baseUrl}/api/usage/token`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch usage' }, { status: res.status })
    }

    const data = await res.json()
    if (!data.code || !data.data) {
      return NextResponse.json({ error: 'Invalid response' }, { status: 502 })
    }

    const { name, total_granted, total_used, total_available, unlimited_quota, expires_at } = data.data
    return NextResponse.json({ name, total_granted, total_used, total_available, unlimited_quota, expires_at })
  } catch {
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 })
  }
}
