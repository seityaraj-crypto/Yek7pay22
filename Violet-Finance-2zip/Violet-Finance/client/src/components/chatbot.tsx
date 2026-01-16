import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Minus, Trash2, Maximize2, Sparkles } from "lucide-react";
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
  const [isMinimized, setIsMinimized] = useState(false);
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
      {!isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-6 z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-30 animate-spin" style={{ animationDuration: '3s' }} />
          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 hover:scale-110 transition-all p-0 border-2 border-white/20 flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center">
              <Sparkles className="absolute h-3 w-3 text-yellow-300 -top-1 -right-1 animate-ping" style={{ animationDuration: '1.5s' }} />
              <Sparkles className="absolute h-2 w-2 text-cyan-300 -bottom-0.5 -left-1 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
              <Bot className="h-7 w-7 text-white drop-shadow-lg" />
            </div>
          </Button>
        </div>
      )}

      {isMinimized && (
        <div 
          className="fixed bottom-20 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-2xl z-50 flex items-center gap-3 px-4 py-3 cursor-pointer hover:scale-105 transition-all"
          onClick={() => { setIsMinimized(false); setIsOpen(true); }}
        >
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm font-bold">Yek7pay AI Active</span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-white/20 p-0" 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(false); setIsOpen(true); }}
              title="Expand"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-white hover:bg-red-500/50 p-0" 
              onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <Card className="fixed bottom-0 right-0 w-full h-full md:bottom-24 md:right-6 md:w-[350px] md:h-[500px] shadow-2xl z-50 flex flex-col border-white/10 bg-[#000a26] text-white overflow-hidden rounded-none md:rounded-3xl">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex flex-row items-center justify-between shrink-0 sticky top-0 z-10">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              Yek7pay AI
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20" 
                onClick={async () => {
                  if (conversationId) {
                    await fetch(`/api/conversations/${conversationId}`, { method: "DELETE" });
                    setConversationId(null);
                    queryClient.invalidateQueries({ queryKey: ["/api/conversations/active"] });
                    queryClient.invalidateQueries({ queryKey: [`/api/conversations/${conversationId}`] });
                  }
                }}
                title="Clear Chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20" 
                onClick={() => { setIsOpen(false); setIsMinimized(true); }}
                title="Minimize"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-red-500/50" 
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0">
            <ScrollArea className="flex-1 p-2 md:p-4 min-h-0">
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
            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2 shrink-0">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button 
                size="icon" 
                className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 flex-shrink-0" 
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
