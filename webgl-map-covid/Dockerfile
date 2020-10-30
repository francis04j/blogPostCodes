FROM node:10
ENV PORT 1234
EXPOSE 1234

# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
