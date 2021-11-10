import { useState } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert';

function App() {
  const [url, setUrl] = useState({})
  const [newUrl, setNewUrl] = useState([])

  const handleBlur = (e) => {
    const searchUrl = e.target.value;
    setUrl(searchUrl);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("https://immense-everglades-26400.herokuapp.com/api/make/shortendUrl", { url: url })
      .then(res => {
        if (res.data.url) {
          setNewUrl(res.data.url.shortendUrl)
        }
        else {
          swal("Failed!", res.data.error, "error")
        }
      })
  }

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
          {newUrl && <h3>Sort url: <a target="_blank" href={url}>{newUrl}</a></h3>}
        </div>
      </div >
    </>
  );
}

export default App;
