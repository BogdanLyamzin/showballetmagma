FROM node:12.16.0
WORKDIR .
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
EXPOSE 80
CMD ["yarn", "start-gcp"]

