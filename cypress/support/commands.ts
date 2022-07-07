// / <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: any): Chainable<any>;
    addDefaultVessels(): Chainable<any>;
    signIn(): Chainable<any>;
    signOut(): Chainable<any>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('signIn', () => {
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
});

Cypress.Commands.add('addDefaultVessels', () => {
  const VESSEL_ONE = '227286000';
  const VESSEL_TWO = '227286034';
  const VESSEL_THREE = '457286000';

  cy.wrap([VESSEL_ONE, VESSEL_TWO, VESSEL_THREE])
      .each((i) => {
        cy.get('[data-testid=addVessel]', {log: false})
            .click();
        cy.wait(1000);
        cy.get('[data-testid=MMSI-input]')
            .type(`${i}{enter}`, {log: false});
        cy.wait(3000);
      });
});

Cypress.Commands.add('signOut', () => {
  cy.getBySel('"menuID"')
      .click();
  cy.wait(2000);
  cy.getBySel('"signout"')
      .click();
});

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
