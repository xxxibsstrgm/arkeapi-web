import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDocSection, DOC_NAV, extractHeadings } from '@/lib/docs-content'
import { TableOfContents } from '@/components/docs/table-of-contents'
import { DocCopyButtons } from '@/components/docs/doc-copy-buttons'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const section = getDocSection(slug)
  if (!section) return {}
  return {
    title: `${section.title} — ArkeAPI Docs`,
    description: section.description,
  }
}

export async function generateStaticParams() {
  return DOC_NAV.map(({ slug }) => ({ slug }))
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Render markdown to HTML with Groq-style code blocks
function renderContent(md: string): string {
  return md
    // Code blocks — Groq-style dark block with lang label, line numbers, copy button
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const trimmed = code.trim()
      const escaped = trimmed
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      const lines = escaped.split('\n')
      const langLabel = lang ?? 'text'
      const lineNumsHtml = lines.map((_: string, i: number) => `<div class="dc-ln">${i + 1}</div>`).join('')
      const encoded = encodeURIComponent(trimmed)
      return [
        `<div class="dc-block">`,
        `<div class="dc-hd">`,
        `<span class="dc-lang">${langLabel}</span>`,
        `<button class="doc-cp" data-c="${encoded}">Copy</button>`,
        `</div>`,
        `<div class="dc-body">`,
        `<div class="dc-lns" aria-hidden="true">${lineNumsHtml}</div>`,
        `<pre class="dc-pre">${escaped}</pre>`,
        `</div>`,
        `</div>`,
      ].join('')
    })
    // Tables
    .replace(/^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n?)+)/gm, (_, header, rows) => {
      const ths = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('')
      const trs = rows.trim().split('\n').map((row: string) => {
        const tds = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('')
        return `<tr>${tds}</tr>`
      }).join('')
      return `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="doc-inline-code">$1</code>')
    // h2 with anchor id
    .replace(/^## (.+)$/gm, (_, text) =>
      `<h2 class="doc-h2" id="${slugify(text)}">${text}</h2>`)
    // h3 with anchor id
    .replace(/^### (.+)$/gm, (_, text) =>
      `<h3 class="doc-h3" id="${slugify(text)}">${text}</h3>`)
    .replace(/^#### (.+)$/gm, '<h4 class="doc-h4">$1</h4>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, '<ul class="doc-ul">$1</ul>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="doc-hr" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="doc-link">$1</a>')
    // Paragraphs
    .replace(/^(?!<)(.+)$/gm, '<p class="doc-p">$1</p>')
    .replace(/<p class="doc-p"><\/p>/g, '')
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const section = getDocSection(slug)
  if (!section) notFound()

  const currentIdx = DOC_NAV.findIndex(s => s.slug === slug)
  const prev = currentIdx > 0 ? DOC_NAV[currentIdx - 1] : null
  const next = currentIdx < DOC_NAV.length - 1 ? DOC_NAV[currentIdx + 1] : null

  const html = renderContent(section.content)
  const headings = extractHeadings(section.content)

  return (
    <div className="flex items-start gap-12 xl:gap-16">
      {/* Main content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Page header */}
        <div className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs font-bold uppercase mb-3"
            style={{ color: '#FF4F00', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}>
            Documentation
          </p>
          <h1 className="mb-3" style={{ fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.04em' }}>
            {section.title}
          </h1>
          <p className="text-base" style={{ color: 'var(--muted-text)' }}>
            {section.description}
          </p>
        </div>

        {/* Styles */}
        <style>{`
          /* Groq-style code block */
          .dc-block { background: #161618; border: 1px solid #2A2A2C; border-radius: 0.75rem; overflow: hidden; margin: 1.25rem 0; }
          .dc-hd { background: #111113; border-bottom: 1px solid #2A2A2C; padding: 0.5rem 1rem; display: flex; align-items: center; justify-content: space-between; }
          .dc-lang { font-family: "JetBrains Mono","Fira Code",monospace; font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #555553; }
          .doc-cp { font-family: "JetBrains Mono",monospace; font-size: 0.6875rem; color: #555553; background: none; border: none; cursor: pointer; padding: 0; transition: color 0.15s; }
          .doc-cp:hover { color: #F5F5F3; }
          .doc-cp.copied { color: #FF4F00; }
          .dc-body { display: flex; overflow-x: auto; padding: 1.25rem 0; }
          .dc-lns { color: #3A3A38; font-family: "JetBrains Mono",monospace; font-size: 0.8125rem; line-height: 1.7; text-align: right; padding: 0 1rem; user-select: none; min-width: 2.5rem; flex-shrink: 0; }
          .dc-ln { line-height: 1.7; }
          .dc-pre { font-family: "JetBrains Mono","Fira Code","SF Mono",monospace; font-size: 0.8125rem; line-height: 1.7; color: rgba(255,255,255,0.78); padding-right: 1.5rem; flex: 1; margin: 0; overflow-x: auto; white-space: pre; }
          /* Prose */
          .doc-h2 { font-size: 1.375rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.5rem 0 1rem; scroll-margin-top: 80px; }
          .doc-h3 { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.015em; margin: 2rem 0 0.75rem; scroll-margin-top: 80px; }
          .doc-h4 { font-size: 0.95rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }
          .doc-p { font-size: 0.9375rem; line-height: 1.75; color: var(--muted-text); margin: 0.75rem 0; }
          .doc-p strong { color: var(--foreground); }
          .doc-inline-code { font-family: "JetBrains Mono","Fira Code",monospace; font-size: 0.8125rem; background: var(--surface); color: #ff3d00; padding: 0.15em 0.4em; border-radius: 0.3rem; border: 1px solid var(--border); }
          .doc-ul { margin: 0.75rem 0 0.75rem 1.25rem; list-style: disc; }
          .doc-ul li { font-size: 0.9375rem; line-height: 1.7; color: var(--muted-text); margin: 0.3rem 0; }
          .doc-link { color: #ff3d00; text-decoration: underline; text-underline-offset: 3px; }
          .doc-hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
          .doc-table-wrap { overflow-x: auto; margin: 1.25rem 0; }
          .doc-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
          .doc-table th { text-align: left; padding: 0.6rem 1rem; font-weight: 600; font-size: 0.8125rem; border-bottom: 2px solid var(--border); }
          .doc-table td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); color: var(--muted-text); }
          .doc-table td code, .doc-table th code { font-family: "JetBrains Mono",monospace; background: var(--surface); padding: 0.1em 0.35em; border-radius: 0.25rem; font-size: 0.8rem; }
        `}</style>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        {/* Prev/Next navigation */}
        <div className="flex items-center justify-between mt-14 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}>
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="group flex flex-col"
              style={{ color: 'var(--muted-text)' }}>
              <span className="text-xs uppercase tracking-wider mb-1"
                style={{ letterSpacing: '0.08em' }}>← Previous</span>
              <span className="text-sm font-semibold group-hover:opacity-70 transition-opacity"
                style={{ color: 'var(--foreground)' }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/docs/${next.slug}`} className="group flex flex-col text-right"
              style={{ color: 'var(--muted-text)' }}>
              <span className="text-xs uppercase tracking-wider mb-1"
                style={{ letterSpacing: '0.08em' }}>Next →</span>
              <span className="text-sm font-semibold group-hover:opacity-70 transition-opacity"
                style={{ color: 'var(--foreground)' }}>{next.title}</span>
            </Link>
          ) : <div />}
        </div>

        <DocCopyButtons />
      </div>

      {/* Right: On this page */}
      <aside className="hidden xl:block w-48 shrink-0 sticky top-8 pt-2">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  )
}
