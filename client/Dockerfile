# stage 1
FROM node:14.15.5 as node
WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
RUN npm run build --production

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80