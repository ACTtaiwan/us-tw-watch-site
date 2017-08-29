FROM node:alpine

ENV NODE_ENV=development PORT=8080

COPY . /var/app
WORKDIR /var/app

EXPOSE $PORT

RUN npm config set prefix /var/app
RUN npm install -g --silent \
  rimraf \
  cross-env \
  webpack

RUN npm install

RUN npm install \
  babel-plugin-transform-runtime \
  babel-preset-es2015 \
  babel-preset-stage-2 \
  babel-preset-stage-0 \
  babel-preset-react

RUN npm run build

CMD ["npm", "run", "start"]
