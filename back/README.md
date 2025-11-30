# Simple Nest Crud
This is the back-end service for Simple Next Crud web application, made in NestJS.

## Requirements
- [Node.js](https://nodejs.org/en/download) v20+
- [yarn](https://yarnpkg.com) (You can instead use another node package manager by replacing the `yarn` commands in [package.json](/package.json))
- [Docker](https://www.docker.com) and Docker Compose (You can instead point to any other PostgreSQL database by removing the docker-compose steps in [package.json](/package.json).)

## How to Run
**Note:** This tutorial assumes you are using `yarn` as the package manager and using Docker for hosting the database.
1. Run `yarn` to install the dependencies.
2. Create a `.env` file at the root of the project based on [.env.example](/.env.example). You may keep the values as they are if running the database locally with default settings.
3. Run `yarn start` to initialize the container with the database and start the Nest application. The app runs on port 3001 by default. You can change the port by adding the PORT environment variable in `.env` file.
4. You are ready to go. You can access the Swagger page by going to `http://localhost:[PORT]/api`.

## Testing
### Unit Testing
You can run `yarn test` to run unit tests with Jest.

### E2E Testing
Before running end-to-end test, you must create a `.env.test` file, following the model from [.env.example](/.env/example), with your testing database settings.  
**WARNING**: all data in the testing database is deleted before running the test, so make sure to not point it to your app database.  
Run `yarn test:e2e` to run the end-to-end testing. Please note that it will compose and run the test database on port 3306, so make sure the main application's database container is not running when running this test.