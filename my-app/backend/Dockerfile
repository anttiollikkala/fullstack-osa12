FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci && npm install typescript -g
RUN npm run tsc
USER node
CMD npm start