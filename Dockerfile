 # Create image based on the official Node 6 image from the dockerhub
FROM node:14-alpine

# Create a directory where our app will be placed
RUN mkdir -p /home/we-settle/Documents/ahlaa

# Change directory so that our commands run inside this new directory
WORKDIR /home/we-settle/Documents/ahlaa

# Copy dependency definitions
COPY package.json /home/we-settle/Documents/ahlaa

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /home/we-settle/Documents/ahlaa

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]  