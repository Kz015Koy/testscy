context("Тест магазин Luma", () => {
  it("Заходим на регистрацию", () => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/create/"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/create/");
  });

  it("Валидация", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");
    cy.get("#firstname").type("ctac").should("have.value", "ctac");
    cy.get("#lastname").type("kruglov").should("have.value", "kruglov");

    cy.get('#form-validate button[type="submit"]').click("center");

    cy.get('[generated="true"]').should("have.length", 3);
  });

  it("Регистрация юзера", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/create/");
    cy.get("#firstname").type("ctac").should("have.value", "ctac");
    cy.get("#lastname").type("kruglov").should("have.value", "kruglov");
    cy.get("#email_address").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
    cy.get("#password").type("ctacklacc228A").should("have.value", "ctacklacc228A");
    cy.get("#password-confirmation").type("ctacklacc228A").should("have.value", "ctacklacc228A");

    cy.get('#form-validate button[type="submit"]').click("center");
    cy.location("pathname").should("include", "customer/account/");

    cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");
  });

  it("Заходим на авторизацию", () => {
    cy.visit("https://magento.softwaretestingboard.com/");
    cy.get("li.authorization-link a").first().click("center");
    cy.location("pathname").should("include", "customer/account/login/");
  });

  it("Валидация", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
    cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");

    cy.get('#login-form button#send2[type="submit"]').first().click("center");

    cy.get('[generated="true"]').should("have.length", 1);
  });

  it("Вход", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
    cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
    cy.get("#pass").type("ctacklacc228A").should("have.value", "ctacklacc228A");

    cy.get('#login-form button#send2[type="submit"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/");

    cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");
  });

  it("Выходим из аккаунта", () => {
    cy.visit("https://magento.softwaretestingboard.com/customer/account/login/");
    cy.get("#email").type("krugOl@hotmail.com").should("have.value", "krugOl@hotmail.com");
    cy.get("#pass").type("ctacklacc228A").should("have.value", "ctacklacc228A");

    cy.get('#login-form button#send2[type="submit"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/");

    cy.get("span.logged-in").first().should("contain.text", "Welcome, ctac kruglov!");

    cy.get("span.customer-name button.action.switch").first().click();
    cy.get('li a[href="https://magento.softwaretestingboard.com/customer/account/logout/"]').first().click("center");
    cy.location("pathname").should("include", "customer/account/logoutSuccess/");
  });

  it("Добавление случайного товара в корзину", () => {
    cy.visit("https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html");
    let itemName;
    cy.get("li.item.product.product-item")
      .should("have.length.gt", 3)
      .its("length")
      .then((n) => Cypress._.random(0, n - 1))
      .then((k) => {
        cy.log(`Выбрали ${k} товар из списка`);
        const item = cy.get("li.item.product.product-item").eq(k);
        item.get("a.product-item-link").then((el) => {
          console.log(el[0].innerText);
          itemName = el[0].innerText;
        });
        cy.log(`Товар называется ${itemName}`);
        item.get(".swatch-option.color").eq(Cypress._.random(0, 2)).click("center", { force: true });
        item.get(".swatch-option.text").eq(Cypress._.random(0, 4)).click("center", { force: true });
        //   .then((item) => {
        //     console.log(item.find("a.product-item-link")[0].innerText);
        //     itemName = item.find("a.product-item-link")[0].innerText;
        //     cy.log(`Товар называется ${itemName}`);
        //     item.find(".swatch-option.color")[Cypress._.random(0, 2)].click();
        //     item.find(".swatch-option.text")[Cypress._.random(0, 4)].click();
        //     // item.find("button.action.tocart.primary")[0].click();
        //   });
        item.get("button.action.tocart.primary").first().click("center");
      });
    cy.get("a.action.showcart").first().click("center");
    cy.get("#ui-id-1 strong.product-item-name a").first().should("contain.text", itemName);
  });
});
