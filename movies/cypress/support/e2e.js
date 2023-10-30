

// Function: filterByTitle
//   Description:
//    This function filters a movie list based on a provided string in the movie titles.

//  Inputs:
//    movieList (Array): A list of movies to be filtered.
//    string (String): The string to be searched within the movie titles.
//  Outputs:
//    Returns a filtered array containing movies whose titles include the provided string.
export const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);



// Function: filterByGenre
//  Description:
//    This function filters a movie list based on a provided genre ID.

//  Inputs:
//    movieList (Array): A list of movies to be filtered.
//    genreId (Number): The ID of the genre for filtering the movies.
//  Outputs:
//    Returns a filtered array containing movies belonging to the specified genre ID.
export const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));