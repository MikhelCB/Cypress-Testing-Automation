describe('Aprendendo conceitos Cypress', () => {
  it('1 - Usuário faz login com username e senha inválida', () => {
    cy.visit('/')
    cy.get('div.shop-menu').contains('Login').should('have.attr', 'href', '/login').click()
    cy.get('[data-qa="login-email"]')
    .type('teste@gmail.com')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Email Address')
    .and('have.prop','required')


    // também funciona o cy.get(.login-email(nome da div)).find('input[name="email"]') pega a div, e dentro da div encontra o input que contém o name=email
    cy.get('[data-qa="login-password"]').type('12345').should('have.value', '12345')

    //     utilizando o .then
    // cy.get('[data-qa="login-button"]').as('btnLogin').then(($button) =>{
    //   expect($button).to.have.text('Login')
    //   expect($button).to.contain('Login')
    //   expect($button).to.be.visible
    //   expect($button).to.have.attr('type', 'submit')
    //   expect($button).to.have.class('btn')

    //   cy.wrap($button).click()
    // })


    cy.get('[data-qa="login-button"]').should(($button) =>{
      expect($button).to.have.text('Login')
      expect($button).to.contain('Login')
      expect($button).to.be.visible
      expect($button).to.have.attr('type', 'submit')
      expect($button).to.have.class('btn')
    }).click()

    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
  
  it('2- Acessando home da página automation Exercise', () => {
    cy.visit('/')
    cy.get('h1').contains("Automation")

    cy.get('div.features_items')//Verificar se a seção "feature items" existe na página inicial
  })

  it('3- Verificando itens para compra', () => {
    cy.visit('/')
    cy.get('.features_items') //acessando o primeiro elemento filho do item
    cy.get('.features_items').children().first()
    cy.get('.features_items').children().last() //acessando filhos de um elemento, pegando o ultimo filho do array
    cy.get('.features_items').children().eq(2) //acessando elemento de array em especifico -- eq = index especifico, pegando segundo filho

    cy.get('[data-product-id="2"]')
  })

  it('4- Colocar item no carrinho e continuar comprando', () =>{
    cy.visit('/')
    cy.get('[data-product-id="2"]').contains('Add to cart').click()
    cy.get('#cartModal').contains('Added')
    cy.get('button.close-modal', {timeout: 5000}).click()
  })

  it('5- Acessando a página de produtos usando intercept', () => {
    cy.visit('/')
    cy.intercept('GET', '/products').as('getProdutos')

    cy.get('.navbar-nav').contains('Products').then(($btn) =>{
      cy.wrap($btn).click()
    })

    cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
  })

  it.only('6 - GET produtos retorna 200 - usando request', () => {
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