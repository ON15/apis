import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import defaultMovies from '../defaultMovies';
import MovieTeasers from './MovieTeasers';
import FilterForm from './FilterForm';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import Movie from './Movie';

export default function MoviesFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState(defaultMovies);
  // const [totalMovies, setTotalMovies] = useState(0);
  useMovieSearch(searchTerm, setMovies)

  return (
    <BrowserRouter>
      <div className="movies-finder">
        {/* NAVIGATION */}
        <nav className="main-navigation">
          <Link to="/">Start</Link>
          <Link to="/contact">Kontact</Link>
        </nav>

        <Routes>
          <Route
            path='/' npm in react-helmet
            element={
              <>
                <Helmet>
                  <title>Filmdatenbank</title>
                </Helmet>
                <FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <MovieTeasers movies={movies} />
                {/* <MovieTeasers movies={movies} totalMovies={totalMovies} /> */}
              </>}
          />
          <Route
            path='/contact'
            element={
              <>
                <Helmet>
                  <title>Filmdatenbank</title>
                  <h2>Kontact</h2>
                </Helmet>
              </>
            }
          />
          <Route
            path='/movie/:id'
            element={
              <Movie />
            }
          />
        </Routes>

        {/* <FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        {/* <MovieTeasers movies={movies} /> */}
      </div>
    </BrowserRouter>
  );
}

/* 
1. Erschafft einen neuen state searchTerm und verknüpft ihn 
mit dem Eingabefeld als kontrollierten Input.
2. Nutzt useDebouncedValue um den Wert debouncedSearchTerm zu erhalten.
3. Nutzt useEffect, um aus der Datenbank die zum Suchbegriff passenden Ergebnisse zu laden. 
Achtet dabei darauf, dass mindestens 2 Buchstaben eingegeben wurden, 
bevor die Anfrage gemacht wird. 
Wenn weniger Buchstaben eingegeben sind, sollen wieder die defaultMovies angezeigt werden.
Basis-URL: https://omdbapi.com/?apikey=3df3b4a8&s=Suchbegriff

Ergänzen:
user feedback: wie viele Filme wurden gefunden und so weiter (totalResults)
*/

function useMovieSearch(searchTerm, setMovies) {
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

  useEffect(() => {
    // fange Suche erst ab 2 Buchstaben
    if (debouncedSearchTerm.length < 2) {
      setMovies(defaultMovies)
      return;
    }

    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://omdbapi.com/?apikey=3df3b4a8&s=${debouncedSearchTerm}`
        );

        if (!response.ok) {
          throw new Error('Fehler beim laden der Daten!');
        }

        const jsonData = await response.json();
        if (jsonData.Response === "True") {
          setMovies(jsonData.Search);

        } else {
          setMovies([])
        }

        // setTotalMovies(parseInt(jsonData.totalResults));


      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, [debouncedSearchTerm, setMovies]);
}
