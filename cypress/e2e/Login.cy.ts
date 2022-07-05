describe('Login-Logout', () => {
  const TEST_USER_EMAIL = 'kontism@gmail.com';
  const TEST_USER_PASSWORD = 'v$4f85z9isP.ibu';

  // beforeEach(() => {
  //   cy.visit('http://localhost:19006');
  // });

  it('user successfully logs in', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"').click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type(TEST_USER_EMAIL);
    cy.get('[placeholder="Password"]')
        .type(TEST_USER_PASSWORD);
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
