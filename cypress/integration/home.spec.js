describe('Homepage', () => {
  it('finds the content "Dashboard"', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Dashboard');
  })
});
