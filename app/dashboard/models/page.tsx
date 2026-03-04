'use client'

import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability, type PricingType } from '@/lib/model-catalog'

// ── Provider SVG logos ───────────────────────────────────────────────────
const PROVIDER_PATHS: Record<string, string> = {
  OpenAI:         'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  'OpenAI Plus':  'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  // Claude-specific icon (SimpleIcons "claude")
  Anthropic:      'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
  // Gemini 4-pointed star sparkle (SimpleIcons "googlegemini")
  Gemini:         'M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81',
  // xAI/Grok logo (X shape) — Grok not yet in SimpleIcons
  Grok:           'M14.258 10.152 23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309H24L14.258 10.152zm-2.895 3.293-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246l-6.453-9.044z',
  Mistral:        'M0 0h4v4H0zm6 0h4v4H6zM0 6h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4zM6 12h4v4H6zm6 0h4v4h-4zM0 18h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4z',
  // Ollama llama logo (SimpleIcons "ollama")
  Ollama:         'M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z',
  DeepSeek:       'M23.748 9.817c-.386.048-.74.172-1.058.388-.285.192-.57.432-.907.695-1.035.814-1.874 1.225-3.04 1.24-.52.008-1.053-.08-1.616-.336-1.01-.455-1.73-.91-2.35-1.29-.4-.244-.756-.456-1.11-.624-.604-.28-1.167-.44-1.778-.44-.988 0-1.843.367-2.605.863-.044.026-.09.047-.135.07.1-.33.254-.636.456-.91l.004-.005c.13-.176.278-.34.44-.49l.002-.002a4.35 4.35 0 0 1 2.903-1.104c.456 0 .91.072 1.362.218.44.14.898.35 1.386.582l.012.007c.507.246 1.052.447 1.622.523.57.077 1.178.042 1.812-.168.632-.21 1.166-.553 1.594-.947.43-.393.75-.836.9-1.242.08-.217.12-.427.11-.62a.983.983 0 0 0-.11-.437 2.36 2.36 0 0 0-.347-.498c-.156-.174-.352-.35-.592-.507.237.016.476.07.72.177.338.15.673.393.98.73.304.336.574.764.774 1.28l.003.007.003.007c.074.195.142.4.208.612.15.47.298.985.527 1.434.46.905 1.118 1.63 2.32 1.89.106.022.21.04.31.055.2.03.38.05.545.06v.002zM4.615 13.85c-.228.17-.444.313-.65.428-.536.3-1.024.406-1.49.302-.463-.104-.85-.396-1.2-.811-.27-.32-.5-.7-.71-1.094l-.003-.007c-.29-.546-.613-1.11-1.05-1.565C-.057 10.41-.295 9.978-.34 9.5c-.045-.48.094-1.02.52-1.618.284-.395.65-.78 1.09-1.126.44-.347.945-.657 1.5-.893.843-.358 1.807-.547 2.773-.462.962.083 1.94.444 2.802 1.176a.57.57 0 0 0-.043.046 4.57 4.57 0 0 0-.487.785 4.61 4.61 0 0 0-.34 1.09 4.54 4.54 0 0 0-.025 1.156c.05.425.165.84.344 1.227a4.467 4.467 0 0 0 1.26 1.616c-.453.017-.888.122-1.267.294a4.38 4.38 0 0 0-.997.646l-.003.003-.003.002z',
}

function Logo({ provider, color, size = 22 }: { provider: string; color: string; size?: number }) {
  const path = PROVIDER_PATHS[provider]
  const letter = provider === 'Kimi' ? 'K' : provider === 'Qwen' ? 'Q'
    : provider === 'Flux' ? 'F' : provider === 'ByteDance' ? 'B'
    : provider[0]

  if (!path) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: color + '18', border: `1.5px solid ${color}35`,
        fontSize: Math.round(size * 0.44), fontWeight: 700, color,
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.3px',
      }}>
        {letter}
      </span>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

