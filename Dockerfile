FROM node:14
COPY ./package.json /rungether/
COPY ./yarn.lock /rungether/
WORKDIR /rungether/
RUN yarn install
COPY . /rungether/
CMD yarn start:dev