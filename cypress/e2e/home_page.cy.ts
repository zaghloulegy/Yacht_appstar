before(() => {
  cy.visit('http://localhost:19006');
});

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.contains('Yacht Appstar').should('be.visible');
  });
});

describe('Login', () => {
  it('Sign in', () => {
    cy.get('[data-testid=sign-in]')
        .click();
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.get('[type="submit"]')
        .click();
  });

  it('Sign out', () => {
    cy.get('[data-testid="menu"]')
        .click();
    cy.get('[data-testid="signout"]')
        .click();
  });
});
