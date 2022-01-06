FROM node:16.13-alpine3.15 as build
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
FROM node:16.13-alpine3.15
COPY --from=build /usr/app /
EXPOSE 4000
CMD ["npm", "start"]