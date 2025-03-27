import { useEffect, useState } from 'react';
import HandleDelete from './HandleDelete';

export default function Movies() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [showWatched, setShowWatched] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  const toggleWatched = (id) => {
    const updatedList = list.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    );
    setList(updatedList);
  };

  const filteredList = list
    .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
    .filter((movie) => (showWatched ? movie.watched : !movie.watched));

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(elm) => setSearch(elm.target.value)}
        />
      </div>

      <div>
        <button onClick={() => setShowWatched(false)}>To Watch</button>
        <button onClick={() => setShowWatched(true)}>Watched</button>
      </div>

      <div>
        <table className="movie-table">
          <tbody>
            {filteredList.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>
                  <button onClick={() => toggleWatched(row.id)}>
                    {row.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                  </button>
                </td>
                <td>
                  <HandleDelete id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}