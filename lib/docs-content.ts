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

\`\`\`http
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

\`\`\`http
POST https://api.arkeapi.com/v1/chat/completions
\`\`\`

### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | Model ID (e.g. \`gpt-4o\`, \`claude-3-5-sonnet-20241022\`) |
| \`messages\` | array | ✓ | Array of message objects with \`role\` and \`content\` |
| \`stream\` | boolean | | Enable streaming via SSE. Default: \`false\` |
| \`temperature\` | number | | Sampling temperature 0–2. Default: \`1\` |
| \`max_tokens\` | number | | Maximum tokens to generate |
| \`top_p\` | number | | Nucleus sampling. Default: \`1\` |
| \`tools\` | array | | Function/tool definitions for tool use |
| \`tool_choice\` | string/object | | Controls tool calling: \`auto\`, \`none\`, or specific tool |
| \`response_format\` | object | | Force JSON output: \`{"type": "json_object"}\` |
| \`stop\` | string/array | | Stop sequence(s) |
| \`n\` | number | | Number of completions. Default: \`1\` |

### Message roles

- \`system\` — Instructions for the model's behavior
- \`user\` — Input from the human
- \`assistant\` — Previous model responses (multi-turn)
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
print(response.choices[0].message.content)
\`\`\`

### Streaming

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

### Tool use (function calling)

\`\`\`python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["location"],
            },
        },
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What's the weather in Singapore?"}],
    tools=tools,
    tool_choice="auto",
)
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
      "content": "Quantum entanglement is..."
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
    slug: 'text-completions',
    title: 'Text Completions',
    description: 'Legacy text completion endpoint for prompt-based generation.',
    content: `
## Text Completions

The legacy text completions endpoint generates text from a prompt string. For most use cases, the [Chat Completions](/docs/chat-completions) endpoint is preferred.

### Endpoint

