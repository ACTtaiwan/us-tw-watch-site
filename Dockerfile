FROM node:alpine

ENV PORT=8080

WORKDIR /var/app
COPY . .

RUN npm install
RUN npm run build

EXPOSE $PORT
CMD ["npm", "run", "start"]
