###########################################################
#
# Dockerfile for tasks-front
#
###########################################################

# Setting the base to nodejs 4.4.4
FROM mhart/alpine-node:4.4.4

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Environment
ENV TASKS_FRONT_PORT 8000
ENV JWT_SECRET Louie Louie, oh no, I got to go

# Startup
CMD ["node", "server.js"]