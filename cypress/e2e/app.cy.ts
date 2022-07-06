describe.only('Signup', () => {
  it('a user can create account with email and password', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"').click();
    cy.wait(1000);
    cy.get('.amplify-tabs-item')
        .last()
        .click();
    cy.get('[placeholder="Email"]')
        .type('marioskontis@outlook.com');
    cy.get('[placeholder="Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('[placeholder="Confirm Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('[type="submit"]')
        .click();
  });
});

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

describe('Add Vessel tou your Fleet', () => {
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

describe('Menu', () => {
  it('checks menu options', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"')
        .click();
    cy.get('[placeholder="Email"]')
        .type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('[placeholder="Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('[type="submit"]')
        .click();

    cy.getBySel('"menuID"')
        .click();
    cy.contains('Your Fleet')
        .should('be.visible');
    cy.contains('Profile')
        .should('be.visible');
    cy.contains('Voyages')
        .should('be.visible');
    cy.contains('Sign Out')
        .should('be.visible');
    cy.getBySel('"closeMenu"')
        .click();
  });
});

describe('User in command', () => {
  it('a user can record time at sea being in command', () => {
    cy.visit('/');
    cy.getBySel('"sign-in"')
        .click();
    cy.get('[placeholder="Email"]')
        .type(Cypress.env('TEST_USER_EMAIL'));
    cy.get('[placeholder="Password"]')
        .type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('[type="submit"]')
        .click();

    cy.addDefaultVessels();
    cy.getBySel('"vesAt"')
        .first()
        .click();
    cy.getBySel('"atSea"')
        .click();
    cy.getBySel('"disembark"')
        .click();
  });
});
