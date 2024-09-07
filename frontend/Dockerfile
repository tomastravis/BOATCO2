# Base image
FROM docker.io/library/node:20.17

# Set working directory
WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --retry=5 && npm install -g @angular/cli@18.2.3 --retry=5 && npm cache clean --force

# Copy all app files
COPY . /app

# Expose port and start the app
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
