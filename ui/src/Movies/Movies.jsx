import { useEffect, useState } from 'react';

export default function Movies() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return(
    <>
      <table className="movie-table">
        <tbody >
          {list.map((row) => (
            <tr key={row.id}>
              <td >{row.id}</td>
              <td >{row.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}