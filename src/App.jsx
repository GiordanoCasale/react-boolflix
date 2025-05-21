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
    <div className="container-fluid bg-dark text-light">
      {/* Header */}
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


      <div className="row g-2">
        {tv.map(series => (
          <div key={series.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 bg-dark border-primary text-light hover-shadow"
              style={{ maxWidth: '250px', margin: '0 auto' }}> {/* ridotto maxWidth */}
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
                alt={series.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                }}
              />
              <div className="card-body p-2">
                <h5 className="card-title text-primary fs-6">{series.name}</h5>
                <p className="card-text text-secondary small">{series.original_name}</p>
                <p className="card-text d-flex align-items-center gap-2">
                  <ReactCountryFlag
                    countryCode={getCountryCode(series.original_language)}
                    svg
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />
                </p>
                <div className="text-warning">
                  {[1, 2, 3, 4, 5].map((number) => {
                    const vote = Math.ceil(series.vote_average / 2);
                    return (
                      <i key={number}
                        className={`fa${number <= vote ? 's' : 'r'} fa-star me-1`}>
                      </i>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}


        {movies.map(movie => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 bg-dark border-primary text-light hover-shadow"
              style={{ maxWidth: '250px', margin: '0 auto' }}> {/* ridotto maxWidth */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
                }}
              />
              <div className="card-body p-2">
                <h5 className="card-title text-primary fs-6">{movie.title}</h5>
                <p className="card-text text-secondary small">{movie.original_title}</p>
                <p className="card-text d-flex align-items-center gap-2">
                  <ReactCountryFlag
                    countryCode={getCountryCode(movie.original_language)}
                    svg
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />
                </p>
                <div className="text-warning">
                  {[1, 2, 3, 4, 5].map((number) => {
                    const vote = Math.ceil(movie.vote_average / 2);
                    return (
                      <i key={number}
                        className={`fa${number <= vote ? 's' : 'r'} fa-star me-1`}>
                      </i>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
