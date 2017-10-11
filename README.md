## To Start Local Server -
 A. Setting Up the server -
   1. Install heroku-cli with `npm i -g heroku-cli`.
   2. Install nodemon with `npm i -g nodemon`.
   3. Run `npm i` to install the server-side dependencies.
   4. Run `touch .env` then open it and fill it like the sample .env file.
   5. Run `npm start` and make sure the mongo instance is also running.

 B. Setting Up the client -
   1. Run `cd client ` in separate terminal to change into client directory.
   2. In client directory run `npm i` to install client-side dependencies.
   3. In client directory run `touch .env.development`.
   4. In client directory run `npm start`.
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

## Guidelines
 1. First make an issue and then start working on it.
 2. Always make a separate branch in following format name#feature. Eg: aditya#add-bootstrap. (Words are separated by -).
 3. In the commit message do mention the issue no. Eg: fixes #1.
 4. Use proper code formatting. We use [CodeFormatter Sublime Plugin](https://github.com/akalongman/sublimetext-codeformatter).
 5. Do mention if `npm install` is needed after merging the commit.

Note -
1. Heroku Cli is used for handling **environment variables** and deploys.
2. To get **googleClientID** and **googleClientSecret** make a new project at [here](https://console.developers.google.com) and enable the Google+ api.
3. If you don't have **mongodb** locally, then create a remote db [here](https://mlab.com/home) or you can download it from [here](https://www.mongodb.com/download-center?jmp=docs&_ga=2.47151591.1318332256.1507577170-1071278786.1507217039#community)
