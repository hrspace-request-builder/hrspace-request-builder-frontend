FROM node:14-alpine AS builder
ENV NODE_ENV development
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY --from=builder /frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]