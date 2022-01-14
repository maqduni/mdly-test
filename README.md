# mdly-test-app
ExpressJS HTTP server that features two endpoints, 
- POST /api/facts/find
- POST /api/facts/insert

## Installation:
*N.B. make sure to use Node v14. Node version is also specified in .nvmrc and package.json*.
1. Clone the repo
```bash
> git clone ...
```
2. Install NPM dependencies
```bash
server> npm i
```
3. Create .env file
```bash
server> cp .env.example .env
```

## Running:
### Run the app
```bash
server> npm run start
```

### Develop in watch mode
```bash
server> npm run start:dev
```

### Debug in watch mode
```bash
server> npm run start:debug
```
- Debug Node.js application in [WebStorm](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html)
- Debug Node.js application in [Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## Testing:
### Execute unit tests
```bash
server> npm run test
```

### Execute HTTP tests
HTTP tests are located in `server/tests/http` and can be executed via an IDE.
- HTTP client in [WebStorm](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html)
- How to test HTTP REST API easily with [Visual Studio Code](https://developers.refinitiv.com/en/article-catalog/article/how-to-test-http-rest-api-easily-with-visual-studio-code---thund)
