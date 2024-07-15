# Backend using JS

## 📂File Structure:

+ src :-
    - index : DB connections, etc
    - App : config, cookies, etc
    - constants : enums, DB name
+ DB : DB connection code
+ Models : DB schema
+ Controllers : Functionality
+ Routes : Routing
+ Middleware : To use scripts for authentication,etc
+ Utils
+ More

## Empty Node application
`npm init` to create node app and `npm init -y` to accept all

Added custom scripts to package.json

## Express js in index.js
- `npm i express`   
- [Get Started](https://expressjs.com/en/starter/hello-world.html)

Open at given port ex: [localhost:3000](localhost:3000)

## Environment variables
- `npm install dotenv`

## Connecting to frontend
- Create seperate folder for frontend and make react app
- Use fetch or `axios` to send HTTP req to backend
- Configure proxy settings in vite.config to avoid CORS problems