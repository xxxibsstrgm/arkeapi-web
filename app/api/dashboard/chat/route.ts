import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages, model, apiKey, temperature, max_tokens } = await request.json()

    if (!apiKey || !messages || !model) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    const baseUrl = process.env.NEW_API_BASE_URL
    if (!baseUrl) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 })
    }

    const upstream = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: temperature ?? 0.7,
        max_tokens: max_tokens ?? 2048,
      }),
    })

    if (!upstream.ok) {
      const err = await upstream.text()
      return new Response(err, { status: upstream.status })
    }

    // Stream the SSE response directly to the browser
    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Connection failed' }), { status: 500 })
  }
}
