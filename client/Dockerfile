FROM node
WORKDIR /code

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5173

CMD [ "npm", "run", "dev"]