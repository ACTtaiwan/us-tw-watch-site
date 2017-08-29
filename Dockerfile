FROM node:alpine

ENV NODE_ENV=production PORT=8080

COPY . /var/app
WORKDIR /var/app

EXPOSE $PORT

# help require() to find node_modules
RUN npm config set prefix /var/app

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
