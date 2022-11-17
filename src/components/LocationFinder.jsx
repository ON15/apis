import { useState, useEffect } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function LocationFinder() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 600);
  const [locations, setlocations] = useState([]);

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      setlocations([]);
      return;
    }
    async function fetchLocations() {
      try {
        const response = await fetch(`http://localhost:8000/?search=${debouncedSearch}`);
        if (!response.ok) {
          throw new Error('Fehler beim laden der Daten.')
        }
        const jsonData = await response.json();
        // console.log(jsonData);
        setlocations(jsonData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchLocations();
  }, [debouncedSearch]);

  return (
    <div>
      <label htmlFor="search">PLZ oder Ortsname</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Stellt den Inhalt von locations dar, für jeden Eintrag
      ein li-Element, das einen Link enthält. 
      Link-Text ist Name und Postleitzahl,
      Linkziel ist https://www.openstreetmap.org/#map=14/latitude/longitude,
      latitude und longitude dabei mit den Werten aus der Datenbank ersetzen.*/}
      <ul>
        {locations.map(({ latitude, longitude, zipcode, community, place }) => {
          return <li key={`${latitude}${longitude}${zipcode}${place}`}>
            <a
              href={`https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`}
              target="blank"
            >
              {(community, place, zipcode)}
            </a>
          </li>;
        })}
      </ul>
    </div>
  );
}
