import {useState, useEffect} from 'react'
import axios from 'axios';

function AddMovie() {
  const [alert, setAlert] = useState('')
  const [validate, setValidate] = useState(false)
  const [title, setTitle] = useState('')
  const [actors, setActors] = useState({filtered: [], current:''})
  const [actorsAdded, setActorsAdded] = useState({array: []})
  const [categories, setCategories] = useState({array: [], current: null})

  const handleTitle = e => setTitle(e.target.value)
  
  const handleCategory = e => {
    setCategories((prevState) => ({
      ...prevState,
      current: e.target.value
    }))
  }

  // Get categories
  useEffect(() => {
    const url = 'http://localhost:8000/categories/'
    axios
    .get(url)
    .then((res) => {

      setCategories((prevState) => ({
        ...prevState,
        array: res.data,
      }))
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

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

  // Add actor to current movie
  const addActor = (id, name) => {  
    setActorsAdded((prevState) => ({
      ...prevState,
      array: [...prevState.array, {id, name}]
    }))

    setActors((prevState) => ({
      ...prevState,
      filtered: [],
      current: ''
    }))
  }

  // Add movie
  const addMovie = () => {
    setValidate(true)
    const category = categories.current
    const cast = actorsAdded.array.map(({id}) => id)
    if(title && category && cast.length) {
      const body = { title, category, cast }
      const url = 'http://localhost:8000/movies/'
      axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTitle('')
        setActorsAdded((prevState) => ({
          ...prevState,
          array: []
        }))
        setValidate(false)
      })
      .catch((err) => {
        console.log(err)
        setAlert('Movie with this title already exists')
        setTimeout(() => setAlert(''), 3000)
      });
    }
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
                          Add new movie
                      </h5>
                      {/* FORM */}
                      <div className="card-body">
                        {/* TITLE FIELD */}
                        <div className="mb-3 row">
                          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                          <div className="col-sm-9">
                            <input 
                                   className="form-control"
                                   is-invalid="true"
                                   placeholder='Enter title'
                                   id="title"
                                   value={title}
                                   onChange={handleTitle}
                            />
                            {
                              validate && !title ?
                              <small className="text-primary">Required</small> :
                              null
                            }
 
                          </div>
                        </div>
                        {/* CATEGORY FIELD */}
                        <div className="mb-3 row">
                          <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                          <div className="col-sm-9">
                          <select className="form-select form-select-sm"
                                  onChange={handleCategory}
                                  id="category"
                          >
                            <option hidden>Select category</option>
                            {
                              categories.array ?
                              categories.array.map((el) => <option key={el.id} value={el.id}>{ el.name }</option>) :
                              null
                            }
                          </select>
                          {
                              validate && !categories.current ?
                              <small className="text-primary">Required</small> :
                              null
                          }
                          </div>
                        </div>
                        <div className="mb-3 row">
                          {/* ACTOR FIELD */}
                          <label htmlFor="actors" className="col-sm-2 col-form-label">Actors</label>
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
                              <li className="list-group-item list-group-item-action active" aria-current="true">Actors added</li>
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
                        {/* SUBMIT BUTTON */}
                        <div className="mb-3 row">
                          <div className="col-sm-9">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={addMovie}
                            >
                              Add new movie
                            </button>
                          </div>
                        </div>
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

export default AddMovie;
