# U.S. Taiwan Watch Site

> Nuxt.js project

## Table of contents

* **[Stack](#stack)**
* **[Directory Structure](#directory-structure)**
* **[Development](#development)**

## Stack

### Front-End

* [x] [Vue.js](https://vuejs.org/) - component-based MVVM library
* [x] [vue-router](https://github.com/vuejs/vue-router)
* [x] [Vuex](https://github.com/vuejs/vuex) - Flux application architecture for Vue.js
* [x] [iView](https://github.com/iview/iview) - A high quality UI Toolkit built on Vue.js
* [x] [Nuxt.js](https://nuxtjs.org/guide/installation) - Vue SSR
* [x] [vue-apollo](https://github.com/akryum/vue-apollo) - GraphQL Client
* [x] [Vue-i18n](https://github.com/kazupon/vue-i18n) - i18n
* [x] [aws-serverless-express](https://github.com/awslabs/aws-serverless-express) - Run serverless applications and REST APIs using your existing Node.js application framework, on top of AWS Lambda and Amazon API Gateway
* [x] [express-session](https://github.com/expressjs/session) - Simple session middleware for Express
* [x] [mobile-detect](https://github.com/hgoebl/mobile-detect.js/) - Device detection (phone, tablet, desktop, mobile grade, os, versions)

#### Tools

* [x] [Webpack](https://webpack.github.io/) - JavaScript build tool, task runner
* [x] [Babel](https://babeljs.io/) - JavaScript compiviewiler
* [x] [ESLint](http://eslint.org/) - JavaScript linter
* [ ] [TypeScript](https://vuejs.org/v2/guide/typescript.html) - TypeScript support for Vue.js

### Back-End

* [x] [Serverless Framework](http://serverless.com/)
* [x] [Amazon API Gateway](https://aws.amazon.com/api-gateway) - RESTful APIs endpoint
* [x] [AWS Lambda](https://aws.amazon.com/lambda) - microservices
* [x] [Amazon DynamoDB](https://aws.amazon.com/dynamodb) - NoSQL database
* [x] [AWS CloudFormation](https://aws.amazon.com/cloudformation) - Infrastructure as a Code

#### Hosting

* [x] [Amazon S3](https://aws.amazon.com/s3) - static website hosting
* [x] [Amazon CloudFront](https://aws.amazon.com/cloudfront) - CDN
* [x] [Amazon Route 53](https://aws.amazon.com/route53) - DNS
* [ ] [AWS Certificate Manager](https://aws.amazon.com/certificate-manager) - SSL/TLS credentials

### DevOps

* [x] [BitBucket](https://bitbucket.org/) - source-code hosting
* [ ] [BitBucket Pipeline](https://bitbucket.org/product/features/pipelines) - continuous integration and delivery

#### Business Tools

* [x] [Slack](https://taiwan-watch-slack-invite.herokuapp.com/) - group notifications
* [x] [HackMD](https://hackmd.io/c/BJKPgq5sZ/) - collaborative project notes

## Directory Structure

```text
└── 📂 src
    ├── 📂 api --------------- methods to call 3rd-party services
    ├── 📂 assets ------------ un-compiled assets such as Less, Sass or JavaScript
    ├── 📂 components -------- Vue.js Components. Nuxt.js doesn't supercharge the data method on these components
    ├── 📂 layouts ----------- app Layouts
    ├── 📂 locales ----------- i18n localization files
    ├── 📂 middleware -------- Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layouts)
    ├── 📂 pages ------------- app Views and Routes
    ├── 📂 plugins ----------- Javascript plugins that you want to run before instantiating the root Vue.js app
    ├── 📂 static ------------ static files, and each file inside this directory is mapped to /
    ├── 📂 store ------------  Vuex Store files
    ├── 📄 handler.js -------- lambda function to export the SSR server to an endpoint
    ├── 📄 nuxt.config.js ---- Nuxt.js custom configuration
    ├── 📄 package.json ------ app dependencies and scripts.
    └── 📄 serverless.yml ---- config for delpoying AWS serverless stack
```

## Development

### Prerequisites

* Node.js v6.10

### Setup

Docker:
```bash
# create production image for base usage
$ docker build -f prod.Dockerfile -t ustw/frontend-app .

# build development image based on production image
$ docker build -f dev.Dockerfile -t ustw/frontend-app-dev .

# run app on a docker container
$ docker run --name ustw-dev -p 3000:3000 -v $(pwd)/config:/usr/src/app/config \
-v $(pwd)/runCmdInDocker.sh:/usr/src/app/runCmdInDocker.sh \
-v $(pwd)/middleware:/usr/src/app/middleware \
-v $(pwd)/plugins:/usr/src/app/plugins \
-v $(pwd)/README.md:/usr/src/app/README \
-v $(pwd)/apollo:/usr/src/app/apollo \
-v $(pwd)/handler.js:/usr/src/app/handler \
-v $(pwd)/nuxt.config.js:/usr/src/app/nuxt \
-v $(pwd)/serverless.yml:/usr/src/app/serverless \
-v $(pwd)/assets:/usr/src/app/assets \
-v $(pwd)/layouts:/usr/src/app/layouts \
-v $(pwd)/package.json:/usr/src/app/package \
-v $(pwd)/static:/usr/src/app/static \
-v $(pwd)/components:/usr/src/app/components \
-v $(pwd)/locales:/usr/src/app/locales \
-v $(pwd)/pages:/usr/src/app/pages \
-v $(pwd)/store:/usr/src/app/store \
ustw/frontend-app-dev 


Build:

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

Deploy:

```bash
# Deploy to a cloud-hosted development environment
npm run deploy-dev

# When everything looks good, deploy to production
npm run deploy-prod
```
