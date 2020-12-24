FROM node:8-alpine
RUN mkdir -p /usr/src/odyssey
WORKDIR /usr/src/odyssey
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
CMD [ "node", "server.js" ]