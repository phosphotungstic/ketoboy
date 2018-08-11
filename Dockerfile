FROM ubuntu:16.04
WORKDIR .
COPY package*.json ./

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install -g npm
RUN npm install

RUN npm run webpack
RUN ./node_modules/gulp/bin/gulp.js --gulpfile ./semantic/gulpfile.js

COPY . .

RUN apt-get install -y nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx

EXPOSE 80

CMD ["bash"]