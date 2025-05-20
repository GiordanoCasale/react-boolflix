import axios from "axios"
import { useState } from "react"
import ReactCountryFlag from "react-country-flag";

function App() {
  const [input, SetInput] = useState("");
  const [movies, setMovies] = useState([]);

  const getFlag = (languageCode) => {
    const flags = {
      'en': '🇬🇧',
      'it': '🇮🇹',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'zh': '🇨🇳',
      'ru': '🇷🇺',
      'hi': '🇮🇳',
    };
    return flags[languageCode] || languageCode;
  }

  const handleclick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3fa3a72f0073cd9418d6d2a8e957a89f&query=${input}`)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => SetInput(e.target.value)}
              placeholder="Cerca un film..."
            />
            <button className="btn btn-primary" onClick={handleclick}>
              Cerca
            </button>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Titolo: {movie.title}</h5>
                <p className="card-text">Titolo Originale: {movie.original_title}</p>
                <p className="card-text">Lingua: {getFlag(movie.original_language)}</p>
                <p className="card-text">
                  <small className="text-muted">Voto: {movie.vote_average}/10</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
