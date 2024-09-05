# Base image
FROM node:18.19

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json (if it exists)
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install dependencies
RUN npm install

# Install Angular CLI (más actualizado)
RUN npm install -g @angular/cli@18.0.0

# Copy all app files
COPY . /app

# Expose port and start the app
CMD ng serve --host 0.0.0.0 --disable-host-check
