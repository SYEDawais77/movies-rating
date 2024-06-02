import React, { useEffect } from "react";
import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader";
import { useKey } from "../useKey";

export default function SelectedMovieDetails({
  selectedID,
  onClose,
  onAddMovie,
  onUserRating,
  userRating,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useKey("Escape", onClose);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddMovie(movie) {
    const newMovie = {
      Title: movie.Title,
      imdbID: movie.imdbID,
      imdbRating: movie.imdbRating,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      poster: movie.Poster,
      userRating: userRating,
    };
    onAddMovie(newMovie);
    onClose();
  }

  useEffect(
    function () {
      async function DetailMovies() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=89fe8deb&i=${selectedID}`
          );
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          const data = await response.json();
          setMovie(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        } finally {
        }
      }
      DetailMovies();
    },
    [selectedID]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;
    return function () {
      document.title = "Movies Rating";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onClose()}>
              &larr;
            </button>
            <img src={poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                <span>{imdbRating}</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onSetRating={onUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleAddMovie(movie)}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have Rated this movie {watchedUserRating}⭐</p>
              )}
            </div>
            <h3>Plot</h3>
            <p>{plot}</p>
            <h3>Actors</h3>
            <p>{actors}</p>
            <h3>Director</h3>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}
