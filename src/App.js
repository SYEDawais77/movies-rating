import { useCallback, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Logo } from "./components/Navbar/Logo";
import { SearchBar } from "./components/Navbar/SearchBar";
import { NumResults } from "./components/Navbar/NumResults";
import { MoviesList } from "./components/Main/MoviesList";
import { WatchedList } from "./components/Main/WatchedList";
import { Box } from "./components/Main/Box.js";
import Loader from "./components/Loader.js";
import ErrorMessage from "./components/ErrorMessage.js";
import SelectedMovieDetails from "./components/Main/SelectedMovieDetails.js";
import { useMovie } from "./components/useMovie.js";
import { useLocalStorageState } from "./components/useLocalStorageState.js";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const handleCloseMovie = useCallback(() => {
    setSelectedID(null);
  }, []);
  const [movieRated, setMovieRated] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [userRating, setUserRating] = useState();
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, errorMessage } = useMovie(query, handleCloseMovie);

  function handleSelectedMovie(id) {
    if (selectedID === id) {
      setSelectedID(null);
    } else {
      setSelectedID(id);
      setUserRating(0);
    }
  }

  function handleAddWatched(movie) {
    const watchedIDs = watched.map((m) => {
      return m.imdbID;
    });
    if (watchedIDs.includes(movie.imdbID)) {
      setMovieRated(movie.imdbID);
      return;
    } else {
      const newWatched = [...watched, movie];
      setWatched(newWatched);
    }
  }

  function handleRemoveWatch(movie) {
    const newWatched = watched.filter((m) => m.imdbID !== movie.imdbID);
    setWatched(newWatched);
  }

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} onClose={handleCloseMovie} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading &&
            !errorMessage &&(
              <MoviesList movies={movies} onSelected={handleSelectedMovie} />
            )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedID ? (
            <SelectedMovieDetails
              selectedID={selectedID}
              onClose={handleCloseMovie}
              onAddMovie={handleAddWatched}
              onUserRating={setUserRating}
              userRating={userRating}
              movieRated={movieRated}
              watched={watched}
            />
          ) : (
            <WatchedList watched={watched} onRemove={handleRemoveWatch} />
          )}
        </Box>
      </Main>
    </>
  );
}
