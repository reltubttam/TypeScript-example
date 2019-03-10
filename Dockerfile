FROM node:10-alpine

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

USER nobody

CMD node .

EXPOSE 3456
