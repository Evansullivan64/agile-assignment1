describe('Review Form Interaction', () => {
    it('Successfully submits a review with valid inputs', () => {

        cy.visit("/");
        cy.get("button[aria-label='add to favorites']").eq(0).click();
       
        cy.get("button").contains("Favorites").click();
        cy.get(".MuiCardActions-root").eq(0).find("a[href='/reviews/form']").click();
    

      const authorName = 'John Doe';
      const validReview =
        'This movie was amazing! It kept me engaged throughout the entire story.';
  
      
  
      cy.get('input[name="author"]').type(authorName);
      cy.get('textarea[name="review"]').type(validReview);
  
      // Select 'Excellent' rating
      cy.get("#select-rating").click();
      cy.get("li").contains("Good").click();
  
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-testid="success-snackbar"]').should('be.visible');
      cy.get('[data-testid="success-snackbar"]')
        .should('contain', 'Thank you for submitting a review')
        .and('contain', authorName);
  
      cy.get('[data-testid="close-snackbar"]').click();
      cy.get('[data-testid="success-snackbar"]').should('not.exist');
    });
  
    it('Displays an error message for too short review', () => {
      const authorName = 'Alice';
      const shortReview = 'Too short';
  
      cy.visit('/write-review');
  
      cy.get('input[name="author"]').type(authorName);
      cy.get('textarea[name="review"]').type(shortReview);
  
      // Select 'Average' rating
      cy.get('#select-rating').select('Average');
  
      cy.get('button[type="submit"]').click();
  
      cy.get('h6')
        .should('be.visible')
        .and('contain', 'Review is too short');
    });
  });