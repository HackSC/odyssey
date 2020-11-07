Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0"
  });

  const options = {
    method: "POST",
    url: "https://odyssey-hacksc.auth0.com/oauth/token",
    body: {
      grant_type: "password",
      username: Cypress.env("ADMIN_TEST_USERNAME"),
      password: Cypress.env("ADMIN_TEST_PASSWORD"),
      scope: "openid profile email",
      client_id: Cypress.env("AUTH0_CLIENT_ID"),
      client_secret: Cypress.env("AUTH0_CLIENT_SECRET")
    }
  };
  cy.request(options);
});

Cypress.Commands.add("goToAdmin", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/admin");
    });
});

describe("goAdmin", () => {
  it("should land on the admin main page", () => {
    cy.goToAdmin();
  });
});

Cypress.Commands.add("goToScan", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
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

Cypress.Commands.add("goToCheckin", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#checkin-page").click();
      cy.location("pathname", { timeout: 10000 }).should("include", "/checkin");
    });
});

describe("goCheckin", () => {
  it("should navigate to checkin page", () => {
    cy.goToCheckin();
  });
  // * Add in function to be able to navigate back to main /admin page
});

Cypress.Commands.add("goToRoleManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#role-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/roleManager"
      );
    });
});

describe("goRoleManager", () => {
  it("should navigate to role manager page", () => {
    cy.goToRoleManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Task Manager Page

Cypress.Commands.add("goToTaskManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#task-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/taskManager"
      );
    });
});

describe("goTaskManager", () => {
  it("should navigate to task manager page", () => {
    cy.goToTaskManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * House Manager Page

Cypress.Commands.add("goToHouseManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#house-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/houseManager"
      );
    });
});

describe("goHouseManager", () => {
  it("should navigate to house manager page", () => {
    cy.goToHouseManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Schedule Manager Page

Cypress.Commands.add("goToScheduleManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#schedule-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/scheduleManager"
      );
    });
});

describe("goScheduleManager", () => {
  it("should navigate to schedule manager page", () => {
    cy.goToScheduleManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Hacker Manager Page

Cypress.Commands.add("goToHackerManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
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
  // * Add in function to be able to navigate back to main /admin page
});

// * Judging Manager Page

Cypress.Commands.add("goToJudgingManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#judging-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/judgingManager"
      );
    });
});

describe("goJudgingManager", () => {
  it("should navigate to judging manager page", () => {
    cy.goToJudgingManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Battlepass Manager Page

Cypress.Commands.add("goToBattlepassManager", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#battlepass-manager-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/battlepassManager"
      );
    });
});

describe("goBattlepassManager", () => {
  it("should navigate to Battlepass manager page", () => {
    cy.goToBattlepassManager();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Mail Query Page

Cypress.Commands.add("goToMailQuery", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      cy.get("#mail-query-page").click();
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        "/mailQuery"
      );
    });
});

describe("goMailQuery", () => {
  it("should navigate to mail query page", () => {
    cy.goToMailQuery();
  });
  // * Add in function to be able to navigate back to main /admin page
});

// * Access Metabase Page

Cypress.Commands.add("goToMetabasePage", (overrides = {}) => {
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
      cy.get("#username").type(Cypress.env("ADMIN_TEST_USERNAME"));
      cy.get(":input[type=password]").type(
        Cypress.env("ADMIN_TEST_PASSWORD").replace("{", "{{}")
      );
      cy.get("[name=action]").click();
      //cy.get("#metabase-page").click();
      // cy.location("pathname", { timeout: 10000 }).should(
      //   "include",
      //   "/mailQuery"
      // );
    });
});

describe("goMetabasePage", () => {
  it("should navigate to metabase page", () => {
    cy.goToMetabasePage();
  });
  // * Add in function to be able to navigate back to main /admin page
});
