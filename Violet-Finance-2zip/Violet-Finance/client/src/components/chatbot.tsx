import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [streamingMessage, setStreamingMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Create or get conversation
  const { data: conversation } = useQuery({
    queryKey: ["/api/conversations/active"],
    queryFn: async () => {
      const res = await fetch("/api/conversations");
      const conversations = await res.json();
      if (conversations.length > 0) {
        return conversations[0];
      }
      const newRes = await apiRequest("POST", "/api/conversations", { title: "Yek7pay AI Chat" });
      return newRes.json();
    },
    enabled: isOpen && !conversationId,
  });

  useEffect(() => {
    if (conversation) {
      setConversationId(conversation.id);
    }
  }, [conversation]);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: [`/api/conversations/${conversationId}`],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await fetch(`/api/conversations/${conversationId}`);
      const data = await res.json();
      return data.messages;
    },
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage]);

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;

    const userContent = input;
    setInput("");
    setStreamingMessage("");

    // Optimistically update UI
    queryClient.setQueryData([`/api/conversations/${conversationId}`], (old: Message[] = []) => [
      ...old,
      { role: "user", content: userContent }
    ]);

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userContent }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  assistantContent += data.content;
                  setStreamingMessage(assistantContent);
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }

      setStreamingMessage("");
      queryClient.invalidateQueries({ queryKey: [`/api/conversations/${conversationId}`] });
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-110 transition-all z-50 p-0 shadow-cyan-500/20 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] h-[500px] shadow-2xl z-50 flex flex-col border-white/10 bg-[#000a26] text-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              Yek7pay AI (Powered by GPT-5)
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && !streamingMessage && (
                  <div className="text-center py-10 opacity-50 italic text-sm">
                    How can Yek7pay AI help you today?
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white/10 text-white rounded-tl-none border border-white/5">
                      {streamingMessage}
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" className="rounded-full h-8 w-8 bg-primary hover:bg-primary/90" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
