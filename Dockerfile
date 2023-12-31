FROM oven/bun

WORKDIR /usr/app

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

ENV NODE_ENV production

EXPOSE 3000

CMD [ "bun", "run", "src/index.ts"]