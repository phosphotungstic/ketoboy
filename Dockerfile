FROM ubuntu:16.04
WORKDIR .
COPY package*.json ./
COPY semantic.json ./
COPY webpack.config.js ./

RUN apt-get update
RUN apt-get install -y dialog \
    apt-utils \
    curl \
    g++ \
    gcc \
    make \
    python

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install -g npm
RUN npm install gulp
RUN npm install

RUN npm run webpack
RUN ./node_modules/gulp/bin/gulp.js --gulpfile ./semantic/gulpfile.js

COPY . .

RUN apt-get install -y nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx

EXPOSE 80

CMD ["bash"]