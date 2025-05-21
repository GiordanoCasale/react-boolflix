import axios from "axios"
import { useState } from "react"
import ReactCountryFlag from "react-country-flag";

function App() {
  const [input, SetInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  const getCountryCode = (languageCode) => {
    const countryMap = {
      'en': 'GB',
      'it': 'IT',
      'es': 'ES',
      'fr': 'FR',
      'de': 'DE',
      'ja': 'JP',
      'ko': 'KR',
      'zh': 'CN',
      'ru': 'RU',
      'hi': 'IN',
    };
    return countryMap[languageCode] || languageCode.toUpperCase();
  }

  const handleclick = () => {

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3fa3a72f0073cd9418d6d2a8e957a89f&query=${input}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });


    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=3fa3a72f0073cd9418d6d2a8e957a89f&query=${input}`)
      .then((response) => {
        setTv(response.data.results);
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
        {tv.map(series => (
          <div key={series.id} className="col">
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                className="card-img-top"
                alt={series.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                }}
              />
              <div className="card-body">
                <h5 className="card-title">Titolo: {series.name}</h5>
                <p className="card-text">Titolo Originale: {series.original_name}</p>
                <p className="card-text">
                  Lingua: <ReactCountryFlag
                    countryCode={getCountryCode(series.original_language)}
                    svg
                    style={{
                      width: '1em',
                      height: '1em',
                    }}
                  />
                </p>
                <p className="card-text">
                  <strong>Voto:</strong> {[1, 2, 3, 4, 5].map((number) => {
                    const vote = Math.ceil(series.vote_average / 2);
                    if (number <= vote) {
                      return <span key={number}><i className="fa-solid fa-star star-color"></i></span>;
                    } else {
                      return <span key={number}><i className="fa-regular fa-star star-color"></i></span>;
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {movies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                }}
              />
              <div className="card-body">
                <h5 className="card-title">Titolo: {movie.title}</h5>
                <p className="card-text">Titolo Originale: {movie.original_title}</p>
                <p className="card-text">
                  Lingua: <ReactCountryFlag
                    countryCode={getCountryCode(movie.original_language)}
                    svg
                    style={{
                      width: '1em',
                      height: '1em',
                    }}
                  />
                </p>
                <p className="card-text">
                  <strong>Voto:</strong> {[1, 2, 3, 4, 5].map((number) => {
                    const vote = Math.ceil(movie.vote_average / 2);
                    if (number <= vote) {
                      return <span key={number}><i className="fa-solid fa-star star-color"></i></span>;
                    } else {
                      return <span key={number}><i className="fa-regular fa-star star-color"></i></span>;
                    }
                  })}
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
