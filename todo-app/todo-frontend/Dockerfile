FROM node:16 AS build-stage
ENV REACT_APP_BACKEND_URL=/api
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --only=production
RUN npm run build

FROM build-stage as test
ENV CI=true
RUN npm test
CMD [ "npm", "run", "test" ]

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html