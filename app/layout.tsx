import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Team CV Builder',
  description: 'Creează CV-uri profesionale pentru echipa ta',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}