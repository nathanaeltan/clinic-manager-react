# Use a Node.js LTS (Long Term Support) as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the port on which the CRA development server will run
EXPOSE 3000

# Define the command to run your CRA development server
CMD ["npm", "start"]