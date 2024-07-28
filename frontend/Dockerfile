# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json /app/package.json

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . ./

# Build the app for production
# RUN npm run build

# Expose port 3000
# EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
