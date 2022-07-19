import {useState, useEffect} from 'react'
import axios from 'axios';

function ActorMovies() {
  const [movies, setMovies] = useState({array: [], current: ''})
  const [alert, setAlert] = useState('')
  const [validate, setValidate] = useState(false)
  const [actors, setActors] = useState({filtered: [], current:''})
  const [actorsAdded, setActorsAdded] = useState({array: []})

  useEffect(() => {
    getMovies()
  }, [actorsAdded])

  // getMovies
  const getMovies = () => {
    let query = ''
    actorsAdded.array.map(el =>{ query += el.id + '-' })
    query = query.replace(/-$/, '');
    const path = 'http://localhost:8000/movies/'
    const url = query ? `${path}cast/${query}/` : path
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

  // Search actors
  const searchActors = e => {
    const search = e.target.value

    if(search) {
      const url = `http://localhost:8000/actors/name/${search}/`
      axios
      .get(url)
      .then((res) => {
        // Exclude actors added to current movie
        const filtered = res.data.filter(o1 => !actorsAdded.array.some(o2 => o1.id === o2.id));
        setActors((prevState) => ({
          ...prevState,
          filtered,
          current: search
        }))
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      setActors((prevState) => ({
        ...prevState,
        filtered : [],
        current: ''
      }))
    }
  }

  // add actor to current movie
  const addActor = (id, name) => {  
    setActorsAdded((prevState) => ({
      ...prevState,
      array: [...prevState.array, {id, name}],
    }))

    setActors((prevState) => ({
      ...prevState,
      filtered: [],
      current: ''
    }))
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
                      <h5 className="card-header bg-transparent text-primary">
                          Filter movies by actors
                      </h5>
                      {/* FORM */}
                      <div className="card-body">
                        <div className="mb-3 row">
                          {/* ACTOR FIELD */}
                          <label htmlFor="actors" className="col-sm-2 col-form-label">Actors to filter</label>
                          <div className="col-sm-5">
                            <input type="text"
                                   className="form-control"
                                   id="actors"
                                   placeholder="Search actors..."
                                   onChange={searchActors}
                                   value={actors.current}
                            />
                            {
                              validate && !actorsAdded.array.length ?
                              <small className="text-primary">Required</small> :
                              null
                            }
                              <ul className="list-group">
                              {
                                actors.filtered.length ?
                                actors.filtered.map((el) =>
                                  <a href="#"
                                     className="list-group-item list-group-item-action"
                                     key={el.id}
                                     onClick={e => addActor(el.id, el.name)}
                                  >
                                    {el.name}
                                  </a>) :
                                  null
                              }
                            </ul>
                          </div>
                          {/* ACTORS ADDED */}
                          <div className="col-sm-4">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action active" aria-current="true">Actors to filter</li>
                                {
                                  !actorsAdded.array.length ?
                                  <li className="list-group-item list-group-item-action">None</li> :
                                  actorsAdded.array.map((el) => <li key={el.name} className="list-group-item list-group-item-action">{el.name}</li>)
                                }
                            </ul>
                          </div>
                        </div>
                        {
                          alert ?
                          <div className="mb-3 row">
                            <div className="col-sm-9"></div>
                            <div className="alert alert-primary" role="alert">
                              {alert}
                            </div>
                          </div> :
                          null
                        }
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
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

export default ActorMovies;
