const { assert } = require("console");

let hackathonConstants = {
  showLive: false, // * False until event or soon before
  showDash: false,
  showApp: true, // * True until Dec. 14ish
  showMaps: false, // * False because HackSC 2021 is virtual :( big sad
  showAPI: false, // * False until event
  showResults: true,
  showTeam: false, // * False until closer to event
  showProjectTeam: false // * False until closer to event
};

Cypress.on("uncaught:exception", (err, runnable) => {
  // * Returning false here prevents Cypress from failing the test
  return false;
});

const timeout = 50000;

Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0"
  });

  const options = {
    method: "POST",
    url: "https://odyssey-hacksc.auth0.com/oauth/token",
    body: {
      grant_type: "password",
      username: Cypress.env("USER_TEST_USERNAME"),
      password: Cypress.env("USER_TEST_PASSWORD"),
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
      // cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      // cy.get(":input[type=password]").type(Cypress.env("USER_TEST_PASSWORD"));
      // cy.get("[name=action]").click();
    });
});

Cypress.Commands.add("goToApplication", (overrides = {}) => {
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
      cy.location("pathname", { timeout: timeout }).should("include", "/login");
      cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("USER_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#application-page").click();
      cy.location("pathname", { timeout: timeout }).should(
        "include",
        "/application"
      );
    });
});

Cypress.Commands.add("goToResults", (overrides = {}) => {
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
      cy.location("pathname", { timeout: timeout }).should("include", "/login");
      cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("USER_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#results-page").click();
      cy.location("pathname", { timeout: timeout }).should(
        "include",
        "/results"
      );
      //cy.url().should("contain", "results");
    });
});

Cypress.Commands.add("goToTeam", (overrides = {}) => {
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
      cy.location("pathname", { timeout: timeout }).should("include", "/login");
      cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("USER_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#team-page").click();
      cy.location("pathname", { timeout: timeout }).should("include", "/team");
    });
});

Cypress.Commands.add("goToApiDirectory", (overrides = {}) => {
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
      cy.location("pathname", { timeout: timeout }).should("include", "/login");
      cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("USER_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#api-directory-page").click();
      cy.location("pathname", { timeout: timeout }).should(
        "include",
        "/api-directory"
      );
    });
});

Cypress.Commands.add("goToLogout", (overrides = {}) => {
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
      cy.location("pathname", { timeout: timeout }).should("include", "/login");
      cy.get("#username").type(Cypress.env("USER_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("USER_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#auth-logout-page").click();
      cy.location("pathname", { timeout: timeout }).should("include", "");
    });
});

describe("goDashboard", () => {
  it("should land on the dashboard", () => {
    if (hackathonConstants.showDash) {
      cy.goToDashboard();
    } else {
      assert(true);
    }
  });
});

describe("goApplication", () => {
  it("should navigate to application page", () => {
    if (hackathonConstants.showApp) {
      cy.goToApplication();
    } else {
      assert(true);
    }
  });
});

describe("goResults", () => {
  it("should navigate to results page", () => {
    if (hackathonConstants.showResults) {
      cy.goToResults();
    } else {
      assert(true);
    }
  });
});

describe("goTeam", () => {
  it("should navigate to team page", () => {
    if (hackathonConstants.showTeam) {
      cy.goToTeam();
    } else {
      assert(true);
    }
  });
});

describe("goApiDirectory", () => {
  it("should navigate to api-directory page", () => {
    if (hackathonConstants.showAPI) {
      cy.goToApiDirectory();
    } else {
      assert(true);
    }
  });
});

describe("goLogout", () => {
  it("should navigate to main page on logout", () => {
    cy.goToLogout();
  });
});
