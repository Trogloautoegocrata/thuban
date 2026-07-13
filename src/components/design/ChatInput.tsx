// design/components/ChatInput.tsx
// Thuban — Chat textarea + send button with micro-interactions

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Escribe tu mensaje...",
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setMessage("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 p-3 rounded-xl",
        "bg-gradient-to-br from-[#111114]/90 to-[#16161a]/60",
        "border border-[#1c1c24]",
        "transition-all duration-200",
        "focus-within:border-[#759ce7]/30 focus-within:shadow-[0_0_0_3px_rgba(117,156,231,0.06)]",
        className
      )}
    >
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 bg-transparent border-none outline-none resize-none",
          "text-sm text-[#f0f0f5] placeholder:text-[#5c5c6e]",
          "leading-relaxed py-1.5",
          "scrollbar-thin scrollbar-thumb-[#1c1c24]",
          "min-h-[24px] max-h-[160px]"
        )}
      />

      {/* Send button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || !message.trim()}
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center",
          "transition-all duration-200",
          message.trim() && !disabled
            ? "gold-gradient hover:shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:-translate-y-0.5"
            : "bg-[#1c1c24] text-[#5c5c6e] cursor-not-allowed"
        )}
        aria-label="Enviar mensaje"
      >
        {disabled ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}