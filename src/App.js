import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState({})
  const [newUrl, setNewUrl] = useState([])
  const [error, setError] = useState([])
  console.log(url)
  const handleBlur = (e) => {
    const searchUrl = e.target.value;
    setUrl(searchUrl);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("https://immense-everglades-26400.herokuapp.com/api/make/shortendUrl", {url: url})
      .then(res => {
        if(res){
          setNewUrl(res.data.url.shortendUrl)
        }
        else{
          error(res.data.error)
        }
      })
  }
//   useEffect(() => {
//     axios(`http://localhost:5000/flightBooking`)
//     .then(res => setNewUrl(res.data.result))
// }, [])

  return (

    <>
      <h1 className="text-center text-primary bg-gray py-3">Algo Sorter URL</h1>
      <div className="container" >
        <div className="text-center row">
          <div className="mt-5">
            <h4><i>Enter your url here</i></h4>
            <p className="text-danger"><i>ex: https://google.com</i></p>
          </div>
          <div className="search-box my-5 col-md-6 mx-auto">
            <form action="" onSubmit={handleSubmit}>
              <input onBlur={handleBlur} name="url" type="text" className="form-control" placeholder="Enter your url here" />
              <button type="submit" className="btn btn-success search-btn">Search</button>
            </form>
          </div>
          {error && <p className="text-danger">{error}</p>}
          {newUrl && <h3>Sort url: <a target="_blank" href={url}>{newUrl}</a></h3>}
        </div>
      </div >
    </>
  );
}

export default App;
