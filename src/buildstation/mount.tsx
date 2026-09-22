import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './buildstation.css'

export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
}
