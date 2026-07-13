#!/bin/bash
# setup-thuban.sh — Autentica GitHub, crea repo, y deploy a Vercel
# Ejecutar: bash setup-thuban.sh

set -e
cd "$(dirname "$0")"

echo "🚀 Thuban — Setup para GitHub + Vercel"
echo "========================================="

# ─── 1. Autenticación ───
echo ""
echo "🔑 Paso 1: Autenticar en GitHub"
echo "   Abrirá el navegador para login..."
gh auth login --web --hostname github.com 2>&1 || {
    echo "⚠️  gh auth falló. Ejecuta manual: gh auth login"
    echo "   Luego corre este script de nuevo"
    exit 1
}

echo ""
echo "🔑 Paso 2: Autenticar en Vercel"
echo "   Abrirá el navegador para login..."
npx vercel login 2>&1 || {
    echo "⚠️  vercel login falló. Ejecuta manual: npx vercel login"
    exit 1
}

# ─── 2. Crear repo en GitHub ───
echo ""
echo "🐙 Paso 3: Crear repo en GitHub..."
git branch -m main 2>/dev/null || true

gh repo create visionnorth-mx/thuban \
    --public \
    --description "Thuban - IA para Bienes Raíces. Powered by Polaris by Visionnorth." \
    --homepage "https://app.thuban.online" \
    --source=. \
    --remote=origin \
    --push 2>&1 || echo "⚠️  Repo ya existe o hubo error"

echo "✅ Repo: https://github.com/visionnorth-mx/thuban"

# ─── 3. Deploy a Vercel ───
echo ""
echo "▲ Paso 4: Deploy a Vercel..."
npx vercel deploy \
    --prod \
    --yes \
    --name thuban \
    --env NEXT_PUBLIC_API_URL=https://api.back-bone.dev \
    --env NEXTAUTH_URL=https://app.thuban.online 2>&1 | tee /tmp/vercel-deploy.log

VERCEL_URL=$(grep -oP 'https://[a-z0-9-]+\.vercel\.app' /tmp/vercel-deploy.log | head -1)
echo "✅ Deploy URL: ${VERCEL_URL:-pendiente}"

# ─── 4. Configurar dominio ───
echo ""
echo "🌐 Paso 5: Configurar dominio app.thuban.online..."
if [ -n "$VERCEL_URL" ]; then
    npx vercel domain add "$VERCEL_URL" app.thuban.online 2>/dev/null || echo "⚠️  Dominio ya existe o error"
fi

echo ""
echo "================================================"
echo "✅ SETUP COMPLETADO"
echo "   Repo:    https://github.com/visionnorth-mx/thuban"
echo "   Deploy:  ${VERCEL_URL:-pendiente}"
echo "   URL:     https://app.thuban.online"
echo ""
echo "📋 Próximos pasos manuales:"
echo "   1. En Cloudflare: añade CNAME app → cname.vercel-dns.com"
echo "   2. Abre https://vercel.com/visionnorth-mx/thuban/settings/domains"
echo "      y verifica el dominio app.thuban.online"
echo "================================================"