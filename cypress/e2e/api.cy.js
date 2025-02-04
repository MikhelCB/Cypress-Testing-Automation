describe('Testando e validando itens para compra, inserir item no carrinho e continuar a compra', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });
  it('Acessando a página de produtos usando intercept', () => {
    cy.intercept('GET', '/products').as('getProdutos');

    cy.get('.navbar-nav')
      .contains('Products')
      .then(($btn) => {
        cy.wrap($btn).click();
      });

    cy.wait('@getProdutos').its('response.statusCode').should('eq', 200);
  });

  it('Verificando itens para compra', () => {
    cy.get('.features_items'); //acessando o primeiro elemento filho do item
    cy.get('.features_items').children().first();
    cy.get('.features_items').children().last(); //acessando filhos de um elemento, pegando o ultimo filho do array
    cy.get('.features_items').children().eq(2); //acessando elemento de array em especifico -- eq = index especifico, pegando segundo filho

    cy.get('[data-product-id="2"]');
  });

  it('Colocar item no carrinho e continuar comprando', () => {
    cy.get('[data-product-id="2"]').contains('Add to cart').click();
    cy.get('#cartModal').contains('Added');
    cy.get('button.close-modal', { timeout: 5000 }).click();
  });

  it('GET produtos retorna 200 - usando request', () => {
    cy.request('GET', 'api/productsList').should((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
      let body = JSON.parse(response.body);
      expect(body.products).to.be.an('array');

      expect(body.products).to.have.length.above(1);
    });
    //comment for test
  });
});
