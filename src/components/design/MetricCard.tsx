// design/components/MetricCard.tsx
// Thuban — Metric card for dashboard stats
// Dark card with large number + label + optional trend indicator

"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: number; // positive = up, negative = down
  trendLabel?: string;
  className?: string;
}

export default function MetricCard({
  icon: Icon,
  value,
  label,
  trend,
  trendLabel,
  className,
}: MetricCardProps) {
  const isPositive = trend !== undefined && trend >= 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div
      className={cn(
        "relative rounded-xl p-5 md:p-6 transition-all duration-250",
        "bg-gradient-to-br from-[#111114]/90 to-[#16161a]/60",
        "border border-[#1c1c24]",
        "hover:border-[#759ce7]/20 hover:shadow-[0_4px_20px_rgba(117,156,231,0.06)]",
        className
      )}
    >
      {/* Top row: icon + optional trend */}
      <div className="flex items-start justify-between mb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#759ce7]/10">
          <Icon className="h-5 w-5 text-[#759ce7]" />
        </div>
        {trend !== undefined && (
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              isPositive
                ? "bg-[#34d399]/10 text-[#34d399]"
                : "bg-[#f87171]/10 text-[#f87171]"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-0.5">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm text-[#9898a8]">{label}</div>

      {/* Optional trend label */}
      {trendLabel && (
        <div className="text-xs text-[#5c5c6e] mt-1">{trendLabel}</div>
      )}
    </div>
  );
}