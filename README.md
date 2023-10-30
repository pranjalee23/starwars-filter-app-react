# Star Wars Character Filter App

Welcome to the Star Wars Character Filter App project! This is a front-end application built using React as part of the MERN stack. It enables users to discover characters from the Star Wars franchise while providing various filtering options. The app leverages the Star Wars API (SWAPI) (https://swapi.dev/api/people/) to present a filterable list of characters. Users can delve into character details, such as movies, species, and associated spaceships.

## App Overview

This application provides a user-friendly interface to explore Star Wars characters. Here's what it does:

- Display a list of Star Wars characters.
- Allow users to filter characters based on specific criteria.
- Provide detailed information about each character.
- Implement a URL-based router for direct access to character details.

## Features

### Character List

The app displays a list of Star Wars characters. Click on a character to view more details.

### Filter

Users can filter characters based on:

1. **Movie:** Filter by the movie in which characters appeared.
2. **Species:** Filter by the character's species.
3. **Birth Year:** Specify a birth year range for filtering.

All filters are applied using an AND relationship.

### Character Details

Character details display:

1. Character Name
2. Species
3. Movies in which the character appeared
4. Spaceships associated with the character

## Project Setup

To get started:

1. Use `npm start` to run the application.
2. Use React for the front-end.

## SWAPI

Retrieve character data from the Star Wars API (SWAPI). Client-side filtering is necessary since SWAPI does not support filtering.

API Documentation: [SWAPI - People Endpoint](https://swapi.dev/documentation#people)

## Character Details

Each character is directly accessible through a unique URL (e.g., `/characters/5`).
