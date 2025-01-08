# Build stage
FROM node:18.17.1-alpine3.18 AS build

WORKDIR /usr/src/app

# Copy files
COPY ./src ./src
COPY ./inject.js .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./nest-cli.json .

# Install dependencies
RUN npm install
RUN npm run build --prod

ENV NODE_ENV=production

# PROD STAGE
FROM node:18.17.1-alpine3.18 AS prod

WORKDIR /usr/src/app

# Copy built files and configuration from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./inject.js
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json

# Copy configuration files to the correct path
COPY --from=build /usr/src/app/src/config/database ./config/database

# Install only production dependencies
RUN npm install --only=production

# Change permissions
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3838

CMD ["sh", "-c", "node dist/main"]
