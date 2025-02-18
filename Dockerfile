# Step 1: Set the base image to Node.js
FROM node:16
# Step 2: Set the working directory in the container
WORKDIR /app
# Step 3: Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Step 4: Install the dependencies
RUN npm install
# Step 5: Copy the rest of the project files into the container
COPY . .
# Step 6: Expose the port the app runs on.
EXPOSE 3000
# Step 7: Command to run the application,node server/app.js
CMD ["node", "server/app.js"]
