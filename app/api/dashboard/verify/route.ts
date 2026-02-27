import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 })
    }

    const baseUrl = process.env.NEW_API_BASE_URL
    if (!baseUrl) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const res = await fetch(`${baseUrl}/api/usage/token`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const data = await res.json()

    // New-API returns { code: true, data: { ... } }
    if (!data.code || !data.data) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const { name, total_granted, total_used, total_available, unlimited_quota, expires_at } = data.data
    return NextResponse.json({ name, total_granted, total_used, total_available, unlimited_quota, expires_at })
  } catch {
    return NextResponse.json({ error: 'Connection failed' }, { status: 500 })
  }
}
