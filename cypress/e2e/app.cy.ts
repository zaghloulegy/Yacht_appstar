// describe('Signup', () => {
//   it('a user can create account with email and password', () => {
//     cy.visit('/');
//     cy.getBySel('"sign-in"').click();
//     cy.wait(1000);
//     cy.get('.amplify-tabs-item')
//         .last()
//         .click();
//     cy.get('[placeholder="Email"]')
//         .type('marioskontis@outlook.com');
//     cy.get('[placeholder="Password"]')
//         .type(Cypress.env('TEST_USER_PASSWORD'));
//     cy.get('[placeholder="Confirm Password"]')
//         .type(Cypress.env('TEST_USER_PASSWORD'));
//     cy.get('[type="submit"]')
//         .click();
//   });
// });

describe('Login-Logout', () => {
  it('user successfully logs in', () => {
    cy.signIn();
  });

  it('user successfully logs out', () => {
    cy.signOut();
  });
});

describe('Add Vessel to your Fleet', () => {
  it('should add a vessel to your fleet given the 9 digit MMSI number', () => {
    cy.signIn();
    cy.getBySel('"addVessel"')
        .click();
    cy.getBySel('"MMSI-input"')
        .type('227286000')
        .type('{enter}');
    cy.signOut();
  });
});

describe('Menu', () => {
  it('checks menu options', () => {
    cy.signIn();
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
    cy.signOut();
  });
});

describe.only('User at sea', () => {
  it('a user can record time at sea', () => {
    cy.signIn();
    cy.addDefaultVessels();
    cy.getBySel('"vesAt"')
        .first()
        .click();
    cy.getBySel('"atSea"')
        .click();
    cy.wait(60000);
    cy.getBySel('"disembark"')
        .click();
    cy.saveLocalStorage('test');
  });
  it('should ', () => {
    cy.signIn();
    cy.restoreLocalStorage('test');
    cy.getBySel('"menuID"')
        .click();
    cy.getBySel('"yourVoyages"')
        .click();
    cy.wait(4000);
  });
});

describe('User in command', () => {
  it('a user can record time at sea being in command', () => {
    cy.signIn();
    cy.addDefaultVessels();
    cy.getBySel('"menuID"')
        .click();
    cy.getBySel('"yourFleet"')
        .click();
    cy.getBySel('"vesAt"')
        .first()
        .click();
    cy.wait(3000);
    cy.getBySel('"atSea"')
        .click();
    cy.getBySel('"inCommand"')
        .click();
    cy.getBySel('"relComm"')
        .click();
    cy.getBySel('"disembark"')
        .click();
  });

  it('a user gets a warning when put in command and not at sea', () => {
    cy.getBySel('"inCommand"')
        .click();
    cy.getBySel('"warning"')
        .contains('You must be at sea to be in command of a vessel');
  });
});

describe.only('Voyage Data (API)', () => {
  it('a user can view voyage data by making an API call', () => {
    cy.signIn();
    cy.addDefaultVessels();
    cy.getBySel('"vesAt"')
        .first()
        .click();
    cy.getBySel('"atSea"')
        .click();
    cy.wait(60000);
    cy.getBySel('"disembark"')
        .click();
    cy.saveLocalStorage('apiTtest');
  });

  it('should ', () => {
    cy.signIn();
    cy.restoreLocalStorage('apiTest');
    cy.getBySel('"menuID"')
        .click();
    cy.getBySel('"yourVoyages"')
        .click();
    cy.getBySel('"createReport"')
        .click();
    cy.getBySel('"createReport"')
        .contains('Days at sea:');
  });
});
