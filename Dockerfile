FROM node:20

WORKDIR /NEXT-AUTH-INTRO
COPY * ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev