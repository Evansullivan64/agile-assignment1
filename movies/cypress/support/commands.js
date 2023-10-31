

Cypress.Commands.add('checkErrorMessageForInvalidAuthor', () => {
    cy.get('button[type="submit"]').click(); 
  
    cy.get('p.MuiTypography-root.MuiTypography-h6.css-2ulfj5-MuiTypography-root')
      .should('be.visible')
      .and('contain', 'Name is required');
  });