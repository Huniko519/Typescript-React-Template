ARG BASE_IMAGE=public.ecr.aws/p5p8b4s4/node:lts-stretch-slim
FROM $BASE_IMAGE

RUN npm install -g pm2@5.1.2

# Bundle APP files
WORKDIR /app
COPY src src/
COPY package.json yarn.lock ./
COPY pm2 pm2/
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --frozen-lockfile

# Show current folder structure in logs
RUN ls -al -R

# Build Project
RUN yarn build

ENTRYPOINT ["./entrypoint.sh"]
