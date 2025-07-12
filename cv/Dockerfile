# Utiliser l'image Node.js officielle
FROM node:20-alpine AS base

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat

# Étape de construction des dépendances
FROM base AS deps
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Étape de construction de l'application
FROM base AS builder
WORKDIR /app

# Copier les fichiers de dépendances
COPY cv/package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source de l'application
COPY cv/ .

# Copier les données depuis la racine du projet
COPY data/ ./src/data/

# Construire l'application
RUN npm run build

# Étape de production
FROM base AS runner
WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers publics
COPY --from=builder /app/public ./public

# Copier les fichiers de construction
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Changer vers l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3001

# Variables d'environnement
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3001

# Commande de démarrage
CMD ["node", "server.js"] 