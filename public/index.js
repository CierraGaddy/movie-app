const searchInput = document.querySelector("input");
const searchForm = document.querySelector("form");
const resultContainer = document.querySelector(".output");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the page from refreshing when form is submitted
  const movieQuery = searchInput.value; // Gets the text entered in the input box

  // Makes a request to the server to get movie data
  fetch(
    `/find-movies?api_key=13e2f3619e1cbd349cb57c02a17a7100&search=${encodeURIComponent(
      movieQuery
    )}`
  )
    .then((response) => response.json()) // Converts the response into JSON
    .then((data) => {
      console.log("Movies we got: ", data);

      resultContainer.innerHTML = ""; // Clears the previous results

      // Check if the data has results
      if (data.results && data.results.length > 0) {
        // For each movie, create a new block to display it
        data.results.forEach((movieItem) => {
          const movieBlock = document.createElement("div");
          movieBlock.classList.add("movie-item");

          const movieTitle = document.createElement("h3");
          movieTitle.classList.add("movie-name");
          movieTitle.textContent = movieItem.title; // Movie title

          const releaseDate = document.createElement("p");
          releaseDate.classList.add("movie-release-date");
          releaseDate.textContent = `Release Date: ${movieItem.release_date}`; // Movie release date

          const movieDescription = document.createElement("p");
          movieDescription.classList.add("movie-overview");
          movieDescription.textContent = movieItem.overview; // Movie overview/summary

          // Adding these details to the movie block
          movieBlock.appendChild(movieTitle);
          movieBlock.appendChild(releaseDate);
          movieBlock.appendChild(movieDescription);

          // Finally, add this block to the result container
          resultContainer.appendChild(movieBlock);
        });
      } else {
        // If no movies found, display this message
        resultContainer.innerHTML =
          "<p>No movies found matching your search.</p>";
      }
    })
    .catch((error) => {
      resultContainer.textContent = "Oops! Something went wrong."; // Error message
      console.error(error); // Log the error in the console
    });
});
