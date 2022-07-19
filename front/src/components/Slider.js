import {Link} from "react-router-dom";

function Slider() {
  return (
    <div
      className="slider-area active-slider-def animated-slider-content slider-nav-btn-1 nav-style-2 common-slider-style">
      <div className="single-slider fullscreen image-bg" style={{background: "url(img/slider.jpg"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="single-slider-content">
                <div className="font-light animated-part cd-headline clip">
                  <h1>Movie
                    <span className="cd-words-wrapper">
                      <b className="is-visible">&nbsp;Database</b>
                      <b>&nbsp;Database</b>
                    </span>
                  </h1>
                </div>
                <h3>Video streaming</h3>
                <p>Your application to admin your movie database for a video streaming service.</p>
                <div className="slider_btn_box">
                  <Link to="movies" className="readmore-btn sgs">Manage</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;