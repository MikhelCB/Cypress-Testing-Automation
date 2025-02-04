describe('Realizando o registro de usuário e a deleção da conta', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com'); // Garantindo que a página inicial é carregada antes de cada teste
  });

  it('Acessando home da página automation Exercise', () => {
    cy.get('h1', { timeout: 10000 }).contains('Automation');
    cy.get('div.features_items', { timeout: 10000 }).should('be.visible');
  });

  it('Acessando página de login/registro, e registrando usuário no signup com NAME e EMAIL ADDRESS', () => {
    cy.get('div.shop-menu')
      .contains('Login')
      .should('have.attr', 'href', '/login')
      .click();
    cy.get('[data-qa="signup-name"]')
      .type('Mikhel Teste')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Name')
      .and('have.prop', 'required');

    cy.get('[data-qa="signup-email"]')
      .type('mikhelbarbosa@gmail.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required');

    cy.get('[data-qa="signup-button"]')
      .should(($buttonSignupt) => {
        expect($buttonSignupt).to.have.text('Signup');
        expect($buttonSignupt).to.contain('Signup');
        expect($buttonSignupt).to.be.visible;
        expect($buttonSignupt).to.have.attr('type', 'submit');
        expect($buttonSignupt).to.have.class('btn');
      })
      .click();

    // Verificando se o title contém na página e se está visível
    cy.get('div.login-form')
      .contains('Enter Account Information')
      .should('be.visible');
    cy.get('[data-qa="title"]')
      .should('be.visible')
      .and('have.attr', 'class', 'radio');

    //clicando no checkbox do Mr ou Mrs
    cy.get('[id="id_gender1"]')
      .should('be.visible')
      .and('have.attr', 'type', 'radio')
      .click();

    // Validando o campo password e inserindo a senha
    cy.get('div.form-group').contains('Password').should('be.visible');
    cy.get('[data-qa="password"]').type('12345').should('have.value', '12345');

    // Validando a div form group dos calendários, selecionando as datas: Dia, Mês e Ano e clicando na newsletter
    cy.get('div.form-group').contains('Date of Birth').should('be.visible');
    cy.get('[data-qa="days"]').select('4').should('have.value', '4');
    cy.get('[data-qa="months"]').select('November').should('have.value', '11');
    cy.get('[data-qa="years"]').select('2003').should('have.value', '2003');

    //Checkbox 1

    cy.get('div.checkbox')
      .contains('Sign up for our newsletter!')
      .should('be.visible')
      .click();

    //Checkbox 2
    cy.get('div.checkbox')
      .contains('Receive special offers from our partners!')
      .should('be.visible')
      .click();

    // Inserindo campos de Address Information
    cy.get('[data-qa="first_name"]')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .type('Mikhel')
      .and('have.value', 'Mikhel');

    cy.get('[data-qa="last_name"]')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .type('Teste')
      .should('have.value', 'Teste');

    cy.get('[data-qa="company"]')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .type('Digitro')
      .should('have.value', 'Digitro');

    cy.get('[data-qa="address"]')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .type('Rua João Jorge Mussi, 57')
      .should('have.value', 'Rua João Jorge Mussi, 57');

    cy.get('[data-qa="address2"]')
      .should('be.visible')
      .and('have.attr', 'type', 'text')
      .type('Rua Fracisco Tolentino, 423')
      .should('have.value', 'Rua Fracisco Tolentino, 423');

    // Select Country
    cy.get('[data-qa="country"]')
      .select('United States')
      .should('have.value', 'United States')
      .and('have.attr', 'name', 'country');

    //State
    cy.get('[data-qa="state"]')
      .should('be.visible')
      .type('California')
      .should('have.value', 'California')
      .and('have.attr', 'name', 'state');

    //City
    cy.get('[data-qa="city"]')
      .should('be.visible')
      .type('São Francisco')
      .should('have.value', 'São Francisco')
      .and('have.attr', 'name', 'city');

    //ZipCode
    cy.get('[data-qa="zipcode"]')
      .should('be.visible')
      .type('Teste')
      .should('have.value', 'Teste')
      .and('have.attr', 'name', 'zipcode');

    //Phone Number
    cy.get('[data-qa="mobile_number"]')
      .should('be.visible')
      .type('+5548984787939')
      .should('have.value', '+5548984787939')
      .and('have.attr', 'name', 'mobile_number');

    // Clicando no botão de Create Account
    cy.get('[data-qa="create-account"]')
      .should(($buttonCreateAccount) => {
        expect($buttonCreateAccount).to.have.text('Create Account');
        expect($buttonCreateAccount).to.be.visible;
        expect($buttonCreateAccount).to.have.attr('type', 'submit');
        expect($buttonCreateAccount).to.have.class('btn');
      })
      .click();

    //Verificando a existência de ACCOUNT CREATED!
    cy.get('[data-qa="account-created"]')
      .contains('Account Created!')
      .should('be.visible');

    //clicando no botão de Continue
    cy.get('[data-qa="continue-button"]').should('be.visible').click();

    //Verificando se realmente está logado na minha conta, e deleta a minha conta
    cy.get('[class="shop-menu pull-right"]')
      .contains('Logged in as Mikhel')
      .should('be.visible');

    cy.get('[class="shop-menu pull-right"]')
      .contains('Delete Account')
      .should('be.visible')
      .click();

    // Validando Accounte Deleted
    cy.get('[data-qa="account-deleted"]').contains('Account Deleted!');

    //Clicando no botão de continue
    cy.get('[data-qa="continue-button"]').contains('Continue').click();
  });
});
