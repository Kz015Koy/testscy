context("Регистрируемся", () => {
  // it("Заходим на регистрацию", () => {
  //   cy.visit("https://magento.softwaretestingboard.com/");
  //   cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').first().click("center");
  //   cy.location("pathname").should("include", "customer/account/create/");
  // });

  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");
  });

  // it("Валидация", () => {
  //   cy.get("#firstname").type("ctac").should("have.value", "ctac");
  //   cy.get("#lastname").type("kruglov").should("have.value", "kruglov");

  //   cy.get('#form-validate button[type="submit"]').click("center");

  //   cy.get('[generated="true"]').should("have.length", 3);
  // });

  // it("Регистрация юзера", () => {
  //   cy.get("#firstname").type("ctac").should("have.value", "ctac");
  //   cy.get("#lastname").type("kruglov").should("have.value", "kruglov");
  //   cy.get("#email_address").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
  //   cy.get("#password").type("ctacklacc228A").should("have.value", "ctacklacc228A");
  //   cy.get("#password-confirmation").type("ctacklacc228A").should("have.value", "ctacklacc228A");

  //   cy.get('#form-validate button[type="submit"]').click("center");
  //   cy.location("pathname").should("include", "customer/account/");

  //   cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");
  // });

  it("Выходим из аккаунта", () => {
    cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/logoutSuccess/");
  });
});
