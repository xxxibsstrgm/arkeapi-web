export interface Plan {
  id: 'starter' | 'pro' | 'enterprise'
  name: string
  price: string
  description: string
  quota: string
  models: string[]
  priceId: string
  highlighted: boolean
  cta: string
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9',
    description: 'For prototyping and personal projects.',
    quota: '500K tokens',
    models: ['gpt-4o-mini', 'gemini-1.5-flash'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER!,
    highlighted: false,
    cta: 'Get started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$39',
    description: 'For production applications.',
    quota: '2.5M tokens',
    models: ['gpt-4o-mini', 'gemini-1.5-flash', 'gpt-4o', 'claude-3-5-sonnet'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!,
    highlighted: true,
    cta: 'Get Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$149',
    description: 'For high-volume teams.',
    quota: '10M tokens',
    models: ['All models included'],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE!,
    highlighted: false,
    cta: 'Get Enterprise',
  },
]
