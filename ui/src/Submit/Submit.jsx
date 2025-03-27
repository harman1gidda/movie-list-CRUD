import { useState } from 'react';

export default function Submit() {
  const [newMovie, setNewMovie] = useState('');

  const handleSubmit = (elm) => {
    elm.preventDefault(); // Prevent default form submission

    if (newMovie.trim() === '') {
      alert('Please enter a movie title.');
      return;
    }

    fetch('http://localhost:8081/movies', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newMovie }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Movie added!');
          return res.json();
        } else {
          alert('Failed to add movie.');
        }
      })
      .then((data) => {
        console.log(data);
      });

    // Clear the input field after submission
    setNewMovie('');
  };

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter movie title"
          value={newMovie}
          onChange={(elm) => setNewMovie(elm.target.value)} // Update state as user types
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
