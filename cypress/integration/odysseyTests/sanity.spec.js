Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0"
  });

  const options = {
    method: "POST",
    url: "https://odyssey-hacksc.auth0.com/oauth/token",
    body: {
      grant_type: "password",
      username: Cypress.env("test_username"),
      password: Cypress.env("test_password"),
      scope: "openid profile email",

      client_id: Cypress.env("auth0_client_id"),
      client_secret: Cypress.env("auth0_client_secret")
    }
  };
  cy.request(options);
});

Cypress.Commands.add("devLogin", role => {
  let id = role == "admin" ? "adminy" : 0;
  cy.request({
    url: `/auth/devlogin?id=${id}`
  });
});

Cypress.Commands.add("goToDashboard", (overrides = {}) => {
  cy.login()
    .then(resp => {
      return resp.body;
    })
    .then(body => {
      const { access_token, expires_in, id_token } = body;
      const auth0State = {
        nonce: "",
        state: "some-random-state"
      };
      const callbackUrl = `/auth/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
      cy.visit(callbackUrl, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        }
      });
      cy.get("#1-email").type(Cypress.env("test_username"));
      cy.get(":input[type=password]").type(Cypress.env("test_password"));
      cy.get("[name=submit]").click();
    });
});

// describe("goDashboard", () => {
//   it("should land on the dashboard", () => {
//     cy.goToDashboard();
//   });
// });

beforeEach(() => {
  cy.clearCookies();
});

describe("goToApplication", () => {
  it("should land on the application", () => {
    cy.devLogin("hacker").then(() => {
      cy.visit("/application");
    });
  });
});

describe("goToResults", () => {
  it("should land on the results page", () => {
    cy.devLogin("hacker").then(() => {
      cy.visit("/results");
    });
  });
});

describe("goToTeam", () => {
  it("should land on the team page", () => {
    cy.devLogin("hacker").then(() => {
      cy.visit("/team");
    });
  });
});

describe("goToAdminDashboard", () => {
  it("should redirect if not admin", () => {
    cy.devLogin("");
    cy.visit("/admin");
    cy.url().should("include", "dashboard");
  });
  it("should land on the admin apge if admin", () => {
    cy.devLogin("admin");
    cy.visit("/admin");
    cy.url().should("include", "admin");
  });
});

describe("goToScan", () => {
  it("should land on the scan page if admin", () => {
    cy.devLogin("admin");
    cy.visit("/scan");
    cy.url().should("include", "scan");
  });
});
