# HackSC Odyssey

Odyssey is a hackathon management platform that handles hacker applications, admin functionalities, and more. Built by the HackSC team.

![HackSC Blob](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

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
