import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Chatbot Website",
  description: "A small website with an AI chatbot",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground p-4">
          <h1 className="text-2xl font-bold">AI Chatbot Website</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

