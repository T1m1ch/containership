FROM node:22-alpine3.19
RUN apk add --no-cache docker-cli
WORKDIR /opt/containership
EXPOSE 9999
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install ts-node -g
RUN npm install
CMD ["npm", "run", "start"]