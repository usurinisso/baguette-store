FROM node:14
WORKDIR /usr/src/baguette-store

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/main.js"]