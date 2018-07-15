# base image
FROM node:10.2.1

# set working directory 
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# run gulp command 
RUN npm install -g gulp
RUN npm install gulp
CMD ["gulp", "sass"]

# start app
CMD ["npm", "start"]