/* eslint-disable no-undef */
// https://docs.cypress.io/api/introduction/api.html

describe('Sanity Test', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.contains('.app-header code', 'window.blocklet =');
  });
});
describe('Etherscan page', () => {
  it('visits Etherscan page', () => {
    cy.get('.app-link:nth-of-type(2)').click();
    cy.get('#address-input')
      .type('0xeb2a81e229b68c1c22b6683275c00945f9872d90')
      .get('#page-input')
      .type('1')
      .get('#etherscan-search')
      .click();
  });
});
