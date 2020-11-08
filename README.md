# HackSC Odyssey

[![codecov](https://codecov.io/gh/HackSC/odyssey/branch/main/graph/badge.svg?token=JESBLPBF78)](https://codecov.io/gh/HackSC/odyssey)

Odyssey is a hackathon management platform that handles hacker applications, admin functionalities, and more. Built by the HackSC team.

### Main

[![Main Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhacksc%2Fodyssey%2Fbadge%3Fref%3Dmain%26token%3Ddac24b76fbb2151adf59b38f61b84a2d542db2f2&style=flat)](https://actions-badge.atrox.dev/hacksc/odyssey/goto?ref=main&token=dac24b76fbb2151adf59b38f61b84a2d542db2f2)

### Staging

[![Staging Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhacksc%2Fodyssey%2Fbadge%3Fref%3Dstaging%26token%3Ddac24b76fbb2151adf59b38f61b84a2d542db2f2&style=flat)](https://actions-badge.atrox.dev/hacksc/odyssey/goto?ref=staging&token=dac24b76fbb2151adf59b38f61b84a2d542db2f2)

## Odyssey Setup

- Clone this directory into your local dev environment
- Run `yarn install` to install the necessary packages
- Create a `.env` file and fill in w/ the right credentials (see `.env.example` for template)
- Run `npx sequelize-cli db:create` if your DB doen't already exist
- Run `npx sequelize-cli db:migrate` to migrate your DB
- Run `yarn dev` to start HackSC Odyssey -- this will start the combined client-server app on `localhost:3000`
  - Caveat: if you make any changes to the backend API, you need to restart the server. An alternative start command is `npx nodemon yarn dev` which will restart the server anytime `api/*.js` is updated
- Run `yarn run watch` to reload server automatically

## Project Structure

- `/api` - Code for the backend server. Includes database models, migrations, API routes, and more
  - `/migrations/` - Read about Sequelize migrations here (https://sequelize.org/master/manual/migrations.html)
  - `/models/` - Defines the database models for Odyssey
  - `/utils.js` - Utils used by the backend API routes
  - Other files here are typically route-specific files that define the API routes for the application
- `/assets` - Various assets used by our application
- `/components` - Reusable components that make up our application
- `/lib` - Shared helper methods used by our React app
- `/pages` - Page components used by Next.js for file-based routing (ex: dashboard.tsx corresponds to `/dashboard`)
- `/public` - Files here are accessible as static files
- `/styles` - Styled components for our design system -- typically design primitives that can be extended
- `/tests` - Tests for our application, run using `yarn test`
  - `/factories/` - Generators for sample data
- `/tasks` - Home for engineering scripts
- `odyssey.d.ts` - Application specific type definitions
- `server.js` - Main file that starts the entire application

## Odyssey Tech Stack

Odyssey is built using Next.js and Node.js/Express. Odyssey is served by a Node.js server that uses Next.js to render React apps on the server. On the back-end, Odyssey uses Sequelize as an ORM for a MySQL database. Currently, the entire app is hosted on Heroku.

## How To: Add/update database model

Adding a new model or updating a current one requires a migration file.

To create one, run `npx sequelize-cli migration:generate --name <MIGRATION_NAME>`. This will autogenerate a file that will let you define what is being changed. See https://sequelize.org/master/manual/migrations.html for more information.

After setting up your migration, make sure you update the following files:

- `api/models/` -- Update models to properly reflect the new DB schema
- `odyssey.d.ts` -- Update the Profile type object to reflect new fields

Once this is done, run `npx sequelize-cli db:migrate` to get your changes reflected in the database

Additionally, create a sample data generator in `/tests/factories`

## How To: Deploy application to production or staging

To deploy the application to production or staging, make sure you are logged in to the right Heroku account. Make sure you have installed the Heroku CLI.

Once you're logged into the right account, add the production and staging app to your remote. I have run the following:

- `heroku git:remote -a <production_app>`
- `git remote rename heroku heroku-prod`
- `heroku git:remote -a <staging_app>`
- `git remote rename heroku heroku-staging`

Before you deploy, make sure you have ran migrations on the right database.

Then to deploy to either production or staging, run:

- `git push heroku-prod develop:master` (Production)
- `git push heroku-staging develop:master` (Staging)

## How To: Task Running

For business / engineering tasks that are infrequent we have Tasks. These are contained in the tasks folder. When adding a task make sure to add it to CLI.js.

Invoke this command to see available tasks

- `npm run cli`

## How To: Test Github Actions locally

Must define environment variables used in github actions in the .github/workflows/ directory.

Install [Act](https://github.com/nektos/act), a library to run github actions locally by running `brew install act` on mac or `https://github.com/nektos/act/releases/latest` for windows.

Alternatively, it can be installed by running `curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash`

To mock a pull request, run `act pull_request --secret-file .env` where your environment variables are defined in `.env`

## How To: Create an End To End (E2E) Test with Cypress

Cypress is an automated e2e framework. For Odyssey, its implementation exists in the ./cypress/ directory.

In package.json, we define script commands to run cypress. It can be run locally with `yarn cypress:open`

This will open the cypress interactive editor, which may need to be installed on your computer.

From there, we can run all the tests defined in `cypress/integration/odysseyTests/*`

Implemented E2E tests:

- `admin_sanity.spec.js`
  - Tests to visit each admin page on the /admin dashboard for an admin profile
- `hacker_sanity.spec.js`
  - Tests to visit each pach in the navbar for a hacker profile

Need to implement:

- `volunteer_sanity.spec.js`
- `sponsor_sanity.spec.js`
- `judge_sanity.spec.js`

## How To: Create Unit Tests with Jest

Jest tests are located in the `tests/` directory - split up into `tests/api/` where the js tests are written and the `tests/factories/` directory to build the mock database.

Jest tests should be extensive coverage of the database.

Implemented

- Auth
- Person
- Prize
- Project Team

TODO
The rest of the database and `api/` directory
