describe("Teste Pesquisando produtos", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it("Uusário realiza a tentiva de pesquisar produtos", () => {
    cy.get("[data-ride='carousel']")
      .contains("Automation")
      .should("be.visible"); // Verificando h1 Automation

    cy.get(".shop-menu")
      .contains("Products")
      .should("be.visible")
      .and("have.attr", "href", "/products")
      .click(); //Clicando em produtos e verificando visibilidade

    cy.get(".features_items").contains("All Products").should("be.visible"); // Verifica se estamos na página que deverá mostrar todos os produtos
    cy.get(".form-control")
      .type("Cotton Mull Embroidered Dress")
      .should("be.visible")
      .and("have.attr", "type", "text")
      .and("to.have", "class", "form-control input-lg")
      .and("to.have", "text", "text"); //Validando e inserindo pesquisa no campo de search product

    cy.get(".btn-lg")
      .should("to.have", "class", "btn btn-default btn-lg")
      .and("have.attr", "type", "button")
      .click(); //clicando no botão para pesquisar o produto

    cy.get(".product-image-wrapper")
      .contains("Cotton Mull Embroidered Dress")
      .should("be.visible"); //verificando existência do produto na pesquisa
  });
});
