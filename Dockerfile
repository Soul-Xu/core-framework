# multi-stages
# stage1 as builder
FROM node:18-alpine as builder

# 切换软件源为华为云
RUN echo 'https://mirrors.huaweicloud.com/alpine/v3.16/main' > /etc/apk/repositories \
    && echo 'https://mirrors.huaweicloud.com/alpine/v3.16/community' >> /etc/apk/repositories \
    && apk update \
    && apk upgrade

# copy the package.json to install dependencies
COPY ./package.json ./package-lock.json ./

# 设置工作目录
WORKDIR /nest-next-ui

# 安装依赖并创建文件夹
RUN yarn

# 复制所有文件到构建器
COPY ./ .

# 构建项目并复制文件
RUN npm run build

CMD ["npm", "start"]