// ── Capability badges ────────────────────────────────────────────────────
const CAP_META: Record<Capability, { label: string; bg: string; text: string }> = {
  vision:      { label: 'Vision',   bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
  tools:       { label: 'Tools',    bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
  reasoning:   { label: 'Thinking', bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
  audio:       { label: 'Audio',    bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
  embedding:   { label: 'Embed',    bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
  'image-gen': { label: 'Image',    bg: 'rgba(236,72,153,0.12)', text: '#db2777' },
  'video-gen': { label: 'Video',    bg: 'rgba(239,68,68,0.12)',  text: '#dc2626' },
}

function CapBadge({ cap }: { cap: Capability }) {
  const m = CAP_META[cap]
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide whitespace-nowrap"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  )
}

// ── Pricing type ─────────────────────────────────────────────────────────
const PRICING_META: Record<PricingType, { label: string; short: string; bg: string; text: string }> = {
  'token':       { label: 'Pay per Token',   short: 'Token',  bg: 'rgba(15,118,110,0.10)', text: '#0f766e' },
  'per-image':   { label: 'Pay per Image',   short: 'Image',  bg: 'rgba(147,51,234,0.10)', text: '#9333ea' },
  'per-video':   { label: 'Pay per Video',   short: 'Video',  bg: 'rgba(220,38,38,0.10)',  text: '#dc2626' },
  'per-request': { label: 'Pay per Request', short: 'Req',    bg: 'rgba(180,83,9,0.10)',   text: '#b45309' },
}

// ── Copy button ──────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])
  return (
    <button onClick={copy} title="Copy model ID"
      className="opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity ml-1 shrink-0 text-xs"
      style={{ color: 'var(--muted-text)' }}>
      {copied ? '✓' : '⎘'}
    </button>
  )
}

function fmt(n: number) {
  if (n === 0) return '—'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1)    return `$${n.toFixed(3)}`
  return `$${n.toFixed(2)}`
}

// ── View toggle icons ────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <line x1="5" y1="4" x2="14" y2="4" />
      <line x1="5" y1="8" x2="14" y2="8" />
      <line x1="5" y1="12" x2="14" y2="12" />
      <circle cx="2" cy="4" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="8" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="12" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function ModelsPage() {
  return <AuthGuard><ModelsContent /></AuthGuard>
}

function ModelsContent() {
  const { apiKey } = useDashboard()
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [filterProvider, setFilterProvider] = useState<string>('All')
  const [filterCap, setFilterCap] = useState<Capability | 'All'>('All')
  const [filterType, setFilterType] = useState<PricingType | 'All'>('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'name' | 'price-asc' | 'price-desc'>('name')

  const { data } = useSWR(
    apiKey ? ['/api/dashboard/models', apiKey] : null,
    ([url, key]) => fetch(url, { headers: { 'x-api-key': key } }).then(r => r.json()),
    { revalidateOnFocus: false }
  )
  const availableSet = useMemo(() => new Set<string>(data?.models ?? []), [data])
  const allEntries = useMemo(() => Object.entries(MODEL_CATALOG), [])

  const rows = useMemo(() => {
    return allEntries
      .filter(([id, info]) => {
        if (filterProvider !== 'All' && info.provider !== filterProvider) return false
        if (filterCap !== 'All' && !info.caps.includes(filterCap as Capability)) return false
        if (filterType !== 'All' && info.pricingType !== filterType) return false
        if (filterNew && !info.new) return false
        if (search) {
          const q = search.toLowerCase()
          return id.toLowerCase().includes(q) || info.provider.toLowerCase().includes(q) || (info.description ?? '').toLowerCase().includes(q)
        }
        return true
      })
      .sort(([aId, a], [bId, b]) => {
        if (sort === 'price-asc') return (a.input ?? a.pricePerRequest ?? 0) - (b.input ?? b.pricePerRequest ?? 0)
        if (sort === 'price-desc') return (b.input ?? b.pricePerRequest ?? 0) - (a.input ?? a.pricePerRequest ?? 0)
        return aId.localeCompare(bId)
      })
  }, [allEntries, filterProvider, filterCap, filterType, filterNew, search, sort])

  const tokenCount = allEntries.filter(([, m]) => m.pricingType === 'token').length
  const imageCount = allEntries.filter(([, m]) => m.pricingType !== 'token').length

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase mb-1.5"
          style={{ color: '#FF4F00', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}>
          Model Marketplace
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.04em' }}>
            {allEntries.length} Models
          </h1>
          <p className="text-sm mb-0.5" style={{ color: 'var(--muted-text)' }}>
            {tokenCount} token-based · {imageCount} image/video
            {availableSet.size > 0 && ` · ${availableSet.size} active with your key`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2.5 mb-5">
        {/* Search + sort + view toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" placeholder="Search models..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 px-3.5 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)', minWidth: '180px', maxWidth: '260px' }}
          />
          <div className="flex items-center gap-1 ml-auto flex-wrap">
            <span className="text-xs mr-0.5" style={{ color: 'var(--muted-text)' }}>Sort:</span>
            <button onClick={() => setSort('name')}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: sort === 'name' ? 'var(--foreground)' : 'var(--surface)',
                color: sort === 'name' ? 'var(--background)' : 'var(--muted-text)',
                border: `1px solid ${sort === 'name' ? 'var(--foreground)' : 'var(--border)'}`,
              }}>
              Name
            </button>
            <button onClick={() => setSort(s => s === 'price-asc' ? 'price-desc' : 'price-asc')}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: sort !== 'name' ? 'var(--foreground)' : 'var(--surface)',
                color: sort !== 'name' ? 'var(--background)' : 'var(--muted-text)',
                border: `1px solid ${sort !== 'name' ? 'var(--foreground)' : 'var(--border)'}`,
              }}>
              Price {sort === 'price-desc' ? '↓' : '↑'}
            </button>
            <button onClick={() => setFilterNew(v => !v)}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: filterNew ? 'rgba(34,197,94,0.12)' : 'var(--surface)',
                color: filterNew ? '#16a34a' : 'var(--muted-text)',
                border: `1px solid ${filterNew ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
              }}>
              New
            </button>
            {/* View mode toggle */}
            <div className="flex items-center rounded-lg border overflow-hidden ml-1"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'grid' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="Grid view"
              >
                <GridIcon active={viewMode === 'grid'} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'table' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="List view"
              >
                <ListIcon active={viewMode === 'table'} />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing type */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'token', 'per-image', 'per-video', 'per-request'] as const).map(t => {
            const active = filterType === t
            const meta = t !== 'All' ? PRICING_META[t] : null
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {t === 'All' ? 'All Types' : meta!.label}
              </button>
            )
          })}
        </div>

        {/* Provider tabs */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...PROVIDERS] as string[]).map(p => {
            const color = p === 'All' ? undefined : Object.values(MODEL_CATALOG).find(m => m.provider === p)?.providerColor
            const active = filterProvider === p
            return (
              <button key={p} onClick={() => setFilterProvider(p)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: active ? (color ?? '#FF4F00') + '18' : 'var(--surface)',
                  color: active ? (color ?? '#FF4F00') : 'var(--muted-text)',
                  border: `1px solid ${active ? (color ?? '#FF4F00') + '55' : 'var(--border)'}`,
                }}>
                {color && <Logo provider={p} color={active ? (color ?? '#FF4F00') : 'var(--muted-text)'} size={14} />}
                {p}
              </button>
            )
          })}
        </div>

        {/* Capability filter */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...Object.keys(CAP_META)] as string[]).map(key => {
            const active = filterCap === key
            const meta = key !== 'All' ? CAP_META[key as Capability] : null
            return (
              <button key={key} onClick={() => setFilterCap(key as Capability | 'All')}
                className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {key === 'All' ? 'All Capabilities' : meta!.label}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs mb-4" style={{ color: 'var(--muted-text)' }}>
        Showing {rows.length} of {allEntries.length} models
      </p>

      {/* ── Grid view ─────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        rows.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
            No models match your filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--border)',
          }}>
            {rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group flex flex-col p-5 transition-colors"
                  style={{ backgroundColor: 'var(--surface)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
                >
                  {/* Provider row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: info.providerColor + '12' }}>
                        <Logo provider={info.provider} color={info.providerColor} size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: info.providerColor, letterSpacing: '0.08em' }}>
                        {info.provider}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                    </div>
                  </div>

                  {/* Model name */}
                  <div className="flex items-start gap-1 mb-2">
                    <span className="text-sm font-mono font-semibold leading-snug"
                      style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                      {id}
                    </span>
                    <CopyButton text={id} />
                  </div>

                  {/* Description */}
                  {info.description && (
                    <p className="text-xs leading-relaxed mb-3 flex-1"
                      style={{ color: 'var(--muted-text)' }}>
                      {info.description}
                    </p>
                  )}

                  {/* Price chip */}
                  <code className="text-xs font-mono px-2.5 py-1.5 rounded block border mb-3"
                    style={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: info.providerColor,
                    }}>
                    {isPerReq
                      ? `${fmt(info.pricePerRequest ?? 0)} ${info.priceUnit ?? ''}`
                      : `In: ${fmt(info.input ?? 0)}  ·  Out: ${fmt(info.output ?? 0)}${info.context ? `  ·  ${info.context}` : ''}`
                    }
                  </code>

                  {/* Bottom row: pricing type + capabilities */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                      {priceMeta.short}
                    </span>
                    {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}

      {/* ── Table view ────────────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <div className="grid text-xs font-semibold uppercase px-5 py-2.5 border-b"
            style={{
              gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr',
              color: 'var(--muted-text)', letterSpacing: '0.06em',
              borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt, rgba(0,0,0,0.03))',
            }}>
            <span>Model</span>
            <span>Provider</span>
            <span>Input /1M</span>
            <span>Output /1M</span>
            <span>Context</span>
            <span>Capabilities</span>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
              No models match your filters.
            </div>
          ) : (
            rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group grid items-center px-5 py-3 border-b last:border-0 transition-colors"
                  style={{ gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr', borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Model name + type badge + description */}
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-mono font-medium"
                        style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                        {id}
                      </span>
                      <CopyButton text={id} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                        {priceMeta.short}
                      </span>
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                      {info.description && (
                        <span className="text-[11px] hidden sm:inline truncate"
                          style={{ color: 'var(--muted-text)' }}>{info.description}</span>
                      )}
                    </div>
                  </div>

                  {/* Provider */}
                  <div className="flex items-center gap-2 min-w-0">
                    <Logo provider={info.provider} color={info.providerColor} size={20} />
                    <span className="text-sm truncate" style={{ color: 'var(--foreground)' }}>{info.provider}</span>
                  </div>

                  {/* Input price */}
                  <span className="text-sm font-medium" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq
                      ? <>{fmt(info.pricePerRequest ?? 0)}<span className="text-[10px] ml-0.5" style={{ color: 'var(--muted-text)' }}>{info.priceUnit}</span></>
                      : fmt(info.input ?? 0)
                    }
                  </span>

                  {/* Output price */}
                  <span className="text-sm" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq ? <span style={{ color: 'var(--muted-text)' }}>—</span> : fmt(info.output ?? 0)}
                  </span>

                  {/* Context */}
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-text)' }}>
                    {info.context ?? '—'}
                  </span>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1">
                    {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
