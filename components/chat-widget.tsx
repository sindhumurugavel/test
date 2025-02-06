"use client"

import * as React from "react"
import { useChat } from "ai/react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef]) // Added messagesEndRef to dependencies

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    try {
      await handleSubmit(e)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn("fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg", isOpen && "hidden")}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Toggle chat</span>
      </Button>

      {/* Chat Widget */}
      <Card
        className={cn(
          "fixed bottom-4 right-4 w-full max-w-[400px] shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-[200%]",
        )}
      >
        <CardHeader className="flex flex-row items-center space-x-2">
          <CardTitle>Chat with AI</CardTitle>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close chat</span>
          </Button>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%]",
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 bg-muted">AI is typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <form onSubmit={onSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}


