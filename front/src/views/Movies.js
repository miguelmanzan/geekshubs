import {useState, useEffect} from 'react'
import axios from 'axios';

function Movies() {
  const [movies, setMovies] = useState({array: [], current: ''})

  useEffect(() => {
    getMovies()
  }, [])

  // getMovies
  const getMovies = e => {
    const search = e ? e.target.value : ''
    let path = 'http://localhost:8000/movies/'
    let url = search ? `${path}title/${e.target.value}/` : path
    axios
    .get(url)
    .then((res) => {

      setMovies((prevState) => ({
        ...prevState,
        array: res.data,
      }))
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <br/><br/><br/>
      <main className="page-content">
        <section className="course-details-list-area area-padding-large bg-color-white blog-details-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="course-details">
                  <div className="course-details-main">
                    <div className="card">
                      <div className="card-body">
                      {/* SEARCH */}
                      <input type="text"
                           className="form-control"
                           id="actors"
                           placeholder="Search movie..."
                           onChange={getMovies}
                      /><br></br>
                      {/* RESULTS */}
                      <ul className="list-group">
                        <li className="list-group-item active">Movie</li>
                        {
                          movies.array.length ?
                          movies.array.map(el => 
                            <li className="list-group-item"
                                key={el.id}
                            
                            >{el.title}</li>
                          ) :
                          null
                        }
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Movies;
