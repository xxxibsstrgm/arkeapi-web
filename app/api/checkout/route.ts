import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const VALID_PRICE_IDS = new Set([
  process.env.STRIPE_PRICE_STARTER!,
  process.env.STRIPE_PRICE_PRO!,
  process.env.STRIPE_PRICE_ENTERPRISE!,
])

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    if (!priceId || !VALID_PRICE_IDS.has(priceId)) {
      return NextResponse.json({ error: 'Invalid plan selection' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || 'https://arkeapi.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      custom_text: {
        submit: {
          message: 'Your API key will be emailed to you immediately after payment.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout session error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
