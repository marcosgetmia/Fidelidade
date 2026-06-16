import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Azul Fidelidade — BI',
  description: 'Painel de Inteligência de Negócio do Azul Fidelidade',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
