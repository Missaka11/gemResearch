import "./App.css";
import Webintro from "./components/Webintro";
import { Header } from "./components/Header";
import { Link, NavLink } from "react-router-dom";
import { FooterComp } from "./components/FooterComp";

function App() {
  return (
    <>
      <Header />
      <Webintro />
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-3 d-flex align-items-stretch"  data-aos="fade-up"  data-aos-delay="100">
            <div className="team-member">
              <div className="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <Link href="">
                    <i className="bi bi-twitter-x"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
              <div className="member-info">
                <h4 spellCheck="false">Gem Identification</h4>
                <span spellCheck="false">Master Chef</span>
                <p spellCheck="false">
                  Velit aut quia fugit et et. Dolorum ea voluptate vel tempore
                  tenetur ipsa quae aut. Ipsum exercitationem iure minima enim
                  corporis et voluptate.
                </p>
              </div>
            </div>
          </div>

          <div
            className="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <NavLink
              className={"navLinkApp"}
              to={"./ImageCaptureRS"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
              <div className="team-member hover-effect">
                <div className="member-img">
                  <img
                    src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <Link href="">
                      <i className="bi bi-twitter-x"></i>
                    </Link>
                    <Link href="">
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link href="">
                      <i className="bi bi-instagram"></i>
                    </Link>
                    <Link href="">
                      <i className="bi bi-linkedin"></i>
                    </Link>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Gem Authentication</h4>
                  <span>Patissier</span>
                  <p>
                    Find your gem real or synthetic by using AI image
                    recognition.
                  </p>
                </div>
              </div>
            </NavLink>
          </div>

          <div
            className="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="300"
          >
             <NavLink
              to={"./ImageCaptureRS"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
            <div className="team-member hover-effect">
              <div className="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <Link href="">
                    <i className="bi bi-twitter-x"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
              <div className="member-info">
                <h4>Jewellery Designs</h4>
                <span>Cook</span>
                <p>
                  Vero omnis enim consequatur. Voluptas consectetur unde qui
                  molestiae deserunt. Voluptates enim aut architecto porro
                  aspernatur molestiae modi.
                </p>
              </div>
            </div>
            </NavLink>
          </div>

          <div
            className="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="team-member">
              <div className="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <Link href="">
                    <i className="bi bi-twitter-x"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link href="">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>Cook</span>
                <p>
                  Vero omnis enim consequatur. Voluptas consectetur unde qui
                  molestiae deserunt. Voluptates enim aut architecto porro
                  aspernatur molestiae modi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default App;
