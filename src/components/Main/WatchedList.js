import { Summary } from "./Summary";

export function WatchedList({ watched, onRemove }) {
  return (
    <div>
      <Summary watched={watched} />
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
            <button className="btn-delete" onClick={()=> onRemove(movie)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
