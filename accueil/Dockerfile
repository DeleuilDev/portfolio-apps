FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl

FROM base AS builder
WORKDIR /app

COPY accueil/package*.json ./
RUN npm ci

COPY accueil/ .
COPY data/ ./src/data/

RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Data files for auto-seeding on first deploy
COPY --from=builder /app/src/data ./data/

COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh

USER root
RUN chmod +x /app/start.sh && mkdir -p /data && chown nextjs:nodejs /data
USER nextjs

EXPOSE 3000
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["/bin/sh", "/app/start.sh"]
