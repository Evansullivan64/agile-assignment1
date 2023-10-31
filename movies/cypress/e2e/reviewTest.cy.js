import checkErrorMessageForInvalidAuthor from "../support/commands"

// Scenario 1: Successfully Submits a Review with Valid Inputs
//  Description:
//      This test case checks the successful submission of a review with valid input values, such as author name, a sufficiently long review, and a selected rating.

//  Test Steps:
// 1. Preconditions:
//     - Navigate to the homepage.
//     - Click the 'add to favorites' button for a movie.
//     - Click the 'Favorites' button.
//     - Click on the 'Write Review' button to access the review form.

// 2. Actions:
//     - Enter an author name (e.g., 'John Doe').
//     - Enter a descriptive, engaging review for the movie.
//     - Select a 'Good' rating.
//     - Click the 'Submit' button.

// 3. Expected Results:
//     - A success message ('Thank you for submitting a review') should be displayed in a Snackbar.
//     - The Snackbar can be closed by clicking the 'Close' button.
//     - The Snackbar should disappear after closing.

// Scenario 2: Displays an Error Message for Too Short Review
//  Description:
//      This test case verifies that an error message appears when a review of insufficient length is submitted.

//  Test Steps:
// 1. Preconditions:
//     - Ensure the starting conditions are set (same as in the previous test).
//     - Navigate to the review form page.

// 2. Actions:
//     - Enter an author name (e.g., 'John Doe').
//     - Enter a short, inadequate review for the movie.
//     - Select a 'Good' rating.
//     - Click the 'Submit' button.

// 3. Expected Results:
//     - An error message ('Review is too short') should be displayed below the review input field.
//     - The error message should be visible on the page.
describe('Review Form Interaction', () => {
    it('Successfully submits a review with valid inputs', () => {

        cy.visit("/");
        cy.get("button[aria-label='add to favorites']").eq(0).click();
       
        cy.get("button").contains("Favorites").click();
        cy.get(".MuiCardActions-root").eq(0).find("a[href='/reviews/form']").click();
    

      const authorName = 'Evan';
      const validReview =
        'This movie was amazing! It kept me engaged throughout the entire story.';
  
      
  
      cy.get('input[name="author"]').type(authorName);
      cy.get('textarea[name="review"]').type(validReview);
  
      // Select 'Excellent' rating
      cy.get("#select-rating").click();
      cy.get("li").contains("Good").click();
  
      cy.get('button[type="submit"]').click();
  
     
    cy.get('.MuiSnackbar-root').should('be.visible');


    cy.get('.MuiSnackbar-root')
    .should('include.text', 'Thank you for submitting a review')
  

    cy.get('[data-testid="CloseIcon"]').click();


    cy.get('.MuiSnackbar-root').should('not.exist');
    });
  
    it('Displays an error message for too short review', () => {
        cy.visit("/");
        cy.get("button[aria-label='add to favorites']").eq(0).click();
       
        cy.get("button").contains("Favorites").click();
        cy.get(".MuiCardActions-root").eq(0).find("a[href='/reviews/form']").click();
    

      const authorName = 'Evan';
      const validReview =
        'short';
  
      
  
      cy.get('input[name="author"]').type(authorName);
      cy.get('textarea[name="review"]').type(validReview);
  
      // Select 'Excellent' rating
      cy.get("#select-rating").click();
      cy.get("li").contains("Good").click();
  
      cy.get('button[type="submit"]').click();
  
      cy.get('p')
        .should('be.visible')
        .and('contain', 'Review is too short');
    });

    it('Displays an error message for missing/invalid author name', () => {
      cy.visit("/");
      cy.get("button[aria-label='add to favorites']").eq(0).click();
      cy.get("button").contains("Favorites").click();
      cy.get(".MuiCardActions-root").eq(0).find("a[href='/reviews/form']").click();
    
      const invalidAuthorName = "john marsten"; // Empty string or an invalid author name
    
      // Use the custom command to check the error message
      cy.get('input[name="author"]').type(invalidAuthorName).clear();
      const validReview = 'This movie was amazing! It kept me engaged throughout the entire story.';
      cy.get('textarea[name="review"]').type(validReview);
      cy.get("#select-rating").click();
      cy.get("li").contains("Good").click();
    
      // Use the custom command to check for the error message
      cy.checkErrorMessageForInvalidAuthor();
    });
  
  });