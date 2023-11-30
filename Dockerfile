# multi-stages
# stage1 as builder
FROM node:16.14-alpine as builder

# 切换软件源为阿里云
RUN echo 'https://mirrors.huaweicloud.com/alpine/v3.16/main' > /etc/apk/repositories \
    && echo 'https://mirrors.huaweicloud.com/alpine/v3.16/community' >> /etc/apk/repositories \
    && apk update \
    && apk upgrade

# copy the package.json to install dependencies
COPY ./package.json ./package-lock.json ./

# Install the dependencies and make the folder
RUN npm install --force && mkdir /nest-next-ui && mv ./node_modules ./nest-next-ui

# Setting WORKDIR
WORKDIR /nest-next-ui

# Copy node all file to builder
COPY ./ .

# Build the project and copy the files
RUN npm run build

CMD ["npm", "start"]
