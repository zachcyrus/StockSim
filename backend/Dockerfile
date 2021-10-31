FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./


# use --production flag to not include dev dependencies 
RUN npm install --production 

COPY . .

# Need to expose port in Docker run command and set env port

EXPOSE 8000

CMD ["npm", "start"]

