FROM node:18-alpine
WORKDIR /app
COPY ../../package.json ../../yarn.lock ./
COPY ../../.env.service-worker ./
COPY . .
RUN yarn install --frozen-lockfile 
COPY ../../wait-for ./
RUN chmod +x ./wait-for
RUN yarn workspace service-worker build
CMD ["sh", "-c", "./wait-for rabbitmq:5672 -- yarn workspace service-worker dev"]