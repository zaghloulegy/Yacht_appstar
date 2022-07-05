describe('Login-Logout', () => {
  it('user successfully logs in', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"').click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('[placeholder="Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
  });

  it('user successfully logs out', () => {
    cy.getBySel('"menuID"')
        .click();
    cy.wait(2000);
    cy.getBySel('"signout"')
        .click();
  });
});
