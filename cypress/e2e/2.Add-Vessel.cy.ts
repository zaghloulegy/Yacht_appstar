describe('Add Vessel tou you Fleet', () => {
  it('should add a vessel to your fleet given the 9 digit MMSI number', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('[placeholder="Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();

    cy.getBySel('"addVessel"')
        .click();
    cy.getBySel('"MMSI-input"')
        .type('227286000')
        .type('{enter}');
  });
});