\`\`\`http
POST https://api.arkeapi.com/v1/completions
\`\`\`

### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | Model ID — use \`gpt-3.5-turbo-instruct\` or similar |
| \`prompt\` | string/array | ✓ | The prompt(s) to generate completions for |
| \`max_tokens\` | number | | Maximum tokens to generate. Default: \`16\` |
| \`temperature\` | number | | Sampling temperature 0–2. Default: \`1\` |
| \`top_p\` | number | | Nucleus sampling. Default: \`1\` |
| \`n\` | number | | Number of completions. Default: \`1\` |
| \`stream\` | boolean | | Enable streaming. Default: \`false\` |
| \`stop\` | string/array | | Up to 4 stop sequences |
| \`echo\` | boolean | | Echo the prompt in the response. Default: \`false\` |
| \`suffix\` | string | | Text appended after the completion |
| \`logprobs\` | number | | Include log probabilities. Max: \`5\` |

### Example

\`\`\`python
response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="The capital of Singapore is",
    max_tokens=20,
    temperature=0,
)

print(response.choices[0].text)
# -> " Singapore (the city-state is its own capital)."
\`\`\`

### Streaming example

\`\`\`python
stream = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="List 3 benefits of using an API gateway:\n1.",
    max_tokens=200,
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].text, end="", flush=True)
\`\`\`

### Response object

\`\`\`json
{
  "id": "cmpl-abc123",
  "object": "text_completion",
  "created": 1720000000,
  "model": "gpt-3.5-turbo-instruct",
  "choices": [{
    "text": " Singapore.",
    "index": 0,
    "logprobs": null,
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 3,
    "total_tokens": 11
  }
}
\`\`\`
    `,
  },
  {
    slug: 'embeddings',
    title: 'Embeddings',
    description: 'Convert text into vector representations for semantic search and similarity.',
    content: `
## Embeddings

Embeddings convert text into dense numerical vectors that capture semantic meaning. Use them for semantic search, clustering, classification, and RAG (retrieval-augmented generation) pipelines.

### Endpoint

\`\`\`http
POST https://api.arkeapi.com/v1/embeddings
\`\`\`

### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | Embedding model ID (e.g. \`text-embedding-3-small\`) |
| \`input\` | string/array | ✓ | Text or array of texts to embed |
| \`encoding_format\` | string | | \`float\` (default) or \`base64\` |
| \`dimensions\` | number | | Truncate output to N dimensions (model-dependent) |

### Available embedding models

| Model | Dimensions | Max tokens | Best for |
|---|---|---|---|
| \`text-embedding-3-small\` | 1536 | 8191 | Cost-efficient, general purpose |
| \`text-embedding-3-large\` | 3072 | 8191 | Highest accuracy |
| \`text-embedding-ada-002\` | 1536 | 8191 | Legacy, widely supported |

### Single text example

\`\`\`python
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="ArkeAPI provides access to 15+ AI models.",
)

vector = response.data[0].embedding
print(f"Dimensions: {len(vector)}")  # 1536
\`\`\`

### Batch embeddings

\`\`\`python
texts = [
    "How do I reset my password?",
    "What payment methods do you accept?",
    "How do I contact support?",
]

response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts,
)

embeddings = [item.embedding for item in response.data]
\`\`\`

### Semantic search example

\`\`\`python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Embed your documents once and store vectors
docs = ["ArkeAPI quickstart", "Authentication guide", "Available models"]
doc_embeddings = [
    client.embeddings.create(model="text-embedding-3-small", input=d).data[0].embedding
    for d in docs
]

# Embed the query
query = "how do I get started?"
query_embedding = client.embeddings.create(
    model="text-embedding-3-small", input=query
).data[0].embedding

# Find most similar document
scores = [cosine_similarity(query_embedding, e) for e in doc_embeddings]
best = docs[np.argmax(scores)]
print(f"Most relevant: {best}")
\`\`\`

### Response object

\`\`\`json
{
  "object": "list",
  "data": [{
    "object": "embedding",
    "index": 0,
    "embedding": [0.0023064255, -0.009327292, ...]
  }],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
\`\`\`
    `,
  },
  {
    slug: 'images',
    title: 'Images',
    description: 'Generate and edit images using DALL-E and other image models.',
    content: `
## Images

Generate images from text descriptions using DALL-E 3, DALL-E 2, and other supported image generation models.

### Endpoints

\`\`\`http
POST https://api.arkeapi.com/v1/images/generations
POST https://api.arkeapi.com/v1/images/edits
POST https://api.arkeapi.com/v1/images/variations
\`\`\`

### Generate images

#### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | \`dall-e-3\` or \`dall-e-2\` |
| \`prompt\` | string | ✓ | Text description of the desired image. Max 4000 chars for DALL-E 3 |
| \`n\` | number | | Number of images (1–10 for DALL-E 2, always 1 for DALL-E 3) |
| \`size\` | string | | Image dimensions (see table below) |
| \`quality\` | string | | \`standard\` or \`hd\` (DALL-E 3 only). Default: \`standard\` |
| \`style\` | string | | \`vivid\` or \`natural\` (DALL-E 3 only). Default: \`vivid\` |
| \`response_format\` | string | | \`url\` (default) or \`b64_json\` |

#### Supported sizes

| Model | Sizes |
|---|---|
| DALL-E 3 | \`1024x1024\`, \`1792x1024\`, \`1024x1792\` |
| DALL-E 2 | \`256x256\`, \`512x512\`, \`1024x1024\` |

#### Python example

\`\`\`python
response = client.images.generate(
    model="dall-e-3",
    prompt="A futuristic API gateway floating in space, digital art style",
    size="1024x1024",
    quality="hd",
    n=1,
)

image_url = response.data[0].url
print(image_url)
\`\`\`

#### Node.js example

\`\`\`typescript
const response = await client.images.generate({
  model: "dall-e-3",
  prompt: "A minimalist diagram of API routing between AI providers",
  size: "1792x1024",
  quality: "standard",
})

console.log(response.data[0].url)
\`\`\`

### Edit images (DALL-E 2)

Modify an existing image based on a text prompt. Requires a PNG image with transparency indicating the area to edit.

\`\`\`python
with open("image.png", "rb") as img, open("mask.png", "rb") as mask:
    response = client.images.edit(
        model="dall-e-2",
        image=img,
        mask=mask,
        prompt="Add a glowing orange API gateway in the background",
        size="1024x1024",
    )

print(response.data[0].url)
\`\`\`

### Image variations (DALL-E 2)

Generate variations of an existing image.

\`\`\`python
with open("image.png", "rb") as img:
    response = client.images.create_variation(
        model="dall-e-2",
        image=img,
        n=3,
        size="512x512",
    )

for item in response.data:
    print(item.url)
\`\`\`

### Response object

\`\`\`json
{
  "created": 1720000000,
  "data": [{
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/...",
    "revised_prompt": "A futuristic API gateway..."
  }]
}
\`\`\`
    `,
  },
  {
    slug: 'audio-speech',
    title: 'Audio — Speech',
    description: 'Convert text to natural-sounding speech (TTS).',
    content: `
## Audio — Speech

Convert text into natural-sounding audio using TTS (text-to-speech) models. Supports multiple voices and output formats.

### Endpoint

\`\`\`http
POST https://api.arkeapi.com/v1/audio/speech
\`\`\`

### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`model\` | string | ✓ | \`tts-1\` (fast) or \`tts-1-hd\` (high quality) |
| \`input\` | string | ✓ | Text to synthesize. Max 4096 characters |
| \`voice\` | string | ✓ | Voice to use (see voices table) |
| \`response_format\` | string | | Output format. Default: \`mp3\` |
| \`speed\` | number | | Playback speed 0.25–4.0. Default: \`1.0\` |

### Available voices

| Voice | Character |
|---|---|
| \`alloy\` | Neutral, balanced |
| \`echo\` | Male, clear |
| \`fable\` | British accent, warm |
| \`onyx\` | Deep, authoritative |
| \`nova\` | Female, friendly |
| \`shimmer\` | Female, soft |

### Supported output formats

\`mp3\`, \`opus\`, \`aac\`, \`flac\`, \`wav\`, \`pcm\`

### Python example

\`\`\`python
from pathlib import Path

response = client.audio.speech.create(
    model="tts-1",
    voice="nova",
    input="Welcome to ArkeAPI. One key, every model, zero limits.",
)

# Save to file
speech_file = Path("output.mp3")
response.stream_to_file(speech_file)
\`\`\`

### Streaming to speakers

\`\`\`python
import pyaudio

response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input="Streaming text to speech in real time.",
    response_format="pcm",
)

p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16, channels=1, rate=24000, output=True)

for chunk in response.iter_bytes(1024):
    stream.write(chunk)

stream.stop_stream()
stream.close()
p.terminate()
\`\`\`

### Node.js example

\`\`\`typescript
import fs from 'fs'

const response = await client.audio.speech.create({
  model: 'tts-1-hd',
  voice: 'shimmer',
  input: 'Your API key unlocks access to every leading AI model.',
})

const buffer = Buffer.from(await response.arrayBuffer())
fs.writeFileSync('output.mp3', buffer)
\`\`\`
    `,
  },
  {
    slug: 'audio-transcription',
    title: 'Audio — Transcription',
    description: 'Transcribe and translate audio files using Whisper.',
    content: `
## Audio — Transcription

Transcribe speech from audio files to text using Whisper. Supports 57 languages and can optionally translate to English.

### Endpoints

\`\`\`http
POST https://api.arkeapi.com/v1/audio/transcriptions
POST https://api.arkeapi.com/v1/audio/translations
\`\`\`

### Transcription request

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`file\` | file | ✓ | Audio file (mp3, mp4, mpeg, mpga, m4a, wav, webm). Max 25MB |
| \`model\` | string | ✓ | \`whisper-1\` |
| \`language\` | string | | Source language (ISO-639-1 code). Omit to auto-detect |
| \`prompt\` | string | | Guide the transcription style or provide context |
| \`response_format\` | string | | \`json\` (default), \`text\`, \`srt\`, \`verbose_json\`, \`vtt\` |
| \`temperature\` | number | | Sampling temperature 0–1. Default: \`0\` |

### Transcribe audio

\`\`\`python
with open("speech.mp3", "rb") as audio:
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio,
    )

print(transcription.text)
\`\`\`

### Transcribe with language hint

\`\`\`python
with open("audio_zh.mp3", "rb") as audio:
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio,
        language="zh",  # Chinese
        response_format="verbose_json",
    )

print(transcription.text)
print(transcription.segments)  # timestamps per segment
\`\`\`

### Generate SRT subtitles

\`\`\`python
with open("video_audio.mp3", "rb") as audio:
    srt = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio,
        response_format="srt",
    )

# Save as subtitle file
with open("subtitles.srt", "w") as f:
    f.write(srt)
\`\`\`

### Translate audio to English

The translations endpoint transcribes audio in any language and translates to English in a single step.

\`\`\`python
with open("audio_japanese.mp3", "rb") as audio:
    translation = client.audio.translations.create(
        model="whisper-1",
        file=audio,
    )

print(translation.text)  # Output is always in English
\`\`\`

### Supported languages

Whisper supports 57+ languages including: English, Chinese, Japanese, Korean, Spanish, French, German, Arabic, Russian, Portuguese, Italian, Hindi, Turkish, and more. See the full list in the [Whisper paper](https://arxiv.org/abs/2212.04356).

### Response (JSON format)

\`\`\`json
{
  "text": "Welcome to ArkeAPI. One key, every model, zero limits."
}
\`\`\`

### Response (verbose_json format)

\`\`\`json
{
  "task": "transcribe",
  "language": "english",
  "duration": 4.2,
  "text": "Welcome to ArkeAPI.",
  "segments": [{
    "id": 0,
    "start": 0.0,
    "end": 2.1,
    "text": " Welcome to ArkeAPI.",
    "tokens": [50364, 20587, 281, 2006, 365, 7824, 13],
    "avg_logprob": -0.23
  }]
}
\`\`\`
    `,
  },
  {
    slug: 'moderations',
    title: 'Moderations',
    description: 'Check whether content complies with usage policies.',
    content: `
## Moderations

The moderations endpoint classifies text against OpenAI's usage policy, identifying harmful or unsafe content across multiple categories.

### Endpoint

\`\`\`http
POST https://api.arkeapi.com/v1/moderations
\`\`\`

### Request body

| Parameter | Type | Required | Description |
|---|---|---|---|
| \`input\` | string/array | ✓ | Text or array of texts to classify |
| \`model\` | string | | \`text-moderation-stable\` or \`text-moderation-latest\` (default) |

### Example

\`\`\`python
response = client.moderations.create(
    input="I want to learn about API security best practices.",
)

result = response.results[0]
print(f"Flagged: {result.flagged}")
print(f"Categories: {result.categories}")
\`\`\`

### Batch moderation

\`\`\`python
messages = [
    "How do I implement rate limiting?",
    "What is the OpenAI API base URL?",
    "Tell me about prompt injection attacks.",
]

response = client.moderations.create(input=messages)

for i, result in enumerate(response.results):
    print(f"[{i}] Flagged: {result.flagged}")
\`\`\`

### Response object

\`\`\`json
{
  "id": "modr-abc123",
  "model": "text-moderation-latest",
  "results": [{
    "flagged": false,
    "categories": {
      "sexual": false,
      "hate": false,
      "harassment": false,
      "self-harm": false,
      "sexual/minors": false,
      "hate/threatening": false,
      "violence/graphic": false,
      "self-harm/intent": false,
      "self-harm/instructions": false,
      "harassment/threatening": false,
      "violence": false
    },
    "category_scores": {
      "sexual": 0.000012,
      "hate": 0.000003,
      "harassment": 0.000021,
      "violence": 0.000007
    }
  }]
}
\`\`\`

### Categories explained

| Category | Description |
|---|---|
| \`hate\` | Content that promotes hate based on identity |
| \`harassment\` | Content that harasses or intimidates |
| \`violence\` | Content depicting graphic violence |
| \`sexual\` | Sexually explicit content |
| \`self-harm\` | Content that promotes self-harm |

### Usage in a pipeline

\`\`\`python
def safe_completion(client, user_message: str) -> str:
    # Check input first
    mod = client.moderations.create(input=user_message)
    if mod.results[0].flagged:
        return "Sorry, I can't respond to that request."

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_message}],
    )
    return response.choices[0].message.content
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

\`\`\`http
GET https://api.arkeapi.com/v1/models
\`\`\`

Returns all models accessible with your key.

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
| \`claude-3-7-sonnet-20250219\` | 200K | Latest Sonnet with extended thinking |
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
| \`deepseek-chat\` | 64K | Cost-effective general purpose |
| \`deepseek-reasoner\` | 64K | Chain-of-thought reasoning |

### Quota consumption

Each model consumes quota at different rates based on token usage. Visit [Dashboard → Models](/dashboard/models) to see real-time ratios and pricing per model for your plan.

### Model availability

Models available to your key depend on your purchased plan. Call \`GET /v1/models\` to confirm which models your key can access.
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

Query your usage programmatically:

\`\`\`http
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

\`\`\`http
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
| \`403\` | Forbidden | Key doesn't have access to requested model |
| \`404\` | Not Found | Unknown model ID |
| \`429\` | Rate Limited | Too many requests — back off and retry |
| \`500\` | Server Error | Upstream provider issue — retry with backoff |
| \`503\` | Unavailable | Model temporarily unavailable |

### Common errors

**Invalid API key (401)**
\`\`\`json
{"error": {"message": "Invalid API key", "type": "invalid_api_key"}}
\`\`\`
Keys start with \`sk-arke-\`. Double-check the key from your welcome email.

**Model not found (404)**
\`\`\`json
{"error": {"message": "Model not found", "type": "invalid_request_error"}}
\`\`\`
Check [Available Models](/docs/models) for valid IDs. Your plan may not include all models.

**Quota exceeded (403)**
\`\`\`json
{"error": {"message": "Insufficient quota", "type": "insufficient_quota"}}
\`\`\`
Your token quota has been exhausted. Purchase an additional plan to continue.

### Retry strategy

For transient errors (429, 500, 503), implement exponential backoff:

\`\`\`python
import time
import openai

def chat_with_retry(client, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(**kwargs)
        except openai.RateLimitError:
            time.sleep(2 ** attempt)
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
    BaseURL:   "https://api.arkeapi.com/v1",
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

// Extract h2/h3 headings from markdown content
function headingToId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  for (const line of content.split('\n')) {
    const h2 = line.match(/^## (.+)$/)
    const h3 = line.match(/^### (.+)$/)
    if (h2) headings.push({ id: headingToId(h2[1]), text: h2[1], level: 2 })
    else if (h3) headings.push({ id: headingToId(h3[1]), text: h3[1], level: 3 })
  }
  return headings
}
