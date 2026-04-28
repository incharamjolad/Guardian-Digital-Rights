FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD ["tsx", "server.ts"]
