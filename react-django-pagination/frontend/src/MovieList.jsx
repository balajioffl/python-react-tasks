
import { useEffect, useState } from "react";
import "./MovieList.css";

function MovieList() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/movies/?page=${page}`);
    const data = await res.json();

    setMovies(data.results);
    setNext(data.next);
    setPrevious(data.previous);

    const total = Math.ceil(data.count / 5);
    setTotalPages(total);
  };

  useEffect(() => 
  {
    fetchMovies();
  }, [page]);

  const filteredMovies = movies.filter(movie => 
  {
    return (
      (search ? movie.title.toLowerCase().includes(search.toLowerCase()) : true) &&
      (category ? movie.category === category : true) &&
      (rating ? movie.rating == rating : true)
    );
  });

  return (
    <div className="movie-container">
      <h1>Movie List</h1>

     <div className="filters">

        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>

        <select onChange={(e) => setCategory(e.target.value)}>

          <option value="">All Categories</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Comedy">Comedy</option>

        </select>

        <select onChange={(e) => setRating(e.target.value)}>

          <option value="">All Ratings</option>
          <option value="6">6 Star</option>
          <option value="7">7 Stars</option>
          <option value="8">8 Stars</option>
          <option value="9">9 Stars</option>
          <option value="10">10 Stars</option>

        </select>
      </div>

      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.category}</td>
                <td>{movie.rating}</td>
              </tr>
            ))
           ) : 
          (
            <tr>
              <td colSpan="4">No movies found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={!previous} onClick={() => setPage(page - 1)}>Previous</button>

      {(() => 
      {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button key={i} className={page === i ? "active" : ""} 
            onClick={() => 
              setPage(i)} >
              {i} </button>
          );
        }
        return buttons;

      })()}

        <button disabled={!next} onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </div>
  );
}

export default MovieList;
