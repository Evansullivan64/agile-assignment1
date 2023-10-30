import { filterByGenre, filterByTitle } from "../support/e2e";

let movies; // List of Discover movies from TMDB

describe("Filtering", () => {
  before(() => {
    // Get movies from TMDB and store them locally.
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



//   Objective: Display movies with a specific term in the title and handle no matches.
//      Test Steps:
//          Search movies using the term 'm' in the title.
//          Verify that movies displayed match the search term.
//          Handle the scenario when there are no matches for a given term, such as 'xyxxzyyzz'.
  describe("By movie title", () => {
    it("only display movies with 'm' in the title", () => {
      const searchString = "m";
      const matchingMovies = filterByTitle(movies, searchString);
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
      if (!Cypress.config("showPassed")) {
        cy.log("Successfully navigated to the movie home silently.");
      }
    });
    it("handles case when there are no matches", () => {
      const searchString = "xyxxzyyzz";
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should("have.length", 0);
      if (!Cypress.config("showPassed")) {
        cy.log("Successfully navigated to the movie home silently.");
      }
    });
  });





//   Objective: Show movies based on the selected genre.
//      Test Steps:
//          Select a particular genre (e.g. Comedy) from the genre dropdown.
//          Validate that displayed movies correspond to the selected genre.
  describe("By movie genre", () => {
    it("show movies with the selected genre", () => {
      const selectedGenreId = 35;
      const selectedGenreText = "Comedy";
      const matchingMovies = filterByGenre(movies, selectedGenreId);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
      if (!Cypress.config("showPassed")) {
        cy.log("Successfully navigated to the movie home silently.");
      }
    });
  });







//   Objective: Display movies that satisfy both genre and title filters.
//       Test Steps:
//          Set the genre filter to 'Horror' and the title filter to 'five'.
//          Validate the displayed movies that meet both filters.
//          Note: Ensure understanding the logic for expected length 0 if encountered.
  describe("Combined genre and title", () => {
    let movies; 
  
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
  
    it("displays movies that match both genre and title filters", () => {
      const selectedGenreId = 35; 
      const genreMatchingMovies = filterByGenre(movies, selectedGenreId);
  
      const searchString = "five"; 
      const titleMatchingMovies = filterByTitle(movies, searchString);
  
      const combinedMatchingMovies = movies.filter(movie =>
        genreMatchingMovies.includes(movie) && titleMatchingMovies.includes(movie)
      );
  
      cy.get("#genre-select").click();
      cy.get("li").contains("Horror").click();
  
     
      cy.get("#filled-search").clear().type(searchString);
  
      
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        combinedMatchingMovies.length
        //why is expected length 0, ask teacher
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(combinedMatchingMovies[index].title);
      });
      if (!Cypress.config("showPassed")) {
        cy.log("Successfully navigated to the movie home silently.");
      }
    });
  });
});