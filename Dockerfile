
# =========================
# Build stage
# =========================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# =========================
# Runtime stage (Node only)
# =========================
FROM node:20-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy the built app
COPY --from=build /app/dist ./dist

# Cloud Run / container port
EXPOSE 8080

# Serve the SPA
CMD ["serve", "-s", "dist", "-l", "8080"]
