import axios from "axios"
import { useState } from "react"

const keyApi = "3fa3a72f0073cd9418d6d2a8e957a89f"



function App() {
  const [input, SetInput] = useState("");
  const [movies, setMovies] = useState([]); // nuovo state per i risultati

  const handleclick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&query=${input}`)
      .then((response) => {
        console.log(response.data); // per vedere i dati in console
        setMovies(response.data.results); // salva i risultati nel nuovo state
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => SetInput(e.target.value)}
        placeholder="Cerca un film..."
      />
      <button onClick={handleclick}>Cerca</button>
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default App
