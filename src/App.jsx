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
    <div className="container-fluid bg-dark text-light px-2">
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="text-center text-primary mb-4">BOOLFLIX</h1>
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-dark text-light border-primary"
              value={input}
              onChange={(e) => SetInput(e.target.value)}
              placeholder="Cerca un film..."
            />
            <button className="btn btn-outline-primary" onClick={handleclick}>
              Cerca
            </button>
          </div>
        </div>
      </div>


      <div className="container" style={{ maxWidth: '1600px' }}>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
          {tv.map(series => (
            <div key={series.id} className="col">
              <div className="card bg-dark text-light border border-primary position-relative overflow-hidden"
                style={{
                  maxWidth: '300px',
                  margin: '0 auto',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  className="card-img-top"
                  style={{
                    height: '350px',
                    objectFit: 'cover'
                  }}
                  alt={series.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75 opacity-0 hover-opacity-100"
                  style={{ transition: 'opacity 0.3s ease' }}>
                  <h6 className="card-title mb-1">{series.name}</h6>
                  <p className="card-text text-secondary small mb-1">{series.original_name}</p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ReactCountryFlag
                      countryCode={getCountryCode(series.original_language)}
                      svg
                      className="rounded-circle"
                      style={{ width: '1.2em', height: '1.2em' }}
                    />
                    <div className="text-warning small">
                      {[1, 2, 3, 4, 5].map((number) => (
                        <i key={number}
                          className={`fa${number <= Math.ceil(series.vote_average / 2) ? 's' : 'r'} fa-star me-1`}
                          style={{ fontSize: '0.8rem' }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="card-text small overflow-auto" style={{ fontSize: '0.8rem', maxHeight: '150px' }}>
                    {series.overview || 'Nessuna descrizione disponibile'}
                  </p>
                </div>
              </div>
            </div>
          ))}


          {movies.map(movie => (
            <div key={movie.id} className="col">
              <div className="card bg-dark text-light border border-primary position-relative overflow-hidden"
                style={{
                  maxWidth: '300px',
                  margin: '0 auto',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  style={{
                    height: '350px',
                    objectFit: 'cover'
                  }}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                  }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-3 bg-dark bg-opacity-75 opacity-0 hover-opacity-100"
                  style={{ transition: 'opacity 0.3s ease' }}>
                  <h6 className="card-title mb-1">{movie.title}</h6>
                  <p className="card-text text-secondary small mb-1">{movie.original_title}</p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ReactCountryFlag
                      countryCode={getCountryCode(movie.original_language)}
                      svg
                      className="rounded-circle"
                      style={{ width: '1.2em', height: '1.2em' }}
                    />
                    <div className="text-warning small">
                      {[1, 2, 3, 4, 5].map((number) => (
                        <i key={number}
                          className={`fa${number <= Math.ceil(movie.vote_average / 2) ? 's' : 'r'} fa-star me-1`}
                          style={{ fontSize: '0.8rem' }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="card-text small overflow-auto" style={{ fontSize: '0.8rem', maxHeight: '150px' }}>
                    {movie.overview || 'Nessuna descrizione disponibile'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )




};

export default App
