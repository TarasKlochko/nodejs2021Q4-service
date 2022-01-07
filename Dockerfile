FROM node:16.13-alpine3.15
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]