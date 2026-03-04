export type Capability = 'vision' | 'tools' | 'reasoning' | 'audio' | 'image-gen' | 'video-gen' | 'embedding'

export type PricingType = 'token' | 'per-image' | 'per-video' | 'per-request'

export interface ModelInfo {
  provider: string
  providerColor: string
  context?: string          // token models
  input?: number            // USD per 1M tokens
  output?: number           // USD per 1M tokens
  pricingType: PricingType
  pricePerRequest?: number  // per-image / per-video price in USD
  priceUnit?: string        // e.g. '/ image', '/ 5s clip'
  caps: Capability[]
  description?: string
  featured?: boolean
  new?: boolean
}

export const MODEL_CATALOG: Record<string, ModelInfo> = {

  // ── OpenAI ─────────────────────────────────────────────────────────────
  'gpt-4.1': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Flagship GPT-4.1 — improved instruction following, 1M context',
    featured: true, new: true,
  },
  'gpt-4.1-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 0.40, output: 1.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Efficient GPT-4.1 with 1M context at lower cost',
    featured: true, new: true,
  },
  'gpt-4.1-nano': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Ultra-fast, lowest-cost GPT-4.1 for high-throughput use',
    new: true,
  },
  'gpt-5': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'OpenAI\'s most capable model — multimodal, reasoning-enabled',
    featured: true, new: true,
  },
  'gpt-5-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 0.25, output: 2.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Compact GPT-5 for cost-effective deployment',
    new: true,
  },
  'gpt-5-nano': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 0.05, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Smallest and fastest GPT-5 model',
    new: true,
  },
  'gpt-5-pro': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '1M', input: 15.00, output: 120.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Maximum capability GPT-5 for the most demanding tasks',
    new: true,
  },
  'gpt-4o': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Most capable multimodal GPT-4 model',
    featured: true,
  },
  'gpt-4o-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Fast and affordable GPT-4o class model',
    featured: true,
  },
  'gpt-4o-2024-05-13': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 5.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o May 2024 snapshot',
  },
  'gpt-4o-2024-08-06': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o August 2024 snapshot',
  },
  'gpt-4o-2024-11-20': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o November 2024 snapshot',
  },
  'gpt-4o-mini-2024-07-18': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o mini July 2024 snapshot',
  },
  'gpt-4.5-preview': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 75.00, output: 150.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Preview of next-generation GPT with enhanced agentic abilities',
  },
  'gpt-4-turbo': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4 Turbo with vision and 128K context',
  },
  'gpt-4-turbo-2024-04-09': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4 Turbo April 2024 snapshot',
  },
  'gpt-4': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '8K', input: 30.00, output: 60.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Original GPT-4 model',
  },
  'gpt-3.5-turbo': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '16K', input: 0.50, output: 1.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Fast, affordable model for simple tasks',
  },
  'o4-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Latest compact OpenAI reasoning model — strong math and coding',
    featured: true, new: true,
  },
  'o3': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Powerful reasoning model with advanced problem-solving',
    featured: true, new: true,
  },
  'o3-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Compact o3 reasoning model — balanced performance and cost',
  },
  'o3-pro': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 20.00, output: 80.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Most powerful o3 reasoning model for the hardest problems',
    new: true,
  },
  'o1': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Frontier reasoning model with extended thinking',
  },
  'o1-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning'],
    description: 'Compact o1 for cost-efficient reasoning tasks',
  },
  'o1-preview': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'Earlier preview of the o1 reasoning series',
  },
  // OpenAI image generation
  'gpt-image-1': {
    provider: 'OpenAI', providerColor: '#10a37f',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'OpenAI\'s latest image generation model with rich detail and accuracy',
    featured: true, new: true,
  },
  'dall-e-3': {
    provider: 'OpenAI', providerColor: '#10a37f',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'High-quality image generation with superior detail and accuracy',
  },

  // ── Anthropic ──────────────────────────────────────────────────────────
  'claude-sonnet-4-6': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Latest Claude Sonnet 4.6 — exceptional coding and agentic tasks',
    featured: true, new: true,
  },
  'claude-opus-4-6': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 5.00, output: 25.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Most intelligent Claude model with advanced reasoning',
    featured: true, new: true,
  },
  'claude-sonnet-4-20250514': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Sonnet 4 — powerful and efficient across a wide range of tasks',
    new: true,
  },
  'claude-opus-4-20250514': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Opus 4 — most capable for complex, nuanced work',
    new: true,
  },
  'claude-3-7-sonnet-20250219': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude 3.7 Sonnet — best combination of speed and intelligence',
    featured: true, new: true,
  },
  'claude-3-7-sonnet-20250219-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude 3.7 Sonnet with extended thinking enabled',
    new: true,
  },
  'claude-3-5-sonnet-20241022': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude 3.5 Sonnet — best balance of intelligence and speed',
  },
  'claude-3-5-haiku-20241022': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 0.80, output: 4.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Fastest and most compact Claude 3.5 model',
  },
  'claude-3-opus-20240229': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Most powerful Claude 3 model for highly complex tasks',
  },
  'claude-3-haiku-20240307': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 0.25, output: 1.25,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Near-instant responsiveness for lightweight tasks',
  },

  // ── Google ─────────────────────────────────────────────────────────────
  'gemini-2.5-pro': {
    provider: 'Google', providerColor: '#4285f4',
    context: '2M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Most capable Gemini 2.5 — 2M context, native thinking',
    featured: true, new: true,
  },
  'gemini-2.5-pro-thinking': {
    provider: 'Google', providerColor: '#4285f4',
    context: '2M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Pro with extended thinking for deep reasoning',
    new: true,
  },
  'gemini-2.5-flash': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Best price-performance Gemini with 1M context',
    featured: true, new: true,
  },
  'gemini-2.5-flash-thinking': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash with thinking mode for complex reasoning',
    new: true,
  },
  'gemini-2.5-flash-lite': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Lightweight Gemini 2.5 Flash for high-throughput tasks',
    new: true,
  },
  'gemini-2.0-flash': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Next-gen speed and efficiency from Google',
    featured: true,
  },
  'gemini-3-pro-preview': {
    provider: 'Google', providerColor: '#4285f4',
    context: '2M', input: 2.00, output: 12.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Gemini 3 Pro — powerful multimodal flagship',
    new: true,
  },
  'gemini-3-flash-preview': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.50, output: 3.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Gemini 3 Flash — fast and affordable next-gen model',
    new: true,
  },
  'gemini-3.1-pro-preview': {
    provider: 'Google', providerColor: '#4285f4',
    context: '2M', input: 2.00, output: 12.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Gemini 3.1 Pro — latest flagship with enhanced capabilities',
    new: true,
  },
  'gemini-3.1-flash-preview': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.50, output: 3.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Gemini 3.1 Flash — fast multimodal model',
    new: true,
  },
  // Google image generation
  'gemini-2.5-flash-image-preview': {
    provider: 'Google', providerColor: '#4285f4',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Gemini-powered image generation with multimodal understanding',
    new: true,
  },
  'google/imagen-4': {
    provider: 'Google', providerColor: '#4285f4',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Google Imagen 4 — photorealistic text-to-image model',
    new: true,
  },
  'google/imagen-4-ultra': {
    provider: 'Google', providerColor: '#4285f4',
    pricingType: 'per-image', pricePerRequest: 0.08, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Google Imagen 4 Ultra — highest quality photorealistic generation',
    new: true,
  },

  // ── DeepSeek ───────────────────────────────────────────────────────────
  'deepseek-v3': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3 — top-tier open-source model for coding and reasoning',
    featured: true,
  },
  'deepseek-v3-0324': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3 March 2024 snapshot',
  },
  'deepseek-v3.1': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 4.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3.1 — upgraded performance with improved accuracy',
    new: true,
  },
  'deepseek-v3.2': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 2.00, output: 3.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3.2 — improved cost efficiency',
    new: true,
  },
  'deepseek-r1': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek R1 — chain-of-thought reasoning rivaling o1',
    featured: true,
  },
  'deepseek-r1-0528': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek R1 May 2024 snapshot with further improvements',
    new: true,
  },
  'deepseek-chat': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek Chat — efficient conversational model',
  },

  // ── xAI ────────────────────────────────────────────────────────────────
  'grok-4': {
    provider: 'xAI', providerColor: '#1a1a1a',
    context: '256K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Grok 4 — xAI\'s most capable model with real-time web access',
    featured: true, new: true,
  },
  'grok-3': {
    provider: 'xAI', providerColor: '#1a1a1a',
    context: '131K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Grok 3 — broad knowledge and strong reasoning from xAI',
    new: true,
  },
  'grok-3-mini': {
    provider: 'xAI', providerColor: '#1a1a1a',
    context: '131K', input: 0.30, output: 0.50,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Grok 3 Mini — efficient chain-of-thought reasoning',
    new: true,
  },
  'grok-3-image': {
    provider: 'xAI', providerColor: '#1a1a1a',
    pricingType: 'per-image', pricePerRequest: 0.07, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Grok image generation — high quality from xAI',
    new: true,
  },

  // ── Kimi / Moonshot ────────────────────────────────────────────────────
  'kimi-k2': {
    provider: 'Kimi', providerColor: '#0ea5e9',
    context: '131K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Kimi K2 — Moonshot AI\'s powerful agentic model with strong coding',
    featured: true, new: true,
  },
  'kimi-k2-instruct': {
    provider: 'Kimi', providerColor: '#0ea5e9',
    context: '131K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Kimi K2 Instruct — fine-tuned for precise instruction following',
    new: true,
  },

  // ── Qwen / Alibaba ─────────────────────────────────────────────────────
  'qwen3-max': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Qwen3 Max — Alibaba\'s top model with hybrid thinking mode',
    featured: true, new: true,
  },
  'qwen3-235b-a22b': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Qwen3 235B MoE — open-source flagship with 22B active parameters',
    new: true,
  },
  'qwen3-32b': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'Qwen3 32B — dense model with strong coding and math',
    new: true,
  },
  'qwen-max': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '32K', input: 2.40, output: 9.60,
    pricingType: 'token', caps: ['tools'],
    description: 'Qwen Max — best Alibaba Cloud model for complex tasks',
  },
  'qwen-plus': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '128K', input: 0.80, output: 2.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Qwen Plus — balanced capability and efficiency',
  },
  'qwen-turbo': {
    provider: 'Qwen', providerColor: '#e11d48',
    context: '1M', input: 0.30, output: 0.60,
    pricingType: 'token', caps: ['tools'],
    description: 'Qwen Turbo — ultra-fast with 1M context window',
  },

  // ── Meta ───────────────────────────────────────────────────────────────
  'llama-4-maverick': {
    provider: 'Meta', providerColor: '#1877f2',
    context: '1M', input: 0.14, output: 0.70,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Llama 4 Maverick — Meta\'s multimodal MoE model with 1M context',
    featured: true, new: true,
  },
  'llama-3.1-405b': {
    provider: 'Meta', providerColor: '#1877f2',
    context: '128K', input: 6.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 405B — flagship open-weights model',
  },
  'llama-3.1-70b': {
    provider: 'Meta', providerColor: '#1877f2',
    context: '128K', input: 4.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 70B — strong performance at moderate cost',
  },

  // ── Mistral ────────────────────────────────────────────────────────────
  'mistral-large-latest': {
    provider: 'Mistral', providerColor: '#ff7000',
    context: '128K', input: 2.00, output: 6.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Mistral Large — top-tier multilingual reasoning and code',
  },
  'mistral-small-latest': {
    provider: 'Mistral', providerColor: '#ff7000',
    context: '32K', input: 0.10, output: 0.30,
    pricingType: 'token', caps: ['tools'],
    description: 'Mistral Small — fast, affordable with enterprise safety',
  },

  // ── Flux / Black Forest Labs ───────────────────────────────────────────
  'flux-pro': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.055, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX.1 Pro — state-of-the-art image generation with top quality',
    featured: true,
  },
  'flux.1.1-pro': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX 1.1 Pro — improved speed and quality over original Pro',
    new: true,
  },
  'flux-kontext-pro': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.08, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX Kontext Pro — context-aware image editing and generation',
    new: true,
  },
  'flux-kontext-max': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.16, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX Kontext Max — maximum quality context-aware generation',
    new: true,
  },
  'flux-dev': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.025, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX.1 Dev — high quality open-source image generation',
  },
  'flux-schnell': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.003, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX.1 Schnell — fastest image generation in the FLUX family',
  },

  // ── ByteDance / Doubao ─────────────────────────────────────────────────
  'doubao-seedream-5-0-260128': {
    provider: 'ByteDance', providerColor: '#3b82f6',
    pricingType: 'per-image', pricePerRequest: 0.06, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Seedream 5.0 — ByteDance\'s latest high-fidelity text-to-image model',
    featured: true, new: true,
  },
  'doubao-seedream-4-0-250828': {
    provider: 'ByteDance', providerColor: '#3b82f6',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Seedream 4.0 — high-quality Chinese-culture-aware image generation',
    new: true,
  },
  'doubao-seedream-3-0-t2i-250415': {
    provider: 'ByteDance', providerColor: '#3b82f6',
    pricingType: 'per-image', pricePerRequest: 0.02, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Seedream 3.0 — fast, cost-effective text-to-image generation',
  },
  'doubao-seedance-1-0-pro-250528': {
    provider: 'ByteDance', providerColor: '#3b82f6',
    pricingType: 'per-video', pricePerRequest: 0.35, priceUnit: '/ 5s clip',
    caps: ['video-gen'],
    description: 'Seedance 1.0 Pro — cinematic text-to-video generation from ByteDance',
    new: true,
  },
}

export const PROVIDERS = [...new Set(Object.values(MODEL_CATALOG).map(m => m.provider))]
