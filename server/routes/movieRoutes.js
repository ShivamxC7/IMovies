const express = require("express");
const router = express.Router();
const movies = require("../data/movies");

router.get("/", (req, res) => {
  const { search, genre } = req.query;
  let result = movies;

  if (search) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (genre && genre !== "All") {
    result = result.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  res.json(result);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((item) => item.id === req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
});

module.exports = router;