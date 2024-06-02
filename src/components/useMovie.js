import { useEffect, useState } from "react";
const KEY = "89fe8deb";
export function useMovie(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovies() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok) {
            throw new Error("There is an Error Fetching Movie");
          }
          const data = await response.json();
          if (data.Response === "False") {
            throw new Error("Movie not Found");
          }
          setMovies(data.Search);
          setErrorMessage("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.length) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      callBack?.();
      FetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, callBack]
  );
  return { movies, isLoading, errorMessage };
}
