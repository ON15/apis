import { Link } from "react-router-dom";

export default function MovieTeasers({ movies, totalMovies }) {
  return (
    <div>
      {totalMovies && <p>Insgesamt {totalMovies} Filme gefunden</p>}
      <div className="movie-teasers">
        {movies.map(({ Title, Year, Poster, imdbID }) => (
          <article className="teaser" key={imdbID}>
            {Poster !== 'N/A' && (
              <img
                src={Poster}
                alt={`Filmplakat ${Title}`}
                className="teaser__image"
              />
            )}
            <h3 className="teaser__heading">
              <Link to={`/movie/${imdbID}`}>{Title}</Link>
            </h3>
            {Year && (
              <time className="teaser__date" dateTime={Year}>
                {Year}
              </time>
            )}
          </article>
        ))}
      </div>
    </div>);
}

/* 
Die Komponente MovieTeasers soll über den prop "movies" einen Array mit Filmen erhalten.
Für jeden Film ein article-Element innerhalb von movie-teasers erzeugen. 
Das time-Element nur anzeigen, wenn das Jahr im Datensatz ist.
Achtet bei den Daten auf die eigenwillige Großschreibung der Objektschlüssel, etwa "Poster".
  <article className="teaser">
    <img src="" alt="Filmplakat Eiskönigin" className="teaser__image" />
    <h3 className="teaser__heading">Eiskönigin</h3>

    <time className="teaser__date" datetime="2019">2019</time>
  </article>
*/