let movies;
const movieId = 497582; // Enola Holmes movie id

describe("The favourites feature", () => {
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





  // Objective: Verify that selecting a movie as a favorite correctly shows the red heart icon.
//      Test Steps:
//          Verify the absence of the heart icon for a non-favorite movie card.
//          Select a movie as a favorite by clicking the corresponding heart icon.
//          Validate the appearance of the red heart icon on the selected movie card.
  describe("Selecting favourites", () => {
    it("selected movie card shows the red heart", () => {
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  });




//   Objective: Ensure only favorited movies are listed on the Favorites page.
//      Test Steps:
//          Tag two movies as favorites and navigate to the Favorites page.
//          Confirm that only the favorited movies are listed on the page.
//          Check that the listed movies match the tagged movies by their titles.
  describe("The favourites page", () => {
    beforeEach(() => {
      // Select two favourites and navigate to Favourites page
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("button[aria-label='add to favorites']").eq(3).click();
      cy.get("button").contains("Favorites").click();
    });
    it("only the tagged movies are listed", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 2);
      cy.get(".MuiCardHeader-content")
        .eq(0)
        .find("p")
        .contains(movies[1].title);
      cy.get(".MuiCardHeader-content")
        .eq(1)
        .find("p")
        .contains(movies[3].title);
    });
    it("removes deleted movies", () => {});
  });
});