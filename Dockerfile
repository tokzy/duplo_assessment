# Use Node.js 16 on Ubuntu as the base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 7006

# Command to run the application
CMD ["npm","run","start:dev"]
