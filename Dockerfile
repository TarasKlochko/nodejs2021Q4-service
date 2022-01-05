FROM node:16.13-alpine3.15
WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","start"]