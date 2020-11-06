Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0"
  });

  const options = {
    method: "POST",
    url: "https://odyssey-hacksc.auth0.com/oauth/token",
    body: {
      grant_type: "password",
      username: Cypress.env("TEST_USERNAME"),
      password: Cypress.env("TEST_PASSWORD"),
      scope: "openid profile email",
      client_id: Cypress.env("AUTH0_CLIENT_ID"),
      client_secret: Cypress.env("AUTH0_CLIENT_SECRET")
    }
  };
  cy.request(options);
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
      const mainPage = `http://localhost:3000/auth/login`;
      cy.visit(mainPage, {
        onBeforeLoad(win) {
          win.document.cookie =
            "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
        }
      });
      // * Retired Callback Logic Below
      // const callbackUrl = `http://localhost:3000/auth/callback?access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
      // cy.visit(callbackUrl, {
      //   onBeforeLoad(win) {
      //     win.document.cookie =
      //       "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
      //   }
      // });
      // cy.get("#username").type(Cypress.env("TEST_USERNAME"));
      // cy.get(":input[type=password]").type(Cypress.env("TEST_PASSWORD"));
      // cy.get("[name=action]").click();
    });
});

describe("goDashboard", () => {
  it("should land on the dashboard", () => {
    cy.goToDashboard();
  });
});
