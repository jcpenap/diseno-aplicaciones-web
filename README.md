# APIRest
## Diseño de aplicaciones Web

1. Download the repository
```
git clone https://github.com/jestrade/diseno-aplicaciones-web.git
```
2. Enter into the directory
```
cd diseno-aplicaciones-web
```
3. Install the app
```
npm install
```
4. Create .env file
ENV = development | production
```
ENV=
DEV_DATABASE_HOST=
DEV_DATABASE_NAME=
PROD_DATABASE_HOST=
PROD_DATABASE_NAME=
PROD_DATABASE_USER=
PROD_DATABASE_PASSWORD=
SERVER_LOGS_DIR=
SERVER_PORT=
SERVER_HOST=
```

5. To run the app on production mode
```
npm start
```

6. To run the app on development mode
6.1 Install nodemon
```
npm i nodemon -g
```
6.2 Run
```
npm run dev
```

# Libraries
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/morgan
- https://www.npmjs.com/package/path
- https://www.npmjs.com/package/fs
