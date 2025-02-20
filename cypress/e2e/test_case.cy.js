describe('Teste de casos de teste', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it('Verificando test cases', () => {
    cy.get('h1').contains('Automation').should('be.visible');

    cy.get('.shop-menu').contains('Test Cases').should('be.visible').click();

    cy.get('h2').contains('Test Cases');
  });
});
