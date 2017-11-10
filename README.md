## Description

Plexus aims to be a one stop solution for all kinds of digital events like Quizes. It specially targets the yearly online events happening in our college. This platform will allow other societies to host their events without any friction or technical know-how.

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## To Setup the Project for Development -
 
 A. Setting Up the server -
   1. Install heroku-cli with `npm i -g heroku-cli`.
   2. Install nodemon with `npm i -g nodemon`.
   3. Run `npm i` to install the server-side dependencies.
   4. Run `cp .env.example .env` to create `.env` file, open it and fill the credentials.

 B. Setting Up the client -
   1. Run `cd client ` in separate terminal to change into client directory.
   2. In client directory run `npm i` to install client-side dependencies.
   3. In client directory run `touch .env`.

## To Start Local Server -

 1. Run `npm start` to start backend server.
 2. Run `npm run client` to start frontend server.
 3. Navigate to [http://localhost:3000](http://localhost:3000) in the browser.


## Guidelines
 1. First make an issue and then start working on it.
 2. Always make a separate branch in following format name-patch-#issueNo. Eg: aditya-patch-#62. (Words are separated by -).
 3. In the commit message do mention the issue no. Eg: fixes #1.
 4. Use proper code formatting. Run `npm run format` to make prettier format everything automagically.
 5. Do mention if `npm install` is needed after merging the commit.

Note -
1. Heroku Cli is used for handling **environment variables** and deploys.
2. To get **googleClientID** and **googleClientSecret** make a new project at [here](https://console.developers.google.com) and enable the Google+ api.
3. To get **facebookAppId** and **facebookAppSecret** make a new app at [here](https://developers.facebook.com) and add the facebook login product.
4. If you don't have **mongodb** locally, then create a remote db [here](https://mlab.com/home) or you can download it from [here](https://www.mongodb.com/download-center?jmp=docs&_ga=2.47151591.1318332256.1507577170-1071278786.1507217039#community)
5. Whenever you commit the code. Prettier runs and it formats the code. If any changes are made then do stage again and commit.


## Project Maintainers

 * [Ankit Jain](https://github.com/ankitjain28may)
 * [Aditya Agarwal](https://github.com/itaditya)

## Other Contributors

 * [Kunal Vishnoi](https://github.com/kunalvishnoi)
 * [Shubham Singh](https://github.com/ShubhMisaki)
 * [Rohit Chandra](https://github.com/krrohitch)

