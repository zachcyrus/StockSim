FROM node:lts-alpine

COPY package.json /app
COPY package-lock.json /app

WORKDIR /app
# use --production flag to not include dev dependencies 
RUN npm install --production 

COPY . /app

# Need to expose port in Docker run command and set env port

CMD ["npm", "start"]

