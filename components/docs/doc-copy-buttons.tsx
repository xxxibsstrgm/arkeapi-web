'use client'
import { useEffect } from 'react'

// Wires up copy functionality for all .doc-cp buttons rendered via dangerouslySetInnerHTML
export function DocCopyButtons() {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>('button.doc-cp[data-c]')
    buttons.forEach(btn => {
      btn.onclick = async () => {
        const encoded = btn.getAttribute('data-c') ?? ''
        const code = decodeURIComponent(encoded)
        await navigator.clipboard.writeText(code)
        btn.textContent = 'Copied!'
        btn.classList.add('copied')
        setTimeout(() => {
          btn.textContent = 'Copy'
          btn.classList.remove('copied')
        }, 2000)
      }
    })
  }, [])

  return null
}
