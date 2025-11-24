FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm i -g pnpm && (pnpm install --frozen-lockfile || pnpm install)

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
RUN npm i -g pnpm && pnpm install --prod --ignore-scripts
EXPOSE 3000
CMD ["pnpm", "start"]
