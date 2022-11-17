import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function LocationFinder() {
    const [search, setSearch] = useState('');
    const [locations, setLocations] = useState([]);
    useLocationSearch(search, setLocations);

    return (
        <div>
            <label htmlFor="search">PLZ oder Ortsname</label>
            <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {/* Stellt innerhalb von ul den Inhalt von locations dar, für jeden Eintrag
ein li-Element, das einen Link enthält. Link-Text ist Name und Postleitzahl,
Linkziel ist https://www.openstreetmap.org/#map=14/latitude/longitude,
latitude und longitude dabei mit den Werten aus der Datenbank ersetzen.
Beispiel: <li><a href="https://www.openstreetmap.org/#map=14/123/456">Ortsname</a></li>
*/}
                {locations.map(({ zipcode, place, latitude, longitude }) => (
                    /* Langer zusammengesetzter key, da Ort und PLZ nicht einmalig im Datensatz sind. */
                    <li key={`${zipcode}${latitude}${place}`}>
                        <a
                            href={`https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`}
                        >
                            {zipcode} {place}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function useLocationSearch(search, setLocations) {
    const debouncedSearch = useDebouncedValue(search, 600);
    useEffect(() => {
        if (debouncedSearch.length < 2) {
            setLocations([]);
            return;
        }
        async function fetchLocations() {
            try {
                const response = await fetch(
                    `http://localhost:8000/?search=${debouncedSearch}`
                );
                if (!response.ok) {
                    throw new Error('Fehler beim laden der Daten!');
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setLocations(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLocations();
    }, [debouncedSearch, setLocations]);
}


