# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package*.json ./

# Install dependencies (use npm install instead of npm ci)
RUN npm install --omit=dev --no-audit --no-fund

# Copy application code
COPY . .

# Run build if applicable (skip if not needed)
# RUN npm run build

# Stage 2: Run (Final secure image)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Set file permissions for non-root user
RUN chown -R appuser:appgroup /app

# Set non-root user
USER appuser

# Expose only the necessary port
EXPOSE 3000

# Start the application securely
CMD ["npm", "run", "start"]
