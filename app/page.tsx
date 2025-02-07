import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Website</h1>
      <p className="mb-4">
        This is a sample website with an AI chat widget. Click the chat button in the bottom-right corner to try it out!
      </p>
      <ChatWidget />
    </div>
  )
}

