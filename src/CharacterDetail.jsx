import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [movies, setMovies] = useState([]);
  const [species, setSpecies] = useState([]);
  const [spaceships, setSpaceships] = useState([]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/${id}`)
      .then((response) => {
        setCharacter(response.data);
        fetchMovies(response.data.films);
        fetchSpecies(response.data.species);
        fetchSpaceships(response.data.starships);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const fetchMovies = async (films) => {
    const moviePromises = films.map((url) => axios.get(url));
    const movieResponses = await Promise.all(moviePromises);
    const movieNames = movieResponses.map((response) => response.data.title);
    setMovies(movieNames);
  };

  const fetchSpecies = async (species) => {
    const speciesPromises = species.map((url) => axios.get(url));
    const speciesResponses = await Promise.all(speciesPromises);
    const speciesNames = speciesResponses.map((response) => response.data.name);
    setSpecies(speciesNames);
  };

  const fetchSpaceships = async (starships) => {
    const spaceshipPromises = starships.map((url) => axios.get(url));
    const spaceshipResponses = await Promise.all(spaceshipPromises);
    const spaceshipNames = spaceshipResponses.map((response) => response.data.name);
    setSpaceships(spaceshipNames);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Character Details</h2>
      <div>
        <strong>Name:</strong> {character.name}
      </div>
      <div>
        <strong>Birth Year:</strong> {character.birth_year}
      </div>
      <div>
        <strong>Movies:</strong> {movies.join(", ")}
      </div>
      <div>
        <strong>Species:</strong> {species.join(", ")}
      </div>
      <div>
        <strong>Spaceships:</strong> {spaceships.join(", ")}
      </div>
    </div>
  );
}

export default CharacterDetails;
