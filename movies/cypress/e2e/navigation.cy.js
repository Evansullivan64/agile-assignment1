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


  //clicking movie details from home page
//   From the Home Page to a Movie's Details

// Objective: Verify navigation to the movie details page and validate the change in the browser URL.
// Test Steps:
//      Click on the "More Info" button for the first movie card on the Home page.
//      Check if the URL includes the movie ID.
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });




  //clicking movie details from favourites page
//   From the Favorites Page to a Movie's Details

//   Objective: Navigate to the movie details page from the Favorites page.
//      Test Steps:
//          Click the "add to favorites" button for the first movie.
//          Navigate to the Favorites page.
//          Click "More Info" on the first movie card.
//          Verify the URL includes the movie ID.
  describe("From the favourite page to a movie's details", () => {
    it("clicks heart, then clicks then navigates to favrites page and clicks more info to go to movie details page", () => {
        cy.get("button[aria-label='add to favorites']").eq(0).click();
       
        cy.get("button").contains("Favorites").click();
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
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
    });
  });






//   Site Navigation Using Site Header
//      Objective: Test navigation using the site header buttons on different viewport scales.
//      Test Steps:

//         On desktop scale:
//          Click on "Favorites" in the header and verify the URL.
//          Click on "Home" and verify the URL.
  describe("Using the site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigate via the button links", () => {
        cy.get("button").contains("Favorites").click();
        cy.url().should("include", `/favorites`);
        cy.get("button").contains("Home").click();
        cy.url().should("include", `/`);
      });
    });



//         On mobile scale:
//          Open the dropdown menu, select "Favorites," and verify the URL.
//          Choose "Home" and verify the URL.
    describe(
      "when the viewport is mobile scale",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("navigate via the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").contains('Favorites').click();
          cy.url().should("include", `/favorites`);
          cy.get("li").contains('Home').click();
          cy.url().should("include", `/`);
        });
      }
    );
  });
  




//   Navigating Between Movie Detail and Home Pages
//      Objective: Test the backward and forward navigation between the movie detail and home pages.
//      Test Steps:
//          Click on "More Info" for the first movie card to open the detail page.
//          Click on the backward arrow icon and verify the URL.
//          Click on the forward arrow icon and verify the URL.
  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("navigates between the movies detail page and the Home page.", () => {
      cy.get("svg[data-testid='ArrowBackIcon'").click();
      cy.url().should("not.include", `/movies/${movies[0].id}`);
      cy.get("svg[data-testid='ArrowForwardIcon'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
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
       
    });
})
 
});

// <----------End of Test=------------>