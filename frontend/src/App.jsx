import "./App.css";

import Webintro from "./components/Webintro";
import { Header } from "./components/Header";
import { Link, NavLink } from "react-router-dom";
import ImageCaptureRS from "./pages/ImageCaptureRS";

function App() {
  return (
    <>
      <Header />

      <Webintro />
      <div class="container">
        <div class="row gy-4">
          <div
            class="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="team-member">
              <div class="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-1.jpg"
                  class="img-fluid"
                  alt=""
                />
                <div class="social">
                  <a href="">
                    <i class="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
              <div class="member-info">
                <h4 contenteditable="true" spellcheck="false">
                  Walter White
                </h4>
                <span contenteditable="true" spellcheck="false">
                  Master Chef
                </span>
                <p contenteditable="true" spellcheck="false">
                  Velit aut quia fugit et et. Dolorum ea voluptate vel tempore
                  tenetur ipsa quae aut. Ipsum exercitationem iure minima enim
                  corporis et voluptate.
                </p>
              </div>
            </div>
          </div>

          <div
            class="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <NavLink
              to={"./ImageCaptureRS"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
              <div class="team-member hover-effect">
                <div class="member-img">
                  <img
                    src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-2.jpg"
                    class="img-fluid"
                    alt=""
                  />
                  <div class="social">
                    <a href="">
                      <i class="bi bi-twitter-x"></i>
                    </a>
                    <a href="">
                      <i class="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i class="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i class="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div class="member-info">
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
            class="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="team-member">
              <div class="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-3.jpg"
                  class="img-fluid"
                  alt=""
                />
                <div class="social">
                  <a href="">
                    <i class="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
              <div class="member-info">
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

          <div
            class="col-lg-3 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="team-member">
              <div class="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-3.jpg"
                  class="img-fluid"
                  alt=""
                />
                <div class="social">
                  <a href="">
                    <i class="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
              <div class="member-info">
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
    </>
  );
}

export default App;
