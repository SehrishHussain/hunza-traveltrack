import '@/styles/global.css'
import { ReactNode } from 'react'
import AuthProvider from './context/AuthProvider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
      <body>{children}</body>
      </AuthProvider>
    </html>
  )
}
