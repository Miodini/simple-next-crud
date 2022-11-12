# CRUD REACT

## Introduction
A simple create, read, update, delete website made in React. Uses TypeScript, ExpresJS and MySQL on backend.
Created by a student of Web Development :)

## How to install
- Ensure you have node.js and MySQL installed.
- Clone this repo somewhere.
- Using your command line interface, go to [front](front/) and run `npm install` (or use your favorite node package manager).
- After everything is installed, run `npm start` to deploy the dev server (optionally, run `npm run build` and serve the resulting folder).
- Go to [back](back/) and run `npm install`.
- Create a `.env` file and type in `MYSQL_PASSWORD=***`. Replace the asterisks with your actual MySQL password. (note: if you're not the host of your system, you may also need to change the user in [index.ts](back/src/index.ts))
- Go to [src](back/src) and run the [users.sql](back/src/users.sql) script to create the database.
- After everything is created and installed, run `npm start`.
- The front-end should now be running at `http://localhost:3000` and the back-end at `http://localhost:3001`.