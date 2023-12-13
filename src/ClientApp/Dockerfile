# Stage 1: Build the Angular application
FROM node:latest as builder

WORKDIR /usr/src/app

# Copy only the package files to install dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

# Run the build command
RUN npm run build

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine

# Set the working directory to the Nginx web root
WORKDIR /usr/share/nginx/html

# Copy the built Angular app from the builder stage to the Nginx image
COPY --from=builder /usr/src/app/dist/ .

# Expose port 80
EXPOSE 80

# Default command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
