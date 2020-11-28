Cypress.on("uncaught:exception", (err, runnable) => {
  // * Returning false here prevents Cypress from failing the test
  return false;
});

Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0",
  });

  const options = {
    method: "POST",
    url: "https://odyssey-hacksc.auth0.com/oauth/token",
    body: {
      grant_type: "password",
      username: Cypress.env("SPONSOR_TEST_USERNAME"),
      password: Cypress.env("SPONSOR_TEST_PASSWORD"),
      scope: "openid profile email",
      client_id: Cypress.env("AUTH0_CLIENT_ID"),
      client_secret: Cypress.env("AUTH0_CLIENT_SECRET"),
    },
  };
  cy.request(options);
});

Cypress.Commands.add("goToSponsor", (overrides = {}) => {
  cy.login()
    .then((resp) => {
      return resp.body;
    })
    .then((body) => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state",
      };
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.get("#username").type(Cypress.env("SPONSOR_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("SPONSOR_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/sponsor");
    });
});

describe("goSponsor", () => {
  it("should land on the sponsor main page", () => {
    cy.goToSponsor();
  });
});

Cypress.Commands.add("goToScan", (overrides = {}) => {
  cy.login()
    .then((resp) => {
      return resp.body;
    })
    .then((body) => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state",
      };
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.get("#username").type(Cypress.env("SPONSOR_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("SPONSOR_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#scan-page").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/scan");
    });
});

describe("goScan", () => {
  it("should navigate to scan page", () => {
    cy.goToScan();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Access Metabase Page

Cypress.Commands.add("goToMetabasePage", (overrides = {}) => {
  cy.login()
    .then((resp) => {
      return resp.body;
    })
    .then((body) => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state",
      };
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.get("#username").type(Cypress.env("SPONSOR_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("SPONSOR_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
    });
});

describe("goMetabasePage", () => {
  it("should navigate to metabase page", () => {
    cy.goToMetabasePage();
  });
});

// * Hacker Manager Page

Cypress.Commands.add("goToHackerManager", (overrides = {}) => {
  cy.login()
    .then((resp) => {
      return resp.body;
    })
    .then((body) => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state",
      };
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.get("#username").type(Cypress.env("SPONSOR_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("SPONSOR_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#hacker-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/hackerManager"
      );
    });
});

describe("goHackerManager", () => {
  it("should navigate to hacker manager page", () => {
    cy.goToHackerManager();
  });
});

// ! Be sure to Logout so other sanity checks don't fail

Cypress.Commands.add("goToLogout", (overrides = {}) => {
  cy.login()
    .then((resp) => {
      return resp.body;
    })
    .then((body) => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state",
      };
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.location("pathname", { timeout: 10000 }).should("include", "/login");
      cy.get("#username").type(Cypress.env("SPONSOR_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("SPONSOR_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#auth-logout-page").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "");
    });
});

describe("goLogout", () => {
  it("should navigate to main page on logout", () => {
    cy.goToLogout();
  });
});
