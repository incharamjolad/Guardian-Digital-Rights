FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g tsx vite
COPY . .
RUN vite build
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD ["tsx", "server.ts"]
