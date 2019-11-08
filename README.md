# HackSC Odyssey

Odyssey is a hackathon management platform that handles hacker applications, admin functionalities, and more. Built by the HackSC team.

## Odyssey Setup

- Clone this directory into your local dev environment
- Run `yarn install` to install the necessary packages
- Create a `.env` file and fill in w/ the right credentials (see `.env.example` for template)
- Run `npx sequelize-cli db:create` if your DB doen't already exist
- Run `npx sequelize-cli db:migrate` to migrate your DB
- Run `yarn dev` to start HackSC Odyssey -- this will start the combined client-server app on `localhost:3000`
  - Caveat: if you make any changes to the backend API, you need to restart the server. An alternative start command is `npx nodemon yarn dev` which will restart the server anytime `api/*.js` is updated

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
- `odyssey.d.ts` - Application specific type definitions
- `server.js` - Main file that starts the entire applicat ion

## Odyssey Tech Stack

Odyssey is built using Next.js and Node.js/Express. Odyssey is served by a Node.js server that uses Next.js to render React apps on the server. On the back-end, Odyssey uses Sequelize as an ORM for a MySQL database. Currently, the entire app is hosted on Heroku.
