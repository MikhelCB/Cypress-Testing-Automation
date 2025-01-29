describe('Aprendendo conceitos Cypress', () => {
  it('1 - Usuário faz login com username e senha inválida', () => {
    cy.visit('/')
    cy.get('div.shop-menu').contains('Login').click()
    cy.get('[data-qa="login-email"]').type('teste@gmail.com')
    // também funciona o cy.get(.login-email(nome da div)).find('input[name="email"]') pega a div, e dentro da div encontra o input que contém o name=email
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').contains("Login").click()

    cy.contains('Your email or password is incorrect!')
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

  it.only('5- Acessando a página de produtos usando intercept', () => {
    cy.visit('/')
    cy.intercept('GET', 'products')
    cy.get('.navbar-nav').contains('Products').click()
  })

  it('6 - GET Produtos - usando resquest', () => {
    cy.request('GET', 'api/productsList')
    //comment for test
  })
})