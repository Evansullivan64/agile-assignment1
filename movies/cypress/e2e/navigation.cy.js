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
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  //clicking movie details from favourites page
  describe("From the favourite page to a movie's details", () => {
    it("clicks heart, then clicks then navigates to favrites page and clicks more info to go to movie details page", () => {
        cy.get("button[aria-label='add to favorites']").eq(0).click();
       
        cy.get("button").contains("Favorites").click();
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  //clicking movie details from upcoming page
  describe("From the upcoming page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
        cy.visit("/movies/upcoming");
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });

  describe("Using the site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigate via the button links", () => {
        cy.get("button").contains("Favorites").click();
        cy.url().should("include", `/favorites`);
        cy.get("button").contains("Home").click();
        cy.url().should("include", `/`);
      });
    });
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

  //in movie details click reviews button bottom right corner
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
  describe("Go to movie home website from movie details ", () => {
    it("open movie details and click the house icon", () => {
     
        cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
        cy.get("a").click();
      
  
    });
});
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