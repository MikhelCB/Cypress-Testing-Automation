describe('enviando um formulário', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it('Enviando um formulário', () => {
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

    cy.get('.shop-menu').contains('Contact us').should('be.visible').click();

    cy.get('h2').contains('Get In Touch');

    cy.get('[data-qa="name"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Name')
      .type('Mikhel Cabral');

    cy.get('[data-qa="email"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email')
      .type('mikhelbarbosa@gmail.com');

    cy.get('[data-qa="subject"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Subject')
      .type('Teste, testando');

    cy.get('[data-qa="message"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Your Message Here')
      .type(
        'Teste, testandoTeste, testandoTeste, testandoTeste, testandoTeste, testando'
      );

    cy.get('[data-qa="submit-button"]').should('be.visible').click();

    cy.get('[style="display: block;"]').contains(
      'Success! Your details have been submitted successfully.'
    );

    cy.get('.btn-success').contains('Home').should('be.visible').click();
  });
});
