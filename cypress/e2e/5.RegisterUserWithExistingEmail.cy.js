describe("Teste Verificando usuário de registro já cadastrado", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com");
    //Inserindo beforeEach para que ele visite o site em todos os meus ITs.
  });

  it("Verificando erro de e-mail já registrado", () => {
    cy.get("h1").contains("Automation").should("be.visible"); //Verificando existência da página home
    cy.get(".shop-menu")
      .contains(" Signup / Login")
      .should("be.visible")
      .click(); //clicando no botão de registrar ou logar

    cy.get(".signup-form").contains("New User Signup!").should("be.visible"); //Verificando se New user signup está visivel

    cy.get("[data-qa='signup-name']")
      .type("Mikhel")
      .should("be.visible")
      .and("have.attr", "placeholder", "Name")
      .and("have.attr", "type", "text"); //Inserindo nome no input

    cy.get("[data-qa='signup-email']")
      .type("mikhelcabral22@gmail.com")
      .should("be.visible")
      .and("have.attr", "placeholder", "Email Address")
      .and("have.attr", "type", "email"); //Inserindo e-mail no input

    cy.get("[data-qa='signup-button']")
      .contains("Signup")
      .should("have.attr", "type", "submit")
      .and("to.have", "class", "btn btn-default")
      .click(); //clicando no botão de registrar

    cy.get(".signup-form")
      .contains("Email Address already exist!")
      .should("be.visible"); //Verificando email addres already exists
  });
});
