# Stage 1: Build the Angular app
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g @angular/cli@12.0.0
RUN npm install --legacy-peer-deps
COPY . .
RUN ng build --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]