"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  userName: string
  userId: string
  createdAt: string
}

interface Props {
  destination: string
}

export default function Chat({ destination }: Props) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?destination=${encodeURIComponent(destination)}`)
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [destination])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !user) return
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: input,
          destination,
          userName: user.fullName || user.emailAddresses[0].emailAddress,
        }),
      })
      const newMessage = await res.json()
      setMessages((prev) => [...prev, newMessage])
      setInput("")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="border rounded-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-primary text-white p-4">
        <h2 className="font-bold text-lg">💬 {destination} Travel Community</h2>
        <p className="text-sm opacity-80">Chat with fellow travellers heading to {destination}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {fetching ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin h-6 w-6 text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-sm">
            No messages yet. Be the first to say hello! 👋
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userName === (user?.fullName || user?.emailAddresses[0]?.emailAddress)
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs rounded-2xl px-4 py-2 space-y-1 ${isMe ? "bg-primary text-white" : "bg-muted"}`}>
                  {!isMe && <p className="text-xs font-semibold opacity-70">{msg.userName}</p>}
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs ${isMe ? "opacity-60" : "text-muted-foreground"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button size="icon" onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}