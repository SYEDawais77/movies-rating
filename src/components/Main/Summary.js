import { average } from "../../App";

export function Summary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => (isNaN(movie.imdbRating) ? 0 : movie.imdbRating))
  );

  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => (isNaN(movie.runtime) ? 0 : movie.runtime))
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Number(avgImdbRating).toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Number(avgUserRating).toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Number(avgRuntime).toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
