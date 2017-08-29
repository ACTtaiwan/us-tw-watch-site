FROM node:alpine

ENV NODE_ENV=production PORT=8080

COPY . /var/app
WORKDIR /var/app

EXPOSE $PORT

# help require() to find node_modules
RUN npm config set prefix /var/app

# commands to run build script
RUN npm install -g --silent \
  rimraf \
  cross-env \
  webpack

# install node_modules
RUN npm install

# build for production
RUN npm run build

CMD ["npm", "run", "start"]
