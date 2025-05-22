describe("Teste verificando pagina de casos de", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
  });

  it("Verificando todos os produtos e a página de detalhes do produto", () => {
    const produtos = [
      "Blue Top",
      "Men Tshirt",
      "Sleeveless Dress",
      "Stylish Dress",
    ];
    // Verificando titulo da página home
    cy.get("h1").contains("Automation").should("be.visible");

    //Validando o menu, verificando se tem a opção products e clicando nela
    cy.get(".shop-menu").contains("Products").should("be.visible").click();

    cy.get(".features_items").contains("All Products").should("be.visible"); // Verifica se estamos na página que deverá mostrar todos os produtos

    produtos.forEach((produto) => {
      cy.get(".features_items").contains(produto);
    }); // verificamos uma lista de produtos na página, fazendo um foreach para percorrer toda a nossa lista

    cy.get("[href='/product_details/1']")
      .contains("View Product")
      .should("be.visible")
      .click(); //redirecionando o usuário para a página de detalhes do produto

    cy.get(".product-information")
      .should("be.visible")
      .within(() => {
        cy.contains("Blue Top");
        cy.contains("Category: Women > Tops");
        cy.contains("Rs. 500");
        cy.contains("Availability: In Stock");
      }); //verificando se existe elementos nos detalhes do produto, é usado o within para o escopo da busca, deixando o código limpo
  });
});
