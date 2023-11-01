

Cypress.Commands.add('checkErrorMessageForInvalidAuthor', () => {
    cy.get('button[type="submit"]').click(); 
  
    cy.get('p.MuiTypography-root.MuiTypography-h6.css-2ulfj5-MuiTypography-root')
      .should('be.visible')
      .and('contain', 'Name is required');
  });

  Cypress.Commands.add('selectDropdownOption', { prevSubject: 'element' }, (subject, option) => {
    return cy.wrap(subject).click() 
      .get('li').contains(option).click() 
      .parent() 
  });