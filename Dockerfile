FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Command to run tests
# CMD ["npm", "test"]

CMD ["npm", "run", "start:dev"]