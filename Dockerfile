FROM --platform=amd64 node:14-alpine
EXPOSE 1337
WORKDIR /toeic-strapi
COPY . /toeic-strapi/
RUN npm i
CMD [ "npm","start" ]