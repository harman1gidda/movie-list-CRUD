import { useEffect, useState } from 'react';
import HandleDelete from './HandleDelete';

export default function Movies() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  const filteredList = list.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <table className="movie-table">
        <tbody>
          {filteredList.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>
                <HandleDelete id={row.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}