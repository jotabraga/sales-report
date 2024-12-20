# Sales report EDA based

App based on event driven architecture using services within ports and adapters design

## Preview 👀

![app-preview](./assets/app.gif)

## About 🔎

App for get sales report for sellers

### Implemented features :heavy_check_mark:

- [x] Message broker (RabbitMQ)
- [x] Get sales report for sellers
- [x] Save sale report in csv file in ./packages/service-worker/reports
- [x] Service Job (ports and adapters architecture based on Nodejs)
- [x] Service Worker (ports and adapters architecture based on Nodejs)
- [x] Docker file and compose for entire application
- [x] Monorepo structure
- [x] Tests

### Future improvements 🔮

- [ ] Tests coverage
- [ ] Kubernetes Event driven Autoscaling

## Installation

## Requirements

- Node.js >= 18.x

```bash
$ nvm use
```

- yarn

```bash
$ npm install --global yarn
```

## Running the app by docker-compose

### Build resources

```bash
$ docker compose up --build
```

## Running the app locally

### Install dependencies

```bash
$ yarn install
```

### Add env variables

```bash
$ cd packages/service-worker && cp .env.example .env
```

```bash
$ cd packages/service-job && cp .env.example .env
```

### build and run service-job

```bash
$ cd packages/service-job && npm run build && npm run dev
```

### build and run service-worker

```bash
$ cd packages/service-worker && npm run build && npm run dev
```

## App architecture

![app-arch](./assets/EDA.png)

## Services design

![services-design](./assets/hex-arch.png)
