Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0",
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
      client_secret: Cypress.env("auth0_client_secret"),
    },
  };
  cy.request(options);
});

Cypress.Commands.add("goToDashboard", (overrides = {}) => {
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
      const callbackUrl = `http://localhost:3000/auth/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
      cy.visit(callbackUrl, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        },
      });
      cy.get("#1-email").type(Cypress.env("test_username"));
      cy.get(":input[type=password]").type(Cypress.env("test_password"));
      cy.get("[name=submit]").click();
    });
});

describe("goDashboard", () => {
  it("should land on the dashboard", () => {
    cy.goToDashboard();
  });
});
