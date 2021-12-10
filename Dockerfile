FROM node:14 as base

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=base /usr/src/app/lib ./lib

COPY --from=base /usr/src/app/src/views ./lib/views

CMD [ "node", "./lib/index.js" ]