// design/components/ChatBubble.tsx
// Thuban — Chat message bubble for user and assistant
// Glassmorphism bubbles with avatar, text, timestamp

"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  role: "user" | "assistant";
  timestamp?: string;
  className?: string;
}

export default function ChatBubble({
  message,
  role,
  timestamp,
  className,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full animate-[fadeSlideUp_0.3s_ease-out]",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
          isUser
            ? "bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]"
            : "bg-gradient-to-br from-[#759ce7]/20 to-[#759ce7]/10 border border-[#759ce7]/20"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-[#0c0c0f]" />
        ) : (
          <Bot className="h-4 w-4 text-[#759ce7]" />
        )}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[80%] md:max-w-[70%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] text-[#0c0c0f] rounded-tr-md"
              : "bg-gradient-to-br from-[#16161a] to-[#1c1c24] border border-[#1c1c24] text-[#f0f0f5] rounded-tl-md"
          )}
        >
          {message}
        </div>
        {timestamp && (
          <div
            className={cn(
              "text-[10px] text-[#5c5c6e] mt-1 px-1",
              isUser ? "text-right" : "text-left"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
}