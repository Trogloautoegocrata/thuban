// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thuban - IA para Bienes Raíces",
  description:
    "Plataforma de inteligencia artificial especializada en el mercado inmobiliario latinoamericano. Powered by Polaris by Visionnorth.",
  openGraph: {
    title: "Thuban - IA para Bienes Raíces",
    description:
      "Inteligencia artificial para el mercado inmobiliario latinoamericano",
    url: "https://app.thuban.online",
    siteName: "Thuban",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuban - IA para Bienes Raíces",
    description:
      "Inteligencia artificial para el mercado inmobiliario latinoamericano",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
