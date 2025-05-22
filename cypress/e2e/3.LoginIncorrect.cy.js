describe('Teste Login Inválido e validações de acesso', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it('Usuário faz login com username e senha inválida', () => {
    cy.get('div.shop-menu')
      .contains('Login')
      .should('have.attr', 'href', '/login')
      .click();
    cy.get('[data-qa="login-email"]')
      .type('teste@gmail.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required');

    // também funciona o cy.get(.login-email(nome da div)).find('input[name="email"]') pega a div, e dentro da div encontra o input que contém o name=email
    cy.get('[data-qa="login-password"]')
      .type('12345')
      .should('have.value', '12345');

    cy.get('[data-qa="login-button"]')
      .should(($button) => {
        expect($button).to.have.text('Login');
        expect($button).to.contain('Login');
        expect($button).to.be.visible;
        expect($button).to.have.attr('type', 'submit');
        expect($button).to.have.class('btn');
      })
      .click();

    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});
