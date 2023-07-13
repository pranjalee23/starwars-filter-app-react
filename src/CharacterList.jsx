import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [movieFilter, setMovieFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [birthYearFromFilter, setBirthYearFromFilter] = useState("");
  const [birthYearToFilter, setBirthYearToFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people")
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [characters, movieFilter, speciesFilter, birthYearFromFilter, birthYearToFilter]);

  const filterCharacters = () => {
    const filtered = characters.filter((character) => {
      // Filter by movie
      if (movieFilter && character.films.indexOf(movieFilter) === -1) {
        return false;
      }

      // Filter by species
      if (speciesFilter && character.species.indexOf(speciesFilter) === -1) {
        return false;
      }

      // Filter by birth year range
      if (birthYearFromFilter && birthYearToFilter) {
        const birthYear = parseInt(character.birth_year, 10);
        const fromYear = parseInt(birthYearFromFilter, 10);
        const toYear = parseInt(birthYearToFilter, 10);

        if (birthYear < fromYear || birthYear > toYear) {
          return false;
        }
      }

      return true;
    });

    setFilteredCharacters(filtered);
  };

  const clearFilters = () => {
    setMovieFilter("");
    setSpeciesFilter("");
    setBirthYearFromFilter("");
    setBirthYearToFilter("");
  };

  return (
    <div className="character-main">
      <div className="character-filter-main-wrapper">
        <h2>Character Filter</h2>
        <div className="character-filter-wrapper">
          <div className="character-filter">
            <label>Movie:</label>
            <select value={movieFilter} onChange={(e) => setMovieFilter(e.target.value)}>
              <option value="">All</option>
              <option value="https://swapi.dev/api/films/1/">Episode IV: A New Hope</option>
              <option value="https://swapi.dev/api/films/2/">Episode V: The Empire Strikes Back</option>
              <option value="https://swapi.dev/api/films/3/">Episode VI: Return of the Jedi</option>
              <option value="https://swapi.dev/api/films/4/">Episode I: The Phantom Menace</option>
              <option value="https://swapi.dev/api/films/5/">Episode II: Attack of the Clones</option>
              <option value="https://swapi.dev/api/films/6/">Episode III: Revenge of the Sith</option>
            </select>
          </div>
          <div className="character-filter">
            <label>Species:</label>
            <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
              <option value="">All</option>
              <option value="https://swapi.dev/api/species/1/">Human</option>
              <option value="https://swapi.dev/api/species/2/">Droid</option>
              {/* Add more species options if needed */}
            </select>
          </div>
          <div className="character-filter">
            <label>Birth Year Range:</label>
            <input type="number" placeholder="From" value={birthYearFromFilter} onChange={(e) => setBirthYearFromFilter(e.target.value)} />
            <input type="number" placeholder="To" value={birthYearToFilter} onChange={(e) => setBirthYearToFilter(e.target.value)} />
          </div>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
      <hr />
      <div className="character-list-main-wrapper">
        <h2>Character List</h2>
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.name}>
              <Link to={`/characters/${character.url.split("/").reverse()[1]}`}>{character.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterList;
