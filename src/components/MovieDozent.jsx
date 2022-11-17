import { Helmet } from 'react-helmet';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function Movie() {
    const { id } = useParams();

    const [movieData, setMovieData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(
                    `https://omdbapi.com/?apikey=3df3b4a8&i=${id}`
                );

                if (!response.ok) {
                    throw new Error('Fehler beim Laden der Daten!');
                }

                const jsonData = await response.json();

                if (jsonData.Response === 'True') {
                    setMovieData(jsonData);
                } else {
                    throw new Error(jsonData.Error);
                }
            } catch (error) {
                setErrorMessage(error.message);
                console.log(error);
            }
        }
        fetchMovie();
    }, [id]);

    if (errorMessage) {
        return <strong>{errorMessage}</strong>;
    }

    if (!movieData) {
        return <LoadingSpinner message="Laden…" />;
    }

    const { Title, Poster, Year, Plot, Runtime, Ratings } = movieData;

    return (
        <article className="movie">
            <Helmet>
                <title>{Title}</title>
            </Helmet>
            <h2 className="movie__title">{Title}</h2>

            {Poster !== 'N/A' && (
                <img
                    src={Poster}
                    alt={`Filmplakat ${Title}`}
                    className="movie__poster"
                />
            )}

            {Plot !== 'N/A' && <p className="movie__plot">{Plot}</p>}
            <h3>Details</h3>
            <dl className="movie__details">
                {Year && (
                    <>
                        <dt>Jahr</dt>
                        <dd>{Year}</dd>
                    </>
                )}
                {Runtime && (
                    <>
                        <dt>Dauer</dt>
                        <dd>{Runtime}</dd>
                    </>
                )}
            </dl>
            {Ratings.length > 0 && (
                <dl>
                    {Ratings.map(({ Source, Value }) => (
                        <Fragment key={Source}>
                            <dt>{Source}</dt>
                            <dd>{Value}</dd>
                        </Fragment>
                    ))}
                </dl>
            )}
        </article>
    );
}

/*

<article class="movie">
  <h2 class="movie__title">Titel</h2>
  <!-- Bild nur anzeigen, wenn vorhanden, d.h. Poster ungleich 'N/A' -->
  <img src="" alt="" class="movie__poster" />
  <!-- Plot anzeigen, wenn vorhanden -->
  <p class="movie__plot">Plot</p>
  <h3>Details</h3>
  <dl class="movie__details">
    <!-- Auch Jahr und Dauer prüfen, ob sie vorhanden sind -->
    <dt>Jahr</dt>
    <dd>2000</dd>
    <dt>Dauer</dt>
    <dd>200 Minuten</dd>
  </dl>

  <!-- Bonus: Die Ratings ausgeben. Ihr könnt wieder eine dl-Liste verwenden. -->
  <dl class="movie__ratings">

      <dt>Rotten Tomatoes</dt>
      <dd>90%</dd>

  </dl>
</article>

// Bonus: Nutzt Helmet, um den Filmtitel als Seitentitel darzustellen
*/

// https://www.mediaevent.de/xhtml/dl.html
// http://html5doctor.com/the-dl-element/

