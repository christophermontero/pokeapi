FROM node:20-bookworm

RUN mkdir -p /usr/pokeapi && chown -R node:node /usr/pokeapi

WORKDIR /usr/pokeapi

COPY package.json ./

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 3000
