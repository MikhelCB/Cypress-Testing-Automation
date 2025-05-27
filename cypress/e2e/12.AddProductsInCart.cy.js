describe("Adicionando produtos no carrinho", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
  });

  it("Add produtos no carrinho", () => {
    cy.get("[data-ride='carousel']")
      .contains("Automation")
      .should("be.visible"); // Verificando h1 Automation

    cy.get(".shop-menu")
      .contains("Products")
      .should("be.visible")
      .and("to.have", "class", "material-icons card_travel")
      .click(); //Clicando no botão de produtos

    cy.get("[data-product-id='1']").scrollIntoView(); //Rolando o scroll até o campo de inserção do e-mail
  });
});
