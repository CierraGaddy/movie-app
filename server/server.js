const path = require("path");
const express = require("express");
const fetchMoviesByName = require("./utils/fetchMoviesByName"); // Function to fetch movies
const port = process.env.PORT || 3000;

const app = express();

// Serve static files from the "public" directory
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

// Root route to serve the HTML page
app.get("", (req, res) => {
  res.sendFile(path.join(publicDirectory, "index.html")); // Serve index.html
});

// Route to search for movies
app.get("/find-movies", async (req, res) => {
  const searchTerm = req.query.search?.trim(); // Get the search term from query
  if (!searchTerm) {
    return res.status(400).send({
      error: "Please provide a valid movie name",
    });
  }

  try {
    // Fetch movie details using the function
    const movieDetails = await fetchMoviesByName(searchTerm); // Pass the search term
    res.send({ results: movieDetails });
  } catch (err) {
    console.error("Error fetching movie data:", err);
    res.status(500).send({ error: "Failed to fetch movie data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
