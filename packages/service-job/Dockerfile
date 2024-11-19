FROM node:18-alpine
WORKDIR /app
COPY ../../package.json ../../yarn.lock ./
COPY ../../.env.service-job ./
COPY . .
RUN yarn install --frozen-lockfile 
COPY ../../wait-for ./
RUN chmod +x ./wait-for
RUN yarn workspace service-job build
CMD ["sh", "-c", "./wait-for rabbitmq:5672 -- yarn workspace service-job dev"]