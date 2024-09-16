FROM node:18-alpine

RUN mkdir /frontend

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Install a simple server to serve the build files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the app using the serve command
CMD ["serve", "-s", "build", "-l", "3000"]