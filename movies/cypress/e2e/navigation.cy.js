let movies;
let movieId; // Enola Holmes movie id

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });








  //clicking movie details from upcoming page
//   From the Upcoming Page to a Movie's Details

//    Objective: Confirm navigation to the movie details page from the Upcoming Movies section.
//        Test Steps:
//            Visit the Upcoming Movies page.
//            Click on the "More Info" button for the first movie card.
//            Check if the URL includes the movie ID.
  describe("From the upcoming page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
        cy.visit("/movies/upcoming");
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      if (!Cypress.config("showPassed")) {
        cy.log("Successfully navigated to the movie home silently.");
      }
    });
  });


//   From Home Page, Open First Full Review
//      Objective: Open the first review from the movie details page.
//          Test Steps:
//              Click "More Info" to open the movie details.
//              Click on the "Reviews" button and navigate to the full review.
//              Check if the URL includes the review ID.
  describe("From home page open first full review", () => {
    it("open movie details and click reviews button and navigate to first review in full page", () => {
     
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get(".MuiButtonBase-root").contains("Reviews").click();
        cy.get(".MuiTableBody-root").contains("Full Review").click();
        cy.url().should("include", `/reviews/653d0e9abc2cb300aca35d5b`);
        if (!Cypress.config("showPassed")) {
            cy.log("Successfully navigated to the movie home silently.");
          }
    });
  });






  //clicking movie home icon from movie details page and full review page
//   From Movie Details, Go to Movie Home Website
//      Objective: Navigate to the movie home website from the movie details page.
//          Test Steps:
//              Click "More Info" to open the movie details.
//              Click on the house icon or link to go to the movie home website.
  describe("Go to movie home website from movie details ", () => {
    it("open movie details and click the house icon", () => {
     
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get("a").click();
        if (!Cypress.config("showPassed")) {
            cy.log("Successfully navigated to the movie home silently.");
          }
  
    });
});





// From Movie Reviews, Go to Movie Home Website
//  Objective: Visit the movie home website from the movie reviews page.
//      Test Steps:
//          Click "More Info" to open the movie details.
//          Click on "Reviews" to access the review.
//          Click on the house icon or link to navigate to the movie home website.
    describe("Go to movie home website from movie reviews", () => {
    it("open movie reviews page and click the house icon", () => {
     
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get(".MuiButtonBase-root").contains("Reviews").click();
        cy.get(".MuiTableBody-root").contains("Full Review").click();
        cy.url().should("include", `/reviews/653d0e9abc2cb300aca35d5b`);
        cy.get("a").click();
        if (!Cypress.config("showPassed")) {
            cy.log("Successfully navigated to the movie home silently.");
          }
       
    });
})
 
});

// <----------End of Test=------------>