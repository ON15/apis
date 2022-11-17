import defaultMovies from '../defaultMovies';
import MovieTeasers from './MovieTeasers';
import FilterForm from './FilterForm';
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
export default function MoviesFinder() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState(defaultMovies);
    useMovieSearch(searchTerm, setMovies);
    return (
        <div className="movies-finder">
            <FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <MovieTeasers movies={movies} />
        </div>
    );
}

function useMovieSearch(searchTerm, setMovies) {
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

    useEffect(() => {
        if (debouncedSearchTerm.length < 2) {
            setMovies(defaultMovies);
            return;
        }

        async function fetchMovies() {
            try {
                const response = await fetch(
                    `https://omdbapi.com/?apikey=3df3b4a8&s=${debouncedSearchTerm}`
                );

                if (!response.ok) {
                    throw new Error('Fehler beim Laden der Daten!');
                }

                const jsonData = await response.json();
                if (jsonData.Response === 'True') {
                    setMovies(jsonData.Search);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.log(error);
                setMovies([]);
            }
        }
        fetchMovies();
    }, [debouncedSearchTerm, setMovies]);
}

/*
1. Erschafft einen neuen state searchTerm und verknüpft ihn mit dem Eingabefeld
als kontrollierten Input.
2. Nutzt useDebouncedValue um den Wert debouncedSearchTerm zu erhalten.
3. Nutzt useEffect, um aus der Datenbank die zum Suchbegriff passenden Ergebnisse
zu laden. Achtet dabei darauf, dass mindestens 2 Buchstaben eingegeben wurden, bevor
die Anfrage gemacht wird. Wenn weniger Buchstaben eingegeben sind, sollen wieder
die defaultMovies angezeigt werden.
Basis-URL:
https://omdbapi.com/?apikey=3df3b4a8&s=Suchbegriff
*/


