beforeEach(() => {
  cy.visit("https://www.automationexercise.com")
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
})

describe('Realizando o registro de usuário e a deleção da conta',() =>{
  it.only('Acessando home da página automation Exercise', () => {
    cy.get('h1').contains("Automation")
    cy.get('div.features_items')//Verificar se a seção "feature items" existe na página inicial
  })

  it.only('Acessando página de login/registro, e registrando usuário no signup com NAMA e EMAIL ADDRESS', () => {
    cy.get('div.shop-menu').contains('Login').should('have.attr', 'href', '/login').click()
    cy.get('[data-qa="signup-name"]')
    .type('Mikhel Teste')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Name')
    .and('have.prop','required')

    cy.get('[data-qa="signup-email"]')
    .type('mikhelbarbosa@gmail.com')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Email Address')
    .and('have.prop','required')

    cy.get('[data-qa="signup-button"]').should(($buttonSignupt) => {
      expect($buttonSignupt).to.have.text('Signup')
      expect($buttonSignupt).to.contain('Signup')
      expect($buttonSignupt).to.be.visible
      expect($buttonSignupt).to.have.attr('type','submit')
      expect($buttonSignupt).to.have.class('btn')
    }).click()

    // Verificando se o title contém na página e se está visível
    cy.get('div.login-form').contains('Enter Account Information').should('be.visible')
    cy.get('[data-qa="title"]')
    .should('be.visible')
    .and('have.attr','class', 'radio')

    //clicando no checkbox do Mr ou Mrs
    cy.get('[id="id_gender1"]')
    .should('be.visible')
    .and('have.attr', 'type', 'radio')
    .click()

    // Validando o campo password e inserindo a senha
    cy.get('div.requiredform-group').contains('Password').should('be.visible')

    cy.get('[data-qa="password"]')
    .type('12345')
    .should('have.value', '12345')
  })
  
})


describe('Teste Login Inválido e validações de acesso', () => {
  it('Usuário faz login com username e senha inválida', () => {
    cy.get('div.shop-menu').contains('Login').should('have.attr', 'href', '/login').click()
    cy.get('[data-qa="login-email"]')
    .type('teste@gmail.com')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Email Address')
    .and('have.prop','required')
    
    // também funciona o cy.get(.login-email(nome da div)).find('input[name="email"]') pega a div, e dentro da div encontra o input que contém o name=email
    cy.get('[data-qa="login-password"]').type('12345').should('have.value', '12345')

    cy.get('[data-qa="login-button"]').should(($button) =>{
      expect($button).to.have.text('Login')
      expect($button).to.contain('Login')
      expect($button).to.be.visible
      expect($button).to.have.attr('type', 'submit')
      expect($button).to.have.class('btn')
    }).click()

    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})

describe('Testando e validando itens para compra, inserir item no carrinho e continuar a compra', () => {
  it('Acessando a página de produtos usando intercept', () => {
    cy.intercept('GET', '/products').as('getProdutos')

    cy.get('.navbar-nav').contains('Products').then(($btn) =>{
      cy.wrap($btn).click()
    })

    cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
  })
  
  it('Verificando itens para compra', () => {
    cy.get('.features_items') //acessando o primeiro elemento filho do item
    cy.get('.features_items').children().first()
    cy.get('.features_items').children().last() //acessando filhos de um elemento, pegando o ultimo filho do array
    cy.get('.features_items').children().eq(2) //acessando elemento de array em especifico -- eq = index especifico, pegando segundo filho

    cy.get('[data-product-id="2"]')
  })
  
  it('Colocar item no carrinho e continuar comprando', () =>{
    cy.get('[data-product-id="2"]').contains('Add to cart').click()
    cy.get('#cartModal').contains('Added')
    cy.get('button.close-modal', {timeout: 5000}).click()
  })

  it('GET produtos retorna 200 - usando request', () => {
    cy.request('GET', 'api/productsList').should((response)=>{
      expect(response.status).to.be.eq(200)
      expect(response.body).not.to.be.empty
      let body = JSON.parse(response.body)
      expect(body.products).to.be.an('array')
      expect(body.products).to.have.length.above(1)
    })
    //comment for test
  })
})