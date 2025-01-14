# 1. Build stage
FROM node:23-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .
# Build the Next.js app (production build)
RUN npm run build

# 2. Production stage
FROM node:23-alpine
WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
