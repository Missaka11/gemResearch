import "./App.css";
import Webintro from "./components/Webintro";
import { Header } from "./components/Header";
import { Link, NavLink } from "react-router-dom";
import { FooterComp } from "./components/FooterComp";
import gemPhotography from "./assets/images/gemPhotography2.jpg";
import whiteboxGem from "./assets/images/whiteboxGem.jpg";
import ImageSlider from "./components/ImageSlider";

function App() {
  return (
    <>
      <Header />
      <Webintro />
      <div className="container functionImg-container">
        <div className="row gy-4">
          <div
            className="col-lg-3 d-flex align-items-stretch category-cards"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <NavLink
              to={"./GemIdentification"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
              <div className="team-member hover-effect image-card">
                <div className="member-img">
                  <img src={gemPhotography} className="img-fluid" alt="" />
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
            </NavLink>
          </div>

          <div
            className="col-lg-3 d-flex align-items-stretch category-cards"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <NavLink
              to={"./ImageCaptureRS"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
              <div className="team-member hover-effect image-card">
                <div className="member-img">
                  <img
                    src={whiteboxGem}
                    className="img-fluid category-cover-images"
                    alt=""
                  />
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
            className="col-lg-3 d-flex align-items-stretch category-cards"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <NavLink
              to={"./GemShapeCapture"}
              style={{ color: "#212529", textDecorationLine: "none" }}
            >
              <div className="team-member hover-effect image-card">
                <div className="member-img">
                  <img
                    src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=70&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="img-fluid category-cover-images"
                    alt=""
                  />
                </div>
                <div className="member-info">
                  <h4>Jewellery Designs</h4>
                  <p>
                    Discover a wide range of exquisite jewelry designs in 3D!
                    From elegant earrings to stunning rings, necklaces, and
                    bracelets, our interactive models allow you to see every
                    detail before making your purchase. Experience the beauty
                    and craftsmanship of our designs like never before!
                  </p>
                </div>
              </div>
            </NavLink>
          </div>

          <div
            className="col-lg-3 d-flex align-items-stretch category-cards"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="team-member hover-effect image-card">
              <div className="member-img">
                <img
                  src="https://builder.bootstrapmade.com/static/img/template/Yummy/chefs/chefs-3.jpg"
                  className="img-fluid"
                  alt=""
                />
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
      <ImageSlider />
      <FooterComp />
    </>
  );
}

export default App;
