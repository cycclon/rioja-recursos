FROM node:20-alpine3.17

WORKDIR /home/cycclon/Projects/rioja-recursos/frontend/rioja-recursos

COPY . /home/cycclon/Projects/rioja-recursos/frontend/rioja-recursos

RUN npm install

EXPOSE 3000

CMD npm run Start