import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/danang-buildstation.css'

export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
}
