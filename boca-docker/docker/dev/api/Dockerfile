# FROM node:18
# # Create app directory
# WORKDIR /usr/src/app
# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./
# COPY server*.js ./
# RUN npm install
# # If you are building your code for production
# # RUN npm ci --omit=dev
# # Bundle app source
# COPY . .
# EXPOSE 8080
# CMD [ "node", "server.js" ]

FROM node:18

    WORKDIR /usr/src/app

    COPY docker/dev/api/package*.json ./
    COPY docker/dev/api/server*.js ./
    COPY docker/dev/api/ .
    COPY . .

    RUN npm install

    EXPOSE 3000
    CMD [ "node", "server.js", "npm start" ]