context("Добавляем товар в корзину", () => {
  beforeEach(() => {
    cy.visit("https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html");
  });

  it("Выбираем", () => {
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
