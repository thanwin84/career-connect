FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build
EXPOSE 5100

CMD [ "npm", "run", "start"]