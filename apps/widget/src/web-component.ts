import { createElement } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { GuardianHITL } from './GuardianHITL'

class GuardianHITLElement extends HTMLElement {
  private root: Root | null = null

  static get observedAttributes() {
    return ['ws-url']
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const container = document.createElement('div')
    shadow.appendChild(container)

    this.root = createRoot(container)
    this.render()
  }

  disconnectedCallback() {
    this.root?.unmount()
  }

  attributeChangedCallback() {
    this.render()
  }

  private render() {
    const wsUrl = this.getAttribute('ws-url') || ''
    this.root?.render(createElement(GuardianHITL, { wsUrl }))
  }
}

if (!customElements.get('guardian-hitl')) {
  customElements.define('guardian-hitl', GuardianHITLElement)
}

export { GuardianHITLElement }