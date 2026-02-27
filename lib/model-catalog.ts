export type Capability = 'vision' | 'tools' | 'reasoning' | 'audio' | 'embedding'

export interface ModelInfo {
  provider: string
  providerColor: string
  context: string
  input: number   // USD per 1M tokens
  output: number  // USD per 1M tokens
  caps: Capability[]
  description?: string
  featured?: boolean
}

export const MODEL_CATALOG: Record<string, ModelInfo> = {
  // OpenAI
  'gpt-4o': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 2.50, output: 10.00,
    caps: ['vision', 'tools'],
    description: 'Most capable GPT-4 model, multimodal',
    featured: true,
  },
  'gpt-4o-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 0.15, output: 0.60,
    caps: ['vision', 'tools'],
    description: 'Fast and affordable GPT-4 class model',
    featured: true,
  },
  'gpt-4-turbo': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 10.00, output: 30.00,
    caps: ['vision', 'tools'],
  },
  'o1': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 15.00, output: 60.00,
    caps: ['reasoning', 'tools'],
    description: 'Frontier reasoning model',
  },
  'o1-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '128K', input: 1.10, output: 4.40,
    caps: ['reasoning'],
  },
  'o3-mini': {
    provider: 'OpenAI', providerColor: '#10a37f',
    context: '200K', input: 1.10, output: 4.40,
    caps: ['reasoning', 'tools'],
  },
  // Anthropic
  'claude-3-5-sonnet-20241022': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    caps: ['vision', 'tools'],
    description: 'Best balance of speed and intelligence',
    featured: true,
  },
  'claude-3-5-haiku-20241022': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 0.80, output: 4.00,
    caps: ['vision', 'tools'],
    description: 'Fastest Claude model',
  },
  'claude-3-opus-20240229': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    caps: ['vision', 'tools'],
    description: 'Most powerful Claude 3 model',
  },
  // Google
  'gemini-2.0-flash': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.10, output: 0.40,
    caps: ['vision', 'tools'],
    description: 'Next-gen speed and efficiency',
    featured: true,
  },
  'gemini-1.5-flash': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.075, output: 0.30,
    caps: ['vision', 'tools'],
    description: 'Fast multimodal model, 1M context',
  },
  'gemini-1.5-pro': {
    provider: 'Google', providerColor: '#4285f4',
    context: '2M', input: 1.25, output: 5.00,
    caps: ['vision', 'tools'],
    description: 'Most capable Gemini 1.5 model, 2M context',
  },
  'gemini-2.0-flash-thinking-exp': {
    provider: 'Google', providerColor: '#4285f4',
    context: '1M', input: 0.00, output: 0.00,
    caps: ['vision', 'reasoning'],
    description: 'Experimental thinking model',
  },
  // DeepSeek
  'deepseek-chat': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 0.14, output: 0.28,
    caps: ['tools'],
    description: 'Efficient chat model',
    featured: true,
  },
  'deepseek-reasoner': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '64K', input: 0.55, output: 2.19,
    caps: ['reasoning'],
    description: 'Advanced reasoning with chain-of-thought',
  },
  // Meta
  'llama-3.3-70b-instruct': {
    provider: 'Meta', providerColor: '#1877f2',
    context: '128K', input: 0.23, output: 0.40,
    caps: ['tools'],
    description: 'Llama 3.3 70B — open weights',
  },
  'llama-3.1-8b-instruct': {
    provider: 'Meta', providerColor: '#1877f2',
    context: '128K', input: 0.05, output: 0.08,
    caps: ['tools'],
    description: 'Efficient small model',
  },
  // Mistral
  'mistral-large-latest': {
    provider: 'Mistral', providerColor: '#ff7000',
    context: '128K', input: 2.00, output: 6.00,
    caps: ['tools'],
    description: 'Mistral\'s most capable model',
  },
  'mistral-small-latest': {
    provider: 'Mistral', providerColor: '#ff7000',
    context: '32K', input: 0.10, output: 0.30,
    caps: ['tools'],
    description: 'Fast and cost-effective',
  },
}

export const PROVIDERS = [...new Set(Object.values(MODEL_CATALOG).map(m => m.provider))]
