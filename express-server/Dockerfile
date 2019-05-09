FROM node:8.11.3

# Create app directory
RUN mkdir /opt/app
WORKDIR /opt/app

COPY ./package*.json ./
COPY ./nuxt.config.js ./nuxt.config.js

COPY ./apollo ./apollo
COPY ./assets ./assets
COPY ./components ./components
COPY ./config ./config
COPY ./express-server ./express-server
COPY ./layouts ./layouts
COPY ./locales ./locales
COPY ./middleware ./middleware
COPY ./pages ./pages
COPY ./plugins ./plugins
COPY ./static ./static
COPY ./store ./store

# RUN npm set strict-ssl false
RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "express-start" ]