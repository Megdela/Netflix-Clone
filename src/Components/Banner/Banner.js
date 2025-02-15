import React, { useEffect, useState } from "react";
import requests from "../../utils/requests";
import instance from "../../utils/axios";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const request = await instance.get(requests.fetchNetflixOriginals);
        console.log(request);

        const results = request.data.results;
        console.log(results);
        if (Array.isArray(results) && results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        } else {
          console.log("No results found or results is not an array");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchMovies();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};


export default Banner;
