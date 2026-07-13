export const APP_CONFIG = {
  name: "Thuban",
  description: "Inteligencia Artificial para Bienes Raíces",
  slogan: "Potencia tu negocio inmobiliario con IA especializada",
  url: "https://app.thuban.online",
  // API endpoints (BACKBONE integration)
  api: {
    backbone: process.env.NEXT_PUBLIC_API_URL || "https://api.back-bone.dev",
    chat: "/api/chat",
    auth: "/api/auth",
  },
  // Features
  features: [
    {
      title: "Descripciones de Propiedades",
      description:
        "Genera descripciones profesionales y atractivas para tus listings en segundos.",
      icon: "MessageSquare",
      color: "text-amber-400",
    },
    {
      title: "Análisis de Mercado",
      description:
        "Obtén insights sobre tendencias, precios y oportunidades de inversión.",
      icon: "TrendingUp",
      color: "text-blue-400",
    },
    {
      title: "Negociación Inmobiliaria",
      description:
        "Estrategias y técnicas para cerrar los mejores tratos con confianza.",
      icon: "Shield",
      color: "text-emerald-400",
    },
    {
      title: "Atención a Clientes",
      description:
        "Respuestas profesionales y seguimiento efectivo para cada prospecto.",
      icon: "Users",
      color: "text-orange-400",
    },
  ],
  // Credits system
  freeCredits: 5,
};
