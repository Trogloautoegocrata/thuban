// design/components/FeatureCard.tsx
// Thuban — Feature card with icon, title, description
// Glassmorphism, hover effects, gold accent border

"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: string;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  accentColor = "rgba(245,158,11,0.1)",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl p-6 md:p-7 transition-all duration-300",
        "bg-gradient-to-br from-[#111114]/85 to-[#16161a]/50",
        "backdrop-blur-xl border border-white/[0.06]",
        "hover:-translate-y-1 hover:border-[#f59e0b]/20",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {/* Accent glow dot */}
      <div
        className="absolute -top-px left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Icon container */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 group-hover:scale-105"
        style={{ background: accentColor }}
      >
        <Icon className="h-6 w-6" style={{ color: accentColor === "rgba(245,158,11,0.1)" ? "#f59e0b" : "#759ce7" }} />
      </div>

      {/* Title */}
      <h3 className="font-sans text-lg md:text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#9898a8] leading-relaxed">
        {description}
      </p>
    </div>
  );
}