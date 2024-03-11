# Client Dockerfile
FROM node:18.12.0
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]