import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header header-style-1 sticky-header transparent-header common-header-style">
      <div className="container d-none d-lg-block">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-inner">
              <div className="logo default_logo">
                <Link to="/">
                  <span className="logotipo">MOVIE DATABASE</span>
                </Link>
              </div>
              <div className="logo sticky_logo single-slider-content">
                <Link to="/">
                  <span className="logotipo sticky">MOVIE DATABASE</span>
                </Link>
              </div>
              <nav className="menu single-slider-content">
                <ul>
                  <li><Link to="/">HOME</Link></li>
                  <li><Link to="addmovie">ADD MOVIE</Link></li>
                  <li><Link to="movies">MOVIES</Link></li>
                  <li><Link to="actormovies">ACTOR MOVIES</Link></li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;