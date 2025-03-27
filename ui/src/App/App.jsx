import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Movies from '../Movies/Movies'
import Submit from '../Submit/Submit'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'
import './App.css'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        {/* <Route path="/movies/:id" element={<MovieDetails />} /> */}
        <Route path='/submit' element={<Submit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className='footer'>
        <h3>Mini CRUD App</h3>
        <p id="footerP">Authors: Harman Gidda</p>
      </div>
    </>
  )
}

export default App
