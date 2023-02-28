FROM node
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5002
CMD [ "npm","run","dev" ]