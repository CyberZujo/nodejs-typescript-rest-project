FROM node:12.13.1

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json tslint.json ./
COPY src ./src
COPY test ./test
RUN npm install


EXPOSE 4000
CMD npm start