describe("Teste de login correto", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it("Verificando login correto do usuário", () => {
    cy.get(".navbar-nav").contains("Home").should("be.visible"); //Verificando Botão HOME
    cy.get("[data-ride='carousel']")
      .contains("Automation")
      .should("be.visible"); // Verificando h1 Automation

    cy.get(".navbar-nav").contains("Login").should("be.visible").click(); //clicando no botão de signup e login

    cy.get(".login-form")
      .contains("Login to your account")
      .should("be.visible"); // Verificando pagina de login

    cy.get("[data-qa='login-email']")
      .type("mikhelbarbosa@gmail.com")
      .should("be.visible")
      .and("have.attr", "placeholder", "Email Address")
      .and("have.prop", "required"); //verificando input de email e inserindo

    cy.get("[data-qa='login-password']")
      .type("12345")
      .should("be.visible")
      .and("have.attr", "placeholder", "Password")
      .and("have.prop", "required"); //verificando input de senha e inserindo

    cy.get("[data-qa='login-button']")
      .should("be.visible")
      .and("have.attr", "type", "submit")
      .click(); //clicando no botão de logar

    cy.get(".navbar-nav")
      .contains("Logged in as Mikhel Teste")
      .should("be.visible"); //Verificando se estou logado

    cy.get(".navbar-nav")
      .contains("Delete Account")
      .should("have.attr", "href", "/delete_account")
      .click(); //clicando no botão de excluir conta

    cy.get("[data-qa='account-deleted']")
      .contains("Account Deleted!")
      .should("be.visible");

    cy.get("[data-qa='continue-button']")
      .contains("Continue")
      .should("be.visible")
      .and("have.attr", "href", "/")
      .click();
  });
});
