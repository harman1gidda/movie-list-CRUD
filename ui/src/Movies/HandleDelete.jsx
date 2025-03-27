import { useState } from 'react';

export default function HandleDelete({ id }) {
  const [status, setStatus] = useState(null);

  const handleDelete = () => {

    const confirmDelete = window.confirm('Are you sure you want to delete this?')

    if (confirmDelete) {
      fetch(`http://localhost:8081/movies/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.ok) {
            alert('Item deleted!')
            window.location.reload();
          } else {
            setStatus('Failed to delete')
          }
        })
    } else {
      console.log('Delete action was canceled')
    }
  }

  return (
    <div>
      <button className='med-btn' onClick={handleDelete}>Delete</button>
    </div>
  );
}