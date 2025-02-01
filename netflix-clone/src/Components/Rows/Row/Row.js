import React, { useEffect, useState } from "react";
import "./row.css";
import instance from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const request = await instance.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setError(null);
    } else {
      const movieTitle = movie?.title || movie?.name || movie?.original_name;
      console.log("Fetching trailer for:", movieTitle);

      movieTrailer(movieTitle)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
          setError("Trailer not found. Please try another movie.");
        });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
   
  };

  return (
    <div className="row">
      <h1
        style={{ marginLeft: "20px", fontSize: "20px" }}
        className="first_title"
      >
        {title}
      </h1>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="row__posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: "10px" }}>
        {trailerUrl && (
          <YouTube videoId={trailerUrl} opts={opts} onReady={onReady} />
        )}
      </div>
    </div>
  );
};

export default Row;
