import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <>
      <div className='NavContainer'>
        <div className='NavBar'>

          <div className='button'>
            <a href="/movies" className="iconLink">
            {/* <img src={Movies} alt="gears" /> */}
            <button className='iconButton'>Movies</button>
            </a>
          </div>

          <div className='button'>
            <a href="/submit" className="iconLink">
            {/* <img src={Submit} alt="sites" /> */}
            <button className='iconButton'>Submit</button>
            </a>
          </div>
        </div>

        {/* <div className='SubmitBar'>
          <div className='button' id="submitButton">
            <button><Link to={"/submit"}>Submit New Request</Link></button>
            </div>
        </div> */}
      </div>
    </>
  )
}