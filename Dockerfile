FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --silent

RUN npm i -g sequelize-cli

COPY . /usr/src/app

EXPOSE 3069

CMD ["npm", "run", "start"]