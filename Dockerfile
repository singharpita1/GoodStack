# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.41.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files (including tests and config)
COPY . .

# Run Playwright tests
CMD ["npx", "playwright", "test"]