export interface DocSection {
  slug: string
  title: string
  description: string
  content: string
}

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: 'quickstart',
    title: 'Quickstart',
    description: 'Make your first API call in under 2 minutes.',
    content: `
## Quickstart

ArkeAPI is fully OpenAI-compatible. If you're already using the OpenAI SDK, **you only need to change two lines** — the base URL and the API key. Everything else stays the same.

### 1. Install the OpenAI SDK

\`\`\`bash
pip install openai
\`\`\`

Or with Node.js:

\`\`\`bash
npm install openai
\`\`\`

### 2. Make your first call

**Python**

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.arkeapi.com/v1",
    api_key="sk-arke-your-key-here",
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello! What can you do?"}
    ],
)

print(response.choices[0].message.content)
\`\`\`

**Node.js / TypeScript**

\`\`\`typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://api.arkeapi.com/v1',
  apiKey: 'sk-arke-your-key-here',
})

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello!' }],
})

console.log(response.choices[0].message.content)
\`\`\`

**curl**

\`\`\`bash
curl https://api.arkeapi.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-arke-your-key-here" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
\`\`\`

### What's next?

- Browse [Available Models](/docs/models) to see all supported models
- Check [Chat Completions](/docs/chat-completions) for the full parameter reference
- Visit your [Dashboard](/dashboard) to monitor quota usage
    `,
  },
  {
    slug: 'authentication',
    title: 'Authentication',
    description: 'How to authenticate API requests with your key.',
    content: `
## Authentication

All API requests require authentication using your ArkeAPI key, passed as a Bearer token in the \`Authorization\` header.

### Format

\`\`\`
Authorization: Bearer sk-arke-xxxxxxxxxxxxxxxx
\`\`\`

### Key format

ArkeAPI keys follow the pattern \`sk-arke-\` followed by a random alphanumeric string. Your key was delivered to your email immediately after purchase.

### Setting the base URL

ArkeAPI's endpoint is fully OpenAI-compatible. Set your base URL to:

\`\`\`
https://api.arkeapi.com/v1
\`\`\`

Most SDKs accept this as a configuration option:

| SDK | Parameter |
|---|---|
| Python openai | \`base_url\` |
| Node.js openai | \`baseURL\` |
| LangChain | \`openai_api_base\` |
| LlamaIndex | \`api_base\` |
| Cursor / Cline | Custom base URL field |

### Environment variable pattern

Store your key as an environment variable to avoid hardcoding it:

\`\`\`bash
export ARKE_API_KEY="sk-arke-your-key-here"
export OPENAI_API_KEY="$ARKE_API_KEY"      # reuse existing code
export OPENAI_BASE_URL="https://api.arkeapi.com/v1"
\`\`\`

Then in Python:

\`\`\`python
import os
from openai import OpenAI

client = OpenAI(
    base_url=os.environ["OPENAI_BASE_URL"],
    api_key=os.environ["OPENAI_API_KEY"],
)
\`\`\`

### Security

- Never commit your API key to version control
- Use environment variables or a secrets manager (Doppler, AWS Secrets Manager, Vercel env vars)
- Keys can be rotated by contacting support@arkeapi.com
    `,
  },
  {
    slug: 'chat-completions',
    title: 'Chat Completions',
    description: 'The core endpoint for conversational AI.',
    content: `
## Chat Completions

The chat completions endpoint is the primary interface for all conversational AI tasks.

### Endpoint

\`\`\`
POST https://api.arkeapi.com/v1/chat/completions
\`\`\`

### Request parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | Model ID (e.g. \`gpt-4o\`, \`claude-3-5-sonnet-20241022\`) |
| \`messages\` | array | ✓ | Array of message objects with \`role\` and \`content\` |
| \`stream\` | boolean | | Enable streaming via SSE. Default: \`false\` |
| \`temperature\` | number | | Sampling temperature 0–2. Higher = more random. Default: \`1\` |
| \`max_tokens\` | number | | Maximum tokens to generate |
| \`top_p\` | number | | Nucleus sampling. Default: \`1\` |
| \`tools\` | array | | Function/tool definitions for tool use |
| \`tool_choice\` | string/object | | Controls tool calling: \`auto\`, \`none\`, or specific tool |
| \`response_format\` | object | | Force JSON output: \`{"type": "json_object"}\` |
| \`stop\` | string/array | | Stop sequence(s) |
| \`n\` | number | | Number of completions to generate. Default: \`1\` |

### Message roles

- \`system\` — Instructions for the model's behavior
- \`user\` — Input from the human
- \`assistant\` — Previous model responses (for multi-turn conversations)
- \`tool\` — Tool call results

### Basic example

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a concise assistant."},
        {"role": "user", "content": "Explain quantum entanglement in one sentence."},
    ],
    temperature=0.5,
    max_tokens=200,
)
\`\`\`

### Streaming example

\`\`\`python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Write a haiku about coding."}],
    stream=True,
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
\`\`\`

### Response object

\`\`\`json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1720000000,
  "model": "gpt-4o",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Quantum entanglement is a phenomenon..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 28,
    "completion_tokens": 42,
    "total_tokens": 70
  }
}
\`\`\`
    `,
  },
  {
    slug: 'models',
    title: 'Available Models',
    description: 'All models accessible through ArkeAPI.',
    content: `
## Available Models

ArkeAPI provides access to 15+ leading language models through a single endpoint. All models use the same OpenAI-compatible API format.

### List available models

\`\`\`
GET https://api.arkeapi.com/v1/models
\`\`\`

Returns all models accessible with your key. The response follows the OpenAI models list format.

\`\`\`python
models = client.models.list()
for model in models.data:
    print(model.id)
\`\`\`

### Model reference

**OpenAI**

| Model | Context | Strengths |
|---|---|---|
| \`gpt-4o\` | 128K | Best overall, vision, tool use |
| \`gpt-4o-mini\` | 128K | Fast, affordable, everyday tasks |
| \`o1\` | 200K | Advanced reasoning |
| \`o3-mini\` | 200K | Fast reasoning |

**Anthropic**

| Model | Context | Strengths |
|---|---|---|
| \`claude-3-5-sonnet-20241022\` | 200K | Coding, analysis, long context |
| \`claude-3-5-haiku-20241022\` | 200K | Fastest Claude model |
| \`claude-3-opus-20240229\` | 200K | Most powerful Claude 3 |

**Google**

| Model | Context | Strengths |
|---|---|---|
| \`gemini-2.0-flash\` | 1M | Next-gen speed |
| \`gemini-1.5-flash\` | 1M | Fast, multimodal |
| \`gemini-1.5-pro\` | 2M | Largest context window |

**DeepSeek**

| Model | Context | Strengths |
|---|---|---|
| \`deepseek-chat\` | 64K | Cost-effective reasoning |
| \`deepseek-reasoner\` | 64K | Chain-of-thought reasoning |

### Model availability by plan

Models available to your key depend on your purchased plan. Check the [Dashboard → Models](/dashboard/models) page for the exact list.

### Quota consumption

Each model consumes quota at different rates based on token usage. Quota units are deducted based on actual token counts. One quota unit corresponds to approximately 1 token at the standard rate — see your plan details for the exact conversion.
    `,
  },
  {
    slug: 'usage',
    title: 'Checking Usage',
    description: 'Monitor your quota and token consumption.',
    content: `
## Checking Usage

### Via Dashboard

The easiest way to monitor your quota is through the [ArkeAPI Dashboard](/dashboard/usage). After logging in with your API key, you'll see:

- Total quota granted
- Tokens consumed
- Remaining quota
- Visual quota ring

### Via API

You can also query your usage programmatically:

\`\`\`
GET https://api.arkeapi.com/api/usage/token
Authorization: Bearer sk-arke-your-key
\`\`\`

**Response:**

\`\`\`json
{
  "code": true,
  "message": "ok",
  "data": {
    "object": "token_usage",
    "name": "pro-username-a3k2",
    "total_granted": 2500000,
    "total_used": 184320,
    "total_available": 2315680,
    "unlimited_quota": false,
    "expires_at": 0
  }
}
\`\`\`

| Field | Description |
|---|---|
| \`total_granted\` | Total quota purchased (in units) |
| \`total_used\` | Quota consumed to date |
| \`total_available\` | Remaining quota |
| \`unlimited_quota\` | \`false\` for all purchased plans |
| \`expires_at\` | Unix timestamp — \`0\` means never expires |

### OpenAI billing compatibility

For tools that check balance via the OpenAI billing API, ArkeAPI also supports:

\`\`\`
GET https://api.arkeapi.com/dashboard/billing/subscription
GET https://api.arkeapi.com/v1/dashboard/billing/subscription
\`\`\`

These return an OpenAI-compatible subscription object, compatible with tools like [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool).

### Quota never expires

Unlike subscription services, ArkeAPI quota does not expire. Once purchased, your quota remains available indefinitely until fully consumed.
    `,
  },
  {
    slug: 'error-codes',
    title: 'Error Codes',
    description: 'Common errors and how to handle them.',
    content: `
## Error Codes

ArkeAPI uses standard HTTP status codes and returns errors in OpenAI-compatible format.

### Error response format

\`\`\`json
{
  "error": {
    "message": "Insufficient quota",
    "type": "insufficient_quota",
    "code": "quota_exceeded"
  }
}
\`\`\`

### HTTP status codes

| Code | Meaning | Common cause |
|---|---|---|
| \`400\` | Bad Request | Invalid request body, missing required fields |
| \`401\` | Unauthorized | Invalid or missing API key |
| \`403\` | Forbidden | API key doesn't have access to requested model |
| \`404\` | Not Found | Unknown model ID |
| \`429\` | Rate Limited | Too many requests — back off and retry |
| \`500\` | Server Error | Upstream provider issue — retry with backoff |
| \`503\` | Unavailable | Model temporarily unavailable — try another model |

### Common errors

**Invalid API key (401)**
\`\`\`json
{"error": {"message": "Invalid API key", "type": "invalid_api_key"}}
\`\`\`
→ Double-check your key from the welcome email. Keys start with \`sk-arke-\`.

**Model not found (404)**
\`\`\`json
{"error": {"message": "Model not found", "type": "invalid_request_error"}}
\`\`\`
→ Check the [Available Models](/docs/models) page for valid model IDs. Your plan may not include all models.

**Quota exceeded (429/403)**
\`\`\`json
{"error": {"message": "Insufficient quota", "type": "insufficient_quota"}}
\`\`\`
→ Your token quota has been exhausted. Purchase an additional plan to continue.

### Retry strategy

For transient errors (429, 500, 503), implement exponential backoff:

\`\`\`python
import time
import openai

def chat_with_retry(client, **kwargs, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(**kwargs)
        except openai.RateLimitError:
            wait = 2 ** attempt
            time.sleep(wait)
        except openai.APIStatusError as e:
            if e.status_code >= 500:
                time.sleep(2 ** attempt)
            else:
                raise
    raise RuntimeError("Max retries exceeded")
\`\`\`
    `,
  },
  {
    slug: 'sdks',
    title: 'SDK Compatibility',
    description: 'ArkeAPI works with any OpenAI-compatible SDK or tool.',
    content: `
## SDK & Tool Compatibility

ArkeAPI is 100% OpenAI-compatible. Any tool, library, or framework that works with OpenAI will work with ArkeAPI — just change the base URL and API key.

### Official SDKs

**Python**
\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.arkeapi.com/v1",
    api_key="sk-arke-your-key",
)
\`\`\`

**Node.js / TypeScript**
\`\`\`typescript
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://api.arkeapi.com/v1',
  apiKey: 'sk-arke-your-key',
})
\`\`\`

**Go**
\`\`\`go
client := openai.NewClientWithConfig(openai.ClientConfig{
    BaseURL: "https://api.arkeapi.com/v1",
    AuthToken: "sk-arke-your-key",
})
\`\`\`

### AI Frameworks

**LangChain (Python)**
\`\`\`python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o",
    openai_api_key="sk-arke-your-key",
    openai_api_base="https://api.arkeapi.com/v1",
)
\`\`\`

**LlamaIndex**
\`\`\`python
from llama_index.llms.openai import OpenAI

llm = OpenAI(
    model="gpt-4o",
    api_key="sk-arke-your-key",
    api_base="https://api.arkeapi.com/v1",
)
\`\`\`

**Vercel AI SDK**
\`\`\`typescript
import { createOpenAI } from '@ai-sdk/openai'

const arke = createOpenAI({
  baseURL: 'https://api.arkeapi.com/v1',
  apiKey: 'sk-arke-your-key',
})
\`\`\`

### Coding assistants

| Tool | How to configure |
|---|---|
| **Cursor** | Settings → Models → Add custom model → base URL + key |
| **Continue.dev** | \`config.json\` → \`apiBase\` + \`apiKey\` |
| **Cline** | Settings → API Provider → OpenAI Compatible → base URL + key |
| **Aider** | \`--openai-api-base\` + \`--openai-api-key\` flags |

### Environment variables (12-factor pattern)

\`\`\`bash
# .env
OPENAI_API_KEY=sk-arke-your-key
OPENAI_BASE_URL=https://api.arkeapi.com/v1
\`\`\`

Most OpenAI SDKs automatically read these variables, so you can switch to ArkeAPI without any code changes — just update your environment.
    `,
  },
]

export function getDocSection(slug: string): DocSection | undefined {
  return DOC_SECTIONS.find(s => s.slug === slug)
}

export const DOC_NAV = DOC_SECTIONS.map(({ slug, title, description }) => ({ slug, title, description }))
