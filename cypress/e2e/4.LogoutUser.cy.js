describe('Teste de Logout', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it('Logando e saindo da conta', () => {
    cy.get('h1').contains('Automation').should('be.visible');

    cy.get('[href="/login"]').contains('Login').should('be.visible').click();

    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .type('mikhelbarbosa@gmail.com');

    cy.get('[data-qa="login-password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password')
      .type('12345');

    cy.get('[data-qa="login-button"]')
      .contains('Login')
      .should('be.visible')
      .click();

    cy.get('.navbar-nav').contains('Mikhel');

    cy.get('[href="/logout"]').contains('Logout').should('be.visible').click();
  });
});
