context("Заходим", () => {
  it("Заходим на авторизацию", () => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get("li.authorization-link a").first().click("center");
    cy.location("pathname").should("include", "customer/account/login/");
  });

  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
  });

  //   it("Валидация", () => {
  //     cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");

  //     cy.get('#login-form button#send2[type="submit"]').first().click("center");

  //     cy.get('[generated="true"]').should("have.length", 1);
  //   });

  //   it("Вход", () => {
  //     cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
  //     cy.get("#pass").type("ctacklacc228A").should("have.value", "ctacklacc228A");

  //     cy.get('#login-form button#send2[type="submit"]').first().click("center");
  //     cy.location("pathname").should("include", "customer/account/");

  //     cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");
  //   });

  it("Выходим из аккаунта", () => {
    cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
    cy.get("#pass").type("ctacklacc228A").should("have.value", "ctacklacc228A");

    cy.get('#login-form button#send2[type="submit"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/");

    cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");

    cy.get("span.customer-name button.action.switch").first().click();
    cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/logoutSuccess/");
  });
});
