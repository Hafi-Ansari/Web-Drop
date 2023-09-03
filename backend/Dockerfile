# Use a specific Node runtime as the base image
FROM node:20.5.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy other project files into the container
COPY . .

# Make environment variables available
ENV PORT=3000
ENV CORS_ORIGIN="*"

# Expose the ports your app uses (you can modify this based on your needs)
EXPOSE 3000
EXPOSE 5000

# Run the application
CMD [ "node", "server.js" ]
