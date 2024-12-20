const axios = require("axios");

// This function gets movie data from the TMDB API based on a movie title
const fetchMoviesByName = async (movieTitle) => {
  const requestConfig = {
    method: "GET", // We are using a GET request to fetch data
    url: "https://api.themoviedb.org/3/search/movie", // The endpoint to get movie information
    params: {
      query: movieTitle, // The movie title the user wants to search for
      include_adult: "false", // Exclude adult movies from the results
      language: "en-US", // Set the language for the results to English
      page: "1", // Get the first page of results
    },
    headers: {
      accept: "application/json", // We want the response in JSON format
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2UyZjM2MTllMWNiZDM0OWNiNTdjMDJhMTdhNzEwMCIsIm5iZiI6MTczNDU0NjU3Ny43NjQsInN1YiI6IjY3NjMxNDkxYTBjYzNkZTY0N2ZmZjk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_srNRUjHDtkuM55JdEdi_m29IlnZ4ufSiPpOndXGcY", // API key for authentication (replace with your own API key)
    },
  };

  try {
    const apiResponse = await axios.request(requestConfig);
    if (apiResponse.data.results && apiResponse.data.results.length > 0) {
      return apiResponse.data.results; // Return the list of movies
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error during TMDB API call:", error);
    return []; // Return an empty list if an error occurs
  }
};

// Export the function for use in other files
module.exports = fetchMoviesByName;
