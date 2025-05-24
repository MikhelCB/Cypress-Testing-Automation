describe("Verificando assinatura da página", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
  });

  it("Verificando assinatura da página home", () => {
    cy.get("[data-ride='carousel']")
      .contains("Automation")
      .should("be.visible"); // Verificando h1 Automation

    cy.get(".searchform").scrollIntoView(); //Rolando o scroll até o campo de inserção do e-mail

    cy.get(".single-widget").contains("Subscription").should("be.visible"); //Verificando se esta na parte de assinatura

    cy.get("input")
      .eq(1)
      .type("mikhelbarbosa@gmail.com")
      .should("have.attr", "placeholder", "Your email address"); //inserindo email no input de assinatura

    cy.get(".fa-arrow-circle-o-right")
      .should("to.have", "class", "fa fa-arrow-circle-o-right")
      .click(); //clicando no botão para enviar a assinatura
  });
});
