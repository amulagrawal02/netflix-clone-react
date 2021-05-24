import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
var URLSearchParams = require("url-search-params");
const baseURL = "https://image.tmdb.org/t/p/original";

export default function Row({ title, fetchUrl, isTrue }) {
  const opt = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [movies, setMovies] = useState([]);
  const [movieId, setMovidId] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  const handler = async (movie) => {
    if (movieId) {
      setMovidId("");
    } else {
      let movieurl = "";
      console.log(movie.original_title || movie.name || movie.title || " ");
      await movieTrailer(
        movie.original_title || movie.name || movie.title || " ",
        (err, res) => {
          if (err) {
            console.log("Error from fetch data from movieTralier", err);
          } else {
            movieurl = res;
            console.log(res);
          }
        }
      );

      if (movieurl) {
        const params = new URLSearchParams(new URL(movieurl).search);
        setMovidId(params.get("v"));
      }
    }
  };
  const removehandle = () => {
    setMovidId("");
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handler(movie)}
            key={movie.id}
            className={`row__poster ${isTrue && "row__posterLarge"}`}
            src={`${baseURL}${
              isTrue ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
          ></img>
        ))}
        {/* <div>{movieId && <Youtube videoId={movieId} opts={opt}></Youtube>}</div> */}
      </div>
      {movieId && <Youtube videoId={movieId} opts={opt}></Youtube>}
      {movieId && (
        <button className="remove" onClick={() => removehandle()}>
          Remove
        </button>
      )}
    </div>
  );
}
