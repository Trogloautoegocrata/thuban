// design/components/DashboardLayout.tsx
// Thuban — Dashboard layout with sidebar + header + content
// Fixed sidebar on desktop, overlay on mobile

"use client";

import { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Shield,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  credits?: number;
}

interface NavItem {
  icon: typeof Star;
  label: string;
  href: string;
  active?: boolean;
}

const defaultNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: MessageSquare, label: "Chat IA", href: "/dashboard/chat" },
  { icon: TrendingUp, label: "Análisis", href: "/dashboard/analytics" },
  { icon: Shield, label: "Negociación", href: "/dashboard/negotiation" },
  { icon: Users, label: "Clientes", href: "/dashboard/clients" },
];

export default function DashboardLayout({
  children,
  userName = "Usuario",
  userEmail = "usuario@ejemplo.com",
  credits = 5,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0f] flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[260px] z-50 transition-transform duration-300 lg:translate-x-0",
          "bg-gradient-to-b from-[#111114] to-[#0c0c0f] border-r border-[#1c1c24]",
          "flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-16 md:h-[72px] border-b border-[#1c1c24]">
          <a href="/" className="flex items-center gap-2.5">
            <Star className="h-6 w-6 text-[#f59e0b] fill-[#f59e0b]" />
            <span className="font-sans text-lg font-bold text-white">Thuban</span>
          </a>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-[#5c5c6e] hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {defaultNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                item.active
                  ? "bg-[#759ce7]/10 text-[#759ce7] border-l-[3px] border-[#759ce7] pl-[calc(0.75rem-3px)]"
                  : "text-[#9898a8] hover:text-white hover:bg-white/[0.03] border-l-[3px] border-transparent pl-[calc(0.75rem)]"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-[#1c1c24] px-4 py-4 space-y-3">
          {/* Credits badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
            <Star className="h-4 w-4 text-[#f59e0b]" />
            <span className="text-xs text-[#fbbf24] font-medium">
              {credits} créditos disponibles
            </span>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-xs font-bold text-[#0c0c0f]">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {userName}
              </div>
              <div className="text-xs text-[#5c5c6e] truncate">{userEmail}</div>
            </div>
          </div>

          {/* Logout */}
          <a
            href="/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#9898a8] hover:text-[#f87171] hover:bg-[#f87171]/5 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-[260px]">
        {/* Top header */}
        <header
          className={cn(
            "sticky top-0 z-30 h-16 md:h-[72px] flex items-center px-4 md:px-8 transition-all duration-300",
            scrolled
              ? "bg-[#0c0c0f]/80 backdrop-blur-xl border-b border-[#1c1c24]/80"
              : "bg-transparent"
          )}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 mr-3 text-[#9898a8] hover:text-white transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-[#f59e0b]" />
            <span className="text-sm text-[#9898a8]">
              Dashboard
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}