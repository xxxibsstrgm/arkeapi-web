export type Capability = 'vision' | 'tools' | 'reasoning' | 'audio' | 'image-gen' | 'video-gen' | 'embedding'

export type PricingType = 'token' | 'per-image' | 'per-video' | 'per-request'

export interface ModelInfo {
  provider: string
  providerColor: string
  context?: string          // token models
  input?: number            // USD per 1M tokens
  output?: number           // USD per 1M tokens
  pricingType: PricingType
  pricePerRequest?: number  // per-image / per-video / per-task price
  priceUnit?: string        // e.g. '/ image', '/ clip', '/ task'
  caps: Capability[]
  description?: string
  featured?: boolean
  new?: boolean
}

// price formula: input = ratio × 2, output = ratio × completion_ratio × 2
// per-task: pricePerRequest = raw default_price from VE API

export const MODEL_CATALOG: Record<string, ModelInfo> = {

  // ── OpenAI ─────────────────────────────────────────────────────────────
  // GPT-5 family
  'gpt-5': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: "OpenAI's most capable model — multimodal, reasoning-enabled",
    featured: true, new: true,
  },
  'gpt-5-2025-08-07': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Aug 2025 snapshot', new: true,
  },
  'gpt-5-chat-latest': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Latest GPT-5 chat alias', new: true,
  },
  'gpt-5-pro': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 15.00, output: 120.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Maximum capability GPT-5 for the most demanding tasks',
    new: true,
  },
  'gpt-5-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.25, output: 2.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Compact GPT-5 for cost-effective deployment', new: true,
  },
  'gpt-5-mini-2025-08-07': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.25, output: 2.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-5 Mini Aug 2025 snapshot', new: true,
  },
  'gpt-5-nano': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.05, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Smallest and fastest GPT-5 model', new: true,
  },
  'gpt-5-nano-2025-08-07': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.05, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-5 Nano Aug 2025 snapshot', new: true,
  },
  'gpt-5-codex': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Codex — optimized for software engineering', new: true,
  },
  'gpt-5-codex-high': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Codex High — maximum coding reasoning effort', new: true,
  },
  'gpt-5-codex-medium': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Codex Medium — balanced coding reasoning effort', new: true,
  },
  'gpt-5-codex-low': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Codex Low — fastest coding reasoning effort', new: true,
  },
  'gpt-5-search-api': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 with integrated web search API', new: true,
  },
  'gpt-5-search-api-2025-10-14': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 Search API Oct 2025 snapshot', new: true,
  },

  // GPT-4.5
  'gpt-4.5-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 75.00, output: 150.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Preview of next-generation GPT with enhanced agentic abilities',
  },
  'gpt-4.5-preview-2025-02-27': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 75.00, output: 150.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4.5 Preview Feb 2025 snapshot',
  },

  // GPT-4.1 family
  'gpt-4.1': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Flagship GPT-4.1 — improved instruction following, 1M context',
    featured: true, new: true,
  },
  'gpt-4.1-2025-04-14': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4.1 Apr 2025 snapshot',
  },
  'gpt-4.1-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.40, output: 1.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Efficient GPT-4.1 with 1M context at lower cost',
    featured: true, new: true,
  },
  'gpt-4.1-mini-2025-04-14': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.40, output: 1.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4.1 Mini Apr 2025 snapshot',
  },
  'gpt-4.1-nano': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Ultra-fast, lowest-cost GPT-4.1 for high-throughput use',
    new: true,
  },
  'gpt-4.1-nano-2025-04-14': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4.1 Nano Apr 2025 snapshot',
  },

  // o-series reasoning
  'o4-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'vision', 'tools'],
    description: 'Latest compact OpenAI reasoning model — strong math and coding',
    featured: true, new: true,
  },
  'o4-mini-2025-04-16': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'vision', 'tools'],
    description: 'o4-mini Apr 2025 snapshot',
  },
  'o3': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Powerful reasoning model with advanced problem-solving',
    featured: true, new: true,
  },
  'o3-2025-04-16': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'o3 Apr 2025 snapshot',
  },
  'o3-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Compact o3 reasoning model — balanced performance and cost',
  },
  'o3-mini-2025-01-31': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'o3-mini Jan 2025 snapshot',
  },
  'o3-pro': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 20.00, output: 80.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Most powerful o3 reasoning model for the hardest problems',
    new: true,
  },
  'o3-pro-2025-06-10': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 20.00, output: 80.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'o3-pro Jun 2025 snapshot', new: true,
  },
  'o1': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Frontier reasoning model with extended thinking',
  },
  'o1-2024-12-17': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'o1 Dec 2024 snapshot',
  },
  'o1-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning'],
    description: 'Compact o1 for cost-efficient reasoning tasks',
  },
  'o1-mini-2024-09-12': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning'],
    description: 'o1-mini Sep 2024 snapshot',
  },
  'o1-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'Earlier preview of the o1 reasoning series',
  },
  'o1-preview-2024-09-12': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 15.00, output: 60.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'o1-preview Sep 2024 snapshot',
  },
  'gpt-oss-120b': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['tools'],
    description: 'OpenAI open-source 120B model', new: true,
  },
  'gpt-oss-20b': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '200K', input: 0.20, output: 0.80,
    pricingType: 'token', caps: ['tools'],
    description: 'OpenAI open-source 20B model — fast and affordable', new: true,
  },

  // GPT-4o family
  'gpt-4o': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Most capable multimodal GPT-4 model',
    featured: true,
  },
  'chatgpt-4o-latest': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 7.50,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Latest ChatGPT-4o model alias, updated continuously',
  },
  'gpt-4o-2024-05-13': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 5.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o May 2024 snapshot',
  },
  'gpt-4o-2024-08-06': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o Aug 2024 snapshot',
  },
  'gpt-4o-2024-11-20': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o Nov 2024 snapshot',
  },
  'gpt-4o-mini': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Fast and affordable GPT-4o class model',
    featured: true,
  },
  'gpt-4o-mini-2024-07-18': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o Mini Jul 2024 snapshot',
  },
  'gpt-4o-search-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o with web search capability', new: true,
  },
  'gpt-4o-mini-search-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4o Mini with web search capability', new: true,
  },
  'gpt-4o-mini-search-preview-2025-03-11': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 0.15, output: 0.60,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4o Mini Search Mar 2025 snapshot', new: true,
  },

  // Audio / Realtime / Transcription
  'gpt-4o-audio-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['audio', 'vision'],
    description: 'GPT-4o with audio input/output support',
  },
  'gpt-4o-audio-preview-2024-10-01': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['audio', 'vision'],
    description: 'GPT-4o Audio Preview Oct 2024 snapshot',
  },
  'gpt-4o-audio-preview-2024-12-17': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.48, output: 9.92,
    pricingType: 'token', caps: ['audio', 'vision'],
    description: 'GPT-4o Audio Preview Dec 2024 snapshot',
  },
  'gpt-4o-realtime-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 5.00, output: 20.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT-4o real-time voice API — sub-second latency',
  },
  'gpt-4o-realtime-preview-2024-10-01': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 5.00, output: 20.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT-4o Realtime Oct 2024 snapshot',
  },
  'gpt-4o-realtime-preview-2025-06-03': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 5.00, output: 20.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT-4o Realtime Jun 2025 snapshot', new: true,
  },
  'gpt-4o-transcribe': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT-4o optimized for audio transcription',
  },
  'gpt-4o-mini-transcribe': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 1.50, output: 6.00,
    pricingType: 'token', caps: ['audio'],
    description: 'Compact GPT-4o transcription model — fast, affordable',
  },
  'gpt-audio-2025-08-28': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 2.50, output: 5.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT Audio Aug 2025 — dedicated audio model', new: true,
  },
  'gpt-realtime-2025-08-28': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['audio'],
    description: 'GPT Realtime Aug 2025 — low-latency voice model', new: true,
  },

  // TTS
  'tts-1': {
    provider: 'OpenAI', providerColor: '#111111',
    input: 0.50, output: 0,
    pricingType: 'token', caps: ['audio'],
    description: 'Text-to-speech — natural voices, standard quality',
  },
  'tts-1-1106': {
    provider: 'OpenAI', providerColor: '#111111',
    input: 0.50, output: 0,
    pricingType: 'token', caps: ['audio'],
    description: 'TTS-1 Nov 2024 snapshot',
  },
  'tts-1-hd': {
    provider: 'OpenAI', providerColor: '#111111',
    input: 0.50, output: 0,
    pricingType: 'token', caps: ['audio'],
    description: 'Text-to-speech — high-definition audio quality',
  },
  'tts-1-hd-1106': {
    provider: 'OpenAI', providerColor: '#111111',
    input: 0.50, output: 0,
    pricingType: 'token', caps: ['audio'],
    description: 'TTS-1 HD Nov 2024 snapshot',
  },
  'gpt-4o-mini-tts': {
    provider: 'OpenAI', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.30, priceUnit: '/ task',
    caps: ['audio'],
    description: 'GPT-4o Mini TTS — instruction-following text-to-speech', new: true,
  },

  // Whisper
  'whisper-1': {
    provider: 'OpenAI', providerColor: '#111111',
    input: 30.00, output: 0,
    pricingType: 'token', caps: ['audio'],
    description: 'Whisper — general-purpose speech recognition model',
  },

  // GPT-4 legacy
  'gpt-4-turbo': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4 Turbo with vision and 128K context',
  },
  'gpt-4-turbo-2024-04-09': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4 Turbo Apr 2024 snapshot',
  },
  'gpt-4-turbo-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 Turbo preview release',
  },
  'gpt-4-vision-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 30.00,
    pricingType: 'token', caps: ['vision'],
    description: 'GPT-4 Vision preview — deprecated, use gpt-4o',
  },
  'gpt-4-1106-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 20.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 Nov 2024 preview snapshot',
  },
  'gpt-4-0125-preview': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '128K', input: 10.00, output: 20.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 Jan 2025 preview snapshot',
  },
  'gpt-4': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '8K', input: 30.00, output: 60.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Original GPT-4 model',
  },
  'gpt-4-0613': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '8K', input: 30.00, output: 60.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 Jun 2023 snapshot',
  },
  'gpt-4-32k': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '32K', input: 60.00, output: 120.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 32K — extended context window variant',
  },
  'gpt-4-32k-0613': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '32K', input: 60.00, output: 120.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-4 32K Jun 2023 snapshot',
  },

  // GPT-3.5
  'gpt-3.5-turbo': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '16K', input: 0.50, output: 1.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Fast, affordable model for simple tasks',
  },
  'gpt-3.5-turbo-1106': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '16K', input: 1.00, output: 2.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-3.5 Turbo Nov 2024 snapshot',
  },
  'gpt-3.5-turbo-0125': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '16K', input: 0.50, output: 1.00,
    pricingType: 'token', caps: ['tools'],
    description: 'GPT-3.5 Turbo Jan 2025 snapshot',
  },

  // Embeddings
  'text-embedding-3-large': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '8K', input: 0.13, output: 0,
    pricingType: 'token', caps: ['embedding'],
    description: 'Most capable text embedding model — 3072 dimensions',
  },
  'text-embedding-3-small': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '8K', input: 0.02, output: 0,
    pricingType: 'token', caps: ['embedding'],
    description: 'Efficient text embedding model — 1536 dimensions',
  },
  'text-embedding-ada-002': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '8K', input: 0.10, output: 0,
    pricingType: 'token', caps: ['embedding'],
    description: 'Ada text embedding v2 — legacy embedding model',
  },

  // Legacy completions
  'babbage-002': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '16K', input: 0.40, output: 0.40,
    pricingType: 'token', caps: [],
    description: 'Babbage-002 — base legacy completion model',
  },
  'davinci-002': {
    provider: 'OpenAI', providerColor: '#111111',
    context: '16K', input: 40.00, output: 40.00,
    pricingType: 'token', caps: [],
    description: 'Davinci-002 — powerful legacy completion model',
  },

  // Image generation
  'gpt-image-1': {
    provider: 'OpenAI', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: "OpenAI's latest image generation model with rich detail and accuracy",
    featured: true, new: true,
  },
  'dall-e-3': {
    provider: 'OpenAI', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'High-quality image generation with superior detail and accuracy',
  },

  // ── OpenAI Plus (ChatGPT subscription models) ──────────────────────────
  'gpt-4o-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '128K', input: 5.00, output: 20.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o via ChatGPT Plus — with file analysis and web browsing',
    featured: true,
  },
  'gpt-4-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '128K', input: 24.00, output: 48.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4 via ChatGPT Plus — multimodal, file analysis, web access',
  },
  'gpt-5-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 via ChatGPT Plus subscription', new: true,
  },
  'gpt-5-thinking-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '1M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'GPT-5 with extended thinking via ChatGPT Plus', new: true,
  },
  'gpt-4o-search-preview-2025-03-11': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '128K', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'GPT-4o Search via Plus — web-augmented responses',
  },
  'gpt-4o-image-vip': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.24, priceUnit: '/ task',
    caps: ['image-gen', 'vision'],
    description: 'GPT-4o image generation via ChatGPT Plus — conversational image editing',
  },
  'gpt-image-1-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.16, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'GPT Image-1 via ChatGPT Plus subscription',
  },
  'sora-2': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-video', pricePerRequest: 0.10, priceUnit: '/ unit',
    caps: ['video-gen'],
    description: 'Sora 2 — OpenAI video generation, cinematic quality', new: true,
  },
  'sora-2-pro': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-video', pricePerRequest: 0.40, priceUnit: '/ unit',
    caps: ['video-gen'],
    description: 'Sora 2 Pro — maximum quality OpenAI video generation', new: true,
  },
  'sora_image': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.10, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Sora image generation — consistent worlds and characters',
  },
  'o3-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.70, priceUnit: '/ task',
    caps: ['reasoning', 'tools'],
    description: 'o3 via ChatGPT Plus — web access, files, extended thinking',
  },
  'o3-mini-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    context: '200K', input: 1.10, output: 4.40,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'o3-mini via ChatGPT Plus',
  },
  'o3-mini-high-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.16, priceUnit: '/ task',
    caps: ['reasoning', 'tools'],
    description: 'o3-mini high effort via ChatGPT Plus',
  },
  'o3-pro-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 1.40, priceUnit: '/ task',
    caps: ['reasoning', 'tools'],
    description: 'o3-pro via ChatGPT Plus — deepest reasoning effort',
  },
  'o4-mini-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.20, priceUnit: '/ task',
    caps: ['reasoning', 'vision', 'tools'],
    description: 'o4-mini via ChatGPT Plus — with web access', new: true,
  },
  'o1-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.65, priceUnit: '/ task',
    caps: ['reasoning', 'tools'],
    description: 'o1 via ChatGPT Plus',
  },
  'o1-mini-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.15, priceUnit: '/ task',
    caps: ['reasoning'],
    description: 'o1-mini via ChatGPT Plus',
  },
  'o1-preview-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.30, priceUnit: '/ task',
    caps: ['reasoning'],
    description: 'o1-preview via ChatGPT Plus',
  },
  'o1-pro-all': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 1.10, priceUnit: '/ task',
    caps: ['reasoning', 'tools'],
    description: 'o1-pro via ChatGPT Plus — maximum o1 reasoning',
  },
  'gpt-4-gizmo-*': {
    provider: 'OpenAI Plus', providerColor: '#111111',
    pricingType: 'per-request', pricePerRequest: 0.20, priceUnit: '/ task',
    caps: ['tools'],
    description: 'GPT Store / GPTs — custom GPT apps via ChatGPT Plus',
  },

  // ── Anthropic ──────────────────────────────────────────────────────────
  'claude-opus-4-1-20250805': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Opus 4.1 — most powerful Claude for demanding tasks', new: true,
  },
  'claude-opus-4-1-20250805-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude Opus 4.1 with extended thinking enabled', new: true,
  },
  'claude-opus-4-20250514': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Opus 4 — most capable for complex, nuanced work', new: true,
  },
  'claude-opus-4-20250514-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 15.00, output: 75.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude Opus 4 with extended thinking mode', new: true,
  },
  'claude-sonnet-4-5-20250929': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Sonnet 4.5 — powerful and efficient across a wide range', new: true,
  },
  'claude-sonnet-4-5-20250929-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude Sonnet 4.5 with extended thinking', new: true,
  },
  'claude-sonnet-4-20250514': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Sonnet 4 — powerful and efficient across a wide range of tasks',
    new: true,
  },
  'claude-sonnet-4-20250514-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude Sonnet 4 with extended thinking mode', new: true,
  },
  'claude-haiku-4-5-20251001': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 1.00, output: 5.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude Haiku 4.5 — fastest and most compact Claude 4.x model', new: true,
  },
  'claude-haiku-4-5-20251001-thinking': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 1.00, output: 5.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Claude Haiku 4.5 with reasoning mode enabled', new: true,
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
    description: 'Claude 3.7 Sonnet with extended thinking enabled', new: true,
  },
  'claude-3-5-sonnet-20241022': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude 3.5 Sonnet — best balance of intelligence and speed',
  },
  'claude-3-5-sonnet-20240620': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude 3.5 Sonnet Jun 2024 snapshot',
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
  'claude-3-sonnet-20240229': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Claude 3 Sonnet — balanced intelligence and speed',
  },
  'claude-3-haiku-20240307': {
    provider: 'Anthropic', providerColor: '#d97706',
    context: '200K', input: 0.25, output: 1.25,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Near-instant responsiveness for lightweight tasks',
  },

  // ── Google / Gemini ────────────────────────────────────────────────────
  'gemini-2.5-pro': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '2M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Most capable Gemini 2.5 — 2M context, native thinking',
    featured: true, new: true,
  },
  'gemini-2.5-pro-all': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '2M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Pro with web search and multimodal tools', new: true,
  },
  'gemini-pro-latest': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '2M', input: 1.25, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Latest Gemini Pro alias — always the current flagship', new: true,
  },
  'gemini-2.5-flash': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Best price-performance Gemini with 1M context',
    featured: true, new: true,
  },
  'gemini-2.5-flash-all': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash with web access and multimodal tools', new: true,
  },
  'gemini-flash-latest': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Latest Gemini Flash alias — always the current fast model', new: true,
  },
  'gemini-2.5-flash-preview-05-20': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash May 2025 preview snapshot', new: true,
  },
  'gemini-2.5-flash-preview-09-2025': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.30, output: 2.50,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash Sep 2025 preview snapshot', new: true,
  },
  'gemini-2.5-flash-lite': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Lightweight Gemini 2.5 Flash for high-throughput tasks', new: true,
  },
  'gemini-flash-lite-latest': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Latest Gemini Flash Lite alias — most affordable Gemini 2.5', new: true,
  },
  'gemini-2.5-flash-lite-preview-06-17': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash Lite Jun 2025 preview snapshot', new: true,
  },
  'gemini-2.5-flash-lite-preview-09-2025': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Gemini 2.5 Flash Lite Sep 2025 preview snapshot', new: true,
  },
  'gemini-2.0-flash': {
    provider: 'Gemini', providerColor: '#8E75B2',
    context: '1M', input: 0.10, output: 0.40,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Next-gen speed and efficiency from Google',
    featured: true,
  },
  // Gemini image gen
  'gemini-2.5-flash-image': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen', 'vision'],
    description: 'Gemini 2.5 Flash image generation', new: true,
  },
  'gemini-2.5-flash-image-preview': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen', 'vision'],
    description: 'Gemini-powered image generation with multimodal understanding', new: true,
  },
  // Google Imagen
  'google/imagen-4': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-image', pricePerRequest: 0.04, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Google Imagen 4 — photorealistic text-to-image model', new: true,
  },
  'google/imagen-4-ultra': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-image', pricePerRequest: 0.08, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Google Imagen 4 Ultra — highest quality photorealistic generation', new: true,
  },
  // Veo2 video generation
  'veo2': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.45, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 — Google\'s flagship text-to-video generation model', new: true,
  },
  'veo2-fast': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.45, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 Fast — accelerated video generation', new: true,
  },
  'veo2-fast-components': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.45, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 Fast Components — component-level video control', new: true,
  },
  'veo2-fast-frames': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.45, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 Fast Frames — frame-by-frame video generation', new: true,
  },
  'veo2-pro': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 4.00, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 Pro — premium cinematic video generation', new: true,
  },
  'veo2-pro-components': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 4.00, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 2 Pro Components — premium component-level control', new: true,
  },
  // Veo3 video generation
  'veo3': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.90, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 — Google\'s next-gen video generation with audio', new: true,
  },
  'veo3-fast': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.90, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 Fast — accelerated next-gen video generation', new: true,
  },
  'veo3-fast-frames': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.90, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 Fast Frames — rapid frame-level video generation', new: true,
  },
  'veo3-frames': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.90, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 Frames — precise frame-by-frame video output', new: true,
  },
  'veo3-pro': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 4.00, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 Pro — maximum quality next-gen video generation', new: true,
  },
  'veo3-pro-frames': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 4.00, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3 Pro Frames — premium frame-level video control', new: true,
  },
  'veo3.1': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.70, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3.1 — refined video generation with improved consistency', new: true,
  },
  'veo3.1-fast': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 0.70, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3.1 Fast — quick video synthesis with Veo 3.1 quality', new: true,
  },
  'veo3.1-pro': {
    provider: 'Gemini', providerColor: '#8E75B2',
    pricingType: 'per-video', pricePerRequest: 3.50, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Veo 3.1 Pro — premium Veo 3.1 for professional video', new: true,
  },

  // ── DeepSeek ───────────────────────────────────────────────────────────
  'deepseek-v3.1': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3.1 — upgraded performance with improved accuracy', new: true,
  },
  'deepseek-v3-1-250821': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3.1 Aug 2025 snapshot', new: true,
  },
  'deepseek-v3-1-think-250821': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 12.00,
    pricingType: 'token', caps: ['tools', 'reasoning'],
    description: 'DeepSeek V3.1 with thinking mode — Aug 2025', new: true,
  },
  'deepseek-v3': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3 — top-tier open-source model for coding and reasoning',
    featured: true,
  },
  'deepseek-v3-250324': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3 Mar 2025 snapshot',
  },
  'deepseek-v3.2-exp': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 2.00, output: 3.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3.2 Experimental — improved cost efficiency', new: true,
  },
  'deepseek-v3-search': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek V3 with integrated web search', new: true,
  },
  'deepseek-chat': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 2.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'DeepSeek Chat — efficient conversational model',
  },
  'deepseek-r1': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek R1 — chain-of-thought reasoning rivaling o1',
    featured: true,
  },
  'deepseek-r1-2025-01-20': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek R1 Jan 2025 snapshot',
  },
  'deepseek-r1-250528': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek R1 May 2025 snapshot with further improvements', new: true,
  },
  'deepseek-reasoner': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning'],
    description: 'DeepSeek Reasoner — alias for the R1 reasoning model',
  },
  'deepseek-r1-searching': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 4.00, output: 16.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'DeepSeek R1 with web search — reasoning + real-time data', new: true,
  },
  'deepseek-ocr': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 0.22, output: 0.22,
    pricingType: 'token', caps: ['vision'],
    description: 'DeepSeek OCR — document and image text extraction', new: true,
  },
  'mai-ds-r1': {
    provider: 'DeepSeek', providerColor: '#6366f1',
    context: '128K', input: 1.31, output: 5.26,
    pricingType: 'token', caps: ['reasoning'],
    description: 'MAI-DS-R1 — Microsoft AI optimized DeepSeek R1 variant', new: true,
  },

  // ── xAI / Grok ─────────────────────────────────────────────────────────
  'grok-4': {
    provider: 'Grok', providerColor: '#111111',
    context: '256K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Grok 4 — xAI\'s most capable model with real-time web access',
    featured: true, new: true,
  },
  'grok-4-0709': {
    provider: 'Grok', providerColor: '#111111',
    context: '256K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['vision', 'tools', 'reasoning'],
    description: 'Grok 4 Jul 2025 snapshot', new: true,
  },
  'grok-4-fast': {
    provider: 'Grok', providerColor: '#111111',
    context: '256K', input: 0.20, output: 0.50,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Grok 4 Fast — affordable high-throughput Grok 4 variant', new: true,
  },
  'grok-3': {
    provider: 'Grok', providerColor: '#111111',
    context: '131K', input: 3.00, output: 15.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Grok 3 — broad knowledge and strong reasoning from xAI', new: true,
  },
  'grok-3-mini': {
    provider: 'Grok', providerColor: '#111111',
    context: '131K', input: 0.30, output: 0.50,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Grok 3 Mini — efficient chain-of-thought reasoning', new: true,
  },
  'grok-3-reasoner': {
    provider: 'Grok', providerColor: '#111111',
    context: '131K', input: 2.00, output: 10.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Grok 3 Reasoner — dedicated reasoning model from xAI', new: true,
  },
  'grok-3-reasoning': {
    provider: 'Grok', providerColor: '#111111',
    context: '131K', input: 2.00, output: 10.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Grok 3 Reasoning — alias for grok-3-reasoner', new: true,
  },
  'grok-3-deepsearch': {
    provider: 'Grok', providerColor: '#111111',
    context: '131K', input: 2.00, output: 10.00,
    pricingType: 'token', caps: ['reasoning', 'tools'],
    description: 'Grok 3 DeepSearch — web search augmented with deep reasoning', new: true,
  },
  // xAI image generation
  'grok-3-image': {
    provider: 'Grok', providerColor: '#111111',
    pricingType: 'per-image', pricePerRequest: 0.10, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'Grok image generation — high quality from xAI', new: true,
  },

  // ── Meta / Ollama (Llama) ───────────────────────────────────────────────
  'meta-llama/llama-4-scout': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '1M', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Llama 4 Scout — Meta\'s efficient multimodal MoE model with 1M context',
    new: true,
  },
  'meta-llama/llama-4-maverick': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '1M', input: 2.50, output: 10.00,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Llama 4 Maverick — Meta\'s powerful multimodal MoE model',
    featured: true, new: true,
  },
  'llama-4-maverick': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '1M', input: 0.14, output: 0.70,
    pricingType: 'token', caps: ['vision', 'tools'],
    description: 'Llama 4 Maverick via Meta API — multimodal MoE with 1M context',
    new: true,
  },
  'llama-3.2-11b-vision-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 2.00, output: 2.00,
    pricingType: 'token', caps: ['vision'],
    description: 'Llama 3.2 11B Vision — compact multimodal model',
  },
  'llama-3.2-90b-vision-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 6.00, output: 18.00,
    pricingType: 'token', caps: ['vision'],
    description: 'Llama 3.2 90B Vision — powerful multimodal open model',
  },
  'llama-3.2-3b-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 1.00, output: 0.50,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.2 3B — ultra-compact, on-device capable model',
  },
  'llama-3.2-1b-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 0.50, output: 0.13,
    pricingType: 'token', caps: [],
    description: 'Llama 3.2 1B — smallest Llama model, on-device ready',
  },
  'llama-3.1-405b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 6.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 405B — largest open-weights Llama model',
  },
  'llama-3.1-405b-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 6.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 405B Instruct — instruction-tuned flagship',
  },
  'llama-3.1-70b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 4.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 70B — strong performance at moderate cost',
  },
  'llama-3.1-8b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 2.00, output: 2.00,
    pricingType: 'token', caps: [],
    description: 'Llama 3.1 8B — fast compact open-source model',
  },
  'llama-3.1-8b-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 0.25, output: 1.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 8B Instruct — efficient instruction-tuned compact model',
  },
  'llama-3-70b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '8K', input: 4.00, output: 8.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3 70B — original Llama 3 large model',
  },
  'llama-3-8b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '8K', input: 2.00, output: 2.00,
    pricingType: 'token', caps: [],
    description: 'Llama 3 8B — original compact Llama 3',
  },
  'llama-2-70b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '4K', input: 2.00, output: 2.00,
    pricingType: 'token', caps: [],
    description: 'Llama 2 70B — previous generation flagship',
  },
  'llama-2-13b': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '4K', input: 2.00, output: 2.00,
    pricingType: 'token', caps: [],
    description: 'Llama 2 13B — compact previous generation model',
  },
  'llama-3-sonar-large-32k-chat': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '32K', input: 1.50, output: 1.50,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3 Sonar Large — Perplexity\'s web-augmented Llama variant',
  },
  'llama-3-sonar-small-32k-chat': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '32K', input: 1.50, output: 1.50,
    pricingType: 'token', caps: [],
    description: 'Llama 3 Sonar Small — compact Perplexity web model',
  },
  'llama-3.1-405b-instruct-full': {
    provider: 'Ollama', providerColor: '#7c3aed',
    context: '128K', input: 6.00, output: 12.00,
    pricingType: 'token', caps: ['tools'],
    description: 'Llama 3.1 405B — flagship open-weights model',
  },
  'llama-3.1-70b-instruct': {
    provider: 'Ollama', providerColor: '#7c3aed',
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
    description: 'Qwen3 32B — dense model with strong coding and math', new: true,
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
    description: 'FLUX 1.1 Pro — improved speed and quality over original Pro', new: true,
  },
  'flux-kontext-pro': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.08, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX Kontext Pro — context-aware image editing and generation', new: true,
  },
  'flux-kontext-max': {
    provider: 'Flux', providerColor: '#f59e0b',
    pricingType: 'per-image', pricePerRequest: 0.16, priceUnit: '/ image',
    caps: ['image-gen'],
    description: 'FLUX Kontext Max — maximum quality context-aware generation', new: true,
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
    pricingType: 'per-video', pricePerRequest: 0.35, priceUnit: '/ clip',
    caps: ['video-gen'],
    description: 'Seedance 1.0 Pro — cinematic text-to-video generation from ByteDance',
    new: true,
  },
}

export const PROVIDERS = [...new Set(Object.values(MODEL_CATALOG).map(m => m.provider))]
