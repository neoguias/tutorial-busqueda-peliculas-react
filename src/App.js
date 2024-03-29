import {React, useState, useEffect} from  'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'
import './App.css';

const API_URL = 'https://www.omdbapi.com?apikey=' + process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const  [movies = [], setMovies] = useState([]);
  const  [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search)
  }
    
    useEffect (() => {
      searchMovies('Spiderman');
    }, [])

    return (
      <div className="app">
        <h1>IMDB Search</h1>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => searchMovies(searchTerm)}
            />
        </div>

        { 
          movies.length > 0 ? (
            <div className="container">
                { 
                  movies.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                  ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }

        <div className="container">

        </div>
      </div>
    )
}

export default App;
