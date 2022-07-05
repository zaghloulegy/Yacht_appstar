beforeEach(() => {
  cy.visit('http://localhost:19006');
});

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.contains('Yacht Appstar')
        .should('be.visible');
    cy.wait(3000);
  });
});

describe('Yacht appstar tests suite', () => {
  it('should add a vessel to your fleet given the 9 digit MMSI number', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid=addVessel')
        .click();
    cy.get('[data-testid=MMSI-input')
        .type('227286000')
        .type('{enter}');
  });

  it('check menu options', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid="menuID"]')
        .click();
    cy.contains('Your Fleet').should('be.visible');
    cy.contains('Profile').should('be.visible');
    cy.contains('Voyages').should('be.visible');
    cy.contains('Sign Out').should('be.visible');
    cy.get('[data-testid="closeMenu"]')
        .click();
  });

  it('Your Fleet', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid="menuID"]')
        .click();
    cy.get('[data-testid="yourFleet"]')
        .click();
    cy.contains('Your Fleet')
        .should('be.visible')
        .should('have.css', 'color')
        .and('equal', 'rgb(241, 250, 238)');
    cy.contains('Delete')
        .should('be.visible');
  });

  it('Profile', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid="menuID"]')
        .click();
    cy.get('[data-testid="yourProfile"]')
        .click();
    cy.contains('Delete Profile').should('be.visible');
    cy.wait(2000);
  });

  it('Voyages', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid="menuID"]')
        .click();
    cy.get('[data-testid="yourVoyages"]')
        .click();
    cy.contains('Voyages').should('be.visible');
    // cy.wait(2000);
  });

  it('Sign out', () => {
    cy.get('[data-testid="sign-in"]')
        .click();
    cy.wait(1000);
    cy.get('[placeholder="Email"]')
        .type('kontism@gmail.com');
    cy.get('[placeholder="Password"]')
        .type('v$4f85z9isP.ibu');
    cy.wait(2000);
    cy.get('[type="submit"]')
        .click();
    cy.wait(4000);

    cy.get('[data-testid="menuID"]')
        .click();
    cy.wait(2000);
    cy.get('[data-testid="signout"]')
        .click();
  });
});


