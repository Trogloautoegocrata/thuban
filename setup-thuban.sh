#!/bin/bash
# setup-thuban.sh — Configura Thuban para deploy en Vercel + GitHub
# Ejecutar después de hacer: gh auth login && vercel login

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="/home/polaris/workspace/projects/thuban"

echo "🚀 Configurando Thuban — IA para Bienes Raíces"
echo "================================================"

# ─── 1. Crear proyecto Next.js ───
cd /home/polaris/workspace/projects
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    echo ""
    echo "📦 Paso 1: Crear proyecto Next.js..."
    npx create-next-app@latest thuban \
        --typescript \
        --tailwind \
        --eslint \
        --app \
        --src-dir \
        --import-alias "@/*" \
        --use-npm <<< "y"
    echo "✅ Next.js creado"
else
    echo "📦 Paso 1: Proyecto ya existe, saltando..."
fi

cd "$PROJECT_DIR"

# ─── 2. Instalar dependencias adicionales ───
echo ""
echo "📦 Paso 2: Instalar dependencias..."
npm install lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
    @radix-ui/react-tabs @radix-ui/react-toast \
    framer-motion clsx tailwind-merge \
    @tanstack/react-query zustand \
    openai ai @vercel/analytics 2>&1 | tail -3

# ─── 3. Configurar GitHub ───
echo ""
echo "🐙 Paso 3: Crear repo en GitHub..."
gh repo create visionnorth-mx/thuban \
    --public \
    --description "Thuban - IA para Bienes Raíces. Powered by Polaris by Visionnorth." \
    --homepage "https://app.thuban.online" \
    --remote origin \
    --push --source=. 2>/dev/null || echo "⚠️  Repo ya existe o error. Continuando..."

# Push initial commit
git add -A 2>/dev/null
git commit -m "🎉 Thuban v2.0.0 — IA para Bienes Raíces" 2>/dev/null || true
git push -u origin main 2>/dev/null || echo "⚠️  Push falló (puede no haber commits todavía)"

echo "✅ Repo creado: https://github.com/visionnorth-mx/thuban"

# ─── 4. Deploy a Vercel ───
echo ""
echo "▲ Paso 4: Deploy a Vercel..."
vercel deploy \
    --prod \
    --yes \
    --name thuban \
    --scope visionnorth-mx \
    --env NEXTAUTH_URL=https://app.thuban.online \
    --env NEXT_PUBLIC_API_URL=https://api.back-bone.dev 2>&1 | tee /tmp/vercel-deploy.log

VERCEL_URL=$(grep -oP 'https://[a-z0-9-]+\.vercel\.app' /tmp/vercel-deploy.log | head -1)
echo "✅ Deploy URL: $VERCEL_URL"

# ─── 5. Configurar dominio ───
echo ""
echo "🌐 Paso 5: Configurar dominio..."
if [ -n "$VERCEL_URL" ]; then
    vercel domain add "$VERCEL_URL" app.thuban.online 2>/dev/null || echo "⚠️  Dominio ya configurado o error"
fi

# ─── 6. Cloudflare DNS ───
echo ""
echo "☁️ Paso 6: Agregar DNS en Cloudflare"
echo ""
echo "Agrega estos registros DNS en Cloudflare para thuban.online:"
echo ""
echo "  Tipo  |  Nombre  |  Valor"
echo "-------|----------|----------------------"
echo "  CNAME | app      | cname.vercel-dns.com"
echo ""

echo "================================================"
echo "✅ SETUP COMPLETADO"
echo "   Repo:    https://github.com/visionnorth-mx/thuban"
echo "   Deploy:  ${VERCEL_URL:-pendiente}"
echo "   URL:     https://app.thuban.online"
echo ""
echo "Próximos pasos:"
echo "   1. gh auth login    # Si no lo has hecho"
echo "   2. vercel login     # Si no lo has hecho"
echo "   3. bash setup-thuban.sh"
echo "================================================"