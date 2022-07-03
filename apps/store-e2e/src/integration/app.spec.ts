import { getGreeting } from '../support/app.po';

describe('store', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Board Game Hoard', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Board Game Hoard');
  });
});
