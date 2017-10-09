## To Start Local Server - 
 A. Setting Up the server - 
   1. Install heroku-cli.
   2. Install nodemon with `npm i -g nodemon`.
   3. Run `npm i` to install the server-side dependencies.
   4. Run `touch .env` then open it and fill it like the sample .env file.
   5. Run `npm start` and make sure the mongo instance is also running.
   
 B. Setting Up the client - 
   1. Run `cd client ` in separate terminal to change into client directory.
   2. In client directory run `npm i` to install client-side dependencies.
   3. In client directory run `touch .env`.
   4. In client directory run `npm start `.
   5. Navigate to localhost:3000 in the browser.
 
## Sample .env file
```
NODE_ENV=development
port=5000
googleClientID=-------------.apps.googleusercontent.com
googleClientSecret=--------------
mongoURI=mongodb://localhost:27017/plexusdb
cookieKey=---------------
HOST_URL=http://localhost:5000
sendGridApiKey=--------------
sendGridTemplateId=----------------
```

## Milestones 
 1. [ ] Setup a basic server.

Note - 
1. Heroku Cli is used for handling **environment variables** and deploys.
2. To get **googleClientID** and **googleClientSecret** make a new project at [here](https://console.developers.google.com) and enable the Google+ api.
3. If you don't have **mongodb** locally, then create a remote db [here](https://mlab.com/home)
