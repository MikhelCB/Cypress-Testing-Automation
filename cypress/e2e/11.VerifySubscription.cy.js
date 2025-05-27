describe("Verificando inscrição na página home", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
  });

  it("Verificando assinatura da página home", () => {
    cy.get("[data-ride='carousel']")
      .contains("Automation")
      .should("be.visible"); // Verificando h1 Automation

    cy.get(".shop-menu")
      .contains("Cart")
      .should("be.visible")
      .and("to.have", "class", "fa fa-shopping-cart")
      .click(); //Clicando e verificando o botão de carrinho

    cy.get(".searchform").scrollIntoView(); //Rolando o scroll até o campo de inserção do e-mail

    cy.get("input")
      .eq(1)
      .type("mikhelbarbosa@gmail.com")
      .should("have.attr", "placeholder", "Your email address"); //inserindo email no input de assinatura

    cy.get(".fa-arrow-circle-o-right")
      .should("to.have", "class", "fa fa-arrow-circle-o-right")
      .click(); //clicando no botão para enviar a assinatura

    cy.get(".alert-success")
      .contains("You have been successfully subscribed!")
      .should("be.visible"); //Verificando mensagem de sucesso
  });
});
