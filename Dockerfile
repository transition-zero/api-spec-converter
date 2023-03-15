FROM node

ADD . api-spec-converter/
RUN cd api-spec-converter && npm install

WORKDIR /api-spec-converter

RUN npm install api-spec-converter