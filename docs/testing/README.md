## Testing

Odyssey testing is performed in 2 primary ways: Cypress E2E tests and Jest Unit Tests.

## Cypress End To End (E2E) Tests

Cypress is an automated e2e framework. For Odyssey, its implementation exists in the ./cypress/ directory.

In package.json, we define script commands to run cypress. It can be run locally with `yarn cypress:open`

This will open the cypress interactive editor, which may need to be installed on your computer.

From there, we can run all the tests defined in `cypress/integration/odysseyTests/*`

Implemented E2E tests:

- `admin_sanity.spec.js`
  - Tests to visit each admin page on the /admin dashboard for an admin profile
- `hacker_sanity.spec.js`
  - Tests to visit each pach in the navbar for a hacker profile
- `volunteer_sanity.spec.js`
  - Tests to visit each volunteer page on the /volunteer dashboard for an volunteer profile
- `sponsor_sanity.spec.js`
  - Tests to visit each sponsor page on the /sponsor dashboard for an sponsor profile
- `judge_sanity.spec.js`
  - Tests to visit each judge page on the /judge dashboard for an judge profile

Need to implement:

- `superadmin_sanity.spec.js`

## Jest Unit Tests

Jest tests are located in the `tests/` directory - split up into `tests/api/` where the js tests are written and the `tests/factories/` directory to build the mock database.

Jest tests should be extensive coverage of the database. This ensures migrations, models, and our api seem to work correctly.

Jest tests are run pre-commit using husky to ensure data integrity.

Implemented

- Auth
- Person
- Prize
- Project Team

TODO
The rest of the database and `api/` directory
