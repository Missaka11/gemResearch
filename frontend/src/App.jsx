import "./App.css";
import { useState } from "react";
import Webintro from "./components/Webintro";
import { Header } from "./components/Header";
import { Link, NavLink } from "react-router-dom";
import { FooterComp } from "./components/FooterComp";
import gemPhotography from "./assets/images/gemPhotography2.jpg";
import whiteboxGem from "./assets/images/whiteboxGem.jpg";
import ImageSlider from "./components/ImageSlider";
import AboutUsImage from "./assets/images/about-us.jpg";
import ContactUsImage from "./assets/images/call center.jpg";

function App() {
  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

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
                  <p spellCheck="false">
                    Curious about the authenticity of your gemstone? Our
                    advanced tool helps you capture, analyze, and verify your
                    gem’s unique features with precision. Start your gem
                    identification journey now.
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
              to={"./GemAuthenticate"}
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
                  <p>
                    Discover the authenticity of your gemstones with our
                    advanced gem identification model. Simply upload an image,
                    and our cutting-edge technology will analyze its features to
                    determine if your gem is natural or synthetic. 
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
                    detail before making your purchase.
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
            <a
              href="http://127.0.0.1:5008/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="team-member hover-effect image-card">
                <div className="member-img">
                  <img
                    src="https://i.etsystatic.com/30288025/r/il/9b61e3/6445659420/il_1080xN.6445659420_9yoi.jpg"
                    className="img-fluid"
                    alt=""
                    width="370" // Set your desired width here
                    style={{ height: "311px" }}
                  />
                </div>
                <div className="member-info">
                  <h4>Jewellery Customization</h4>
                  <p>
                    Customize your jewelry by selecting and placing gems in
                    real-time. Instantly see how your chosen design looks on
                    your neck with our live preview feature.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <ImageSlider />

      {/* About Us Section */}
      {/* <div
        id="about-us-section"
        className="about-us-section"
        style={{ height: "100vh" }}
      >
        <h2 className="about-us-heading about-header-nav-link">About Us</h2>

        <div className="row about-row"> */}
          {/* Left side: Image */}
          {/* <div className="col-lg-6 about-image">
            <img
              src={AboutUsImage}
              alt="About Us"
              className="img-fluid about-us-image"
            />
          </div> */}

          {/* Right side: Content */}
          {/* <div className="col-lg-6 about-content">
            <h2 className="about-us-sub-heading">Who We Are</h2>
            <p>
              We are a team of passionate individuals focused on transforming
              the jewelry industry by providing interactive and realistic 3D
              model experiences. Our goal is to offer cutting-edge technology to
              enhance your jewelry shopping experience.
            </p> */}

            {/* Hidden Content (Initially hidden, revealed on click) */}
            {/* <div className={`more-details ${showMore ? "show" : ""}`}>
              <p>
                Our designs are crafted by skilled artisans who bring unique
                creativity into every piece. We focus on high-quality materials
                and provide you with a virtual experience to view each piece
                from every angle, ensuring you make the right choice.
              </p>
            </div> */}

            {/* Read More Button */}
            {/* <button
              className="btn btn-primary read-more-btn"
              onClick={handleReadMore}
            >
              {showMore ? "Hide Details <<" : "Read More >>"}
            </button> */}

            {/* Stats Grid */}
            {/* <div className="about-stats">
              <div className="stats-item">
                <h5>4.9 ⭐</h5>
                <p>Ratings</p>
              </div>
              <div className="stats-item">
                <h5> 100k</h5>
                <p>Downloads</p>
              </div>
              <div className="stats-item">
                <h5>1+ Yrs</h5>
                <p>Experience</p>
              </div>
              <div className="stats-item">
                <h5> 830+</h5>
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="row vision-row">

          <div className="col-lg-6 about-image">
            <h2>
              Organizational <br />
              Vision & Mission
            </h2>
          </div> */}

          {/* Right side: Content */}
          {/* <div className="col-lg-6 about-content-mission">
            <p>
              Our vision is to be the leading innovator in the jewelry industry,
              and our mission is to provide the highest quality 3D models and
              real-time experiences that allow users to explore the full beauty
              and design of every piece of jewelry we offer.
            </p>
          </div> */}
        {/* </div>
      </div> */}

      {/* Contact Us Section */}
      <div
        id="contact-us-section"
        className="contact-us-container"
        style={{ position: "relative", height: "92vh" }}
      >
        <div className="row contact-us-row">
          {/* Left Column: Topic & Description */}
          <div className="col-lg-7 contact-left-column">
            <h2>
              Contact Us <br /> About Gemora Software
            </h2>
            <p>
              If you have any questions or inquiries, feel free to reach out.
              We're here to assist you with <br /> all things Gemora Software
              and more!
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="col-lg-5 contact-right-column">
            <img
              src={ContactUsImage}
              alt="Contact Us"
              className="img-fluid"
              style={{ height: "70vh" }}
            />
          </div>
        </div>

        {/* Contact Actions Box - Floating in front of the row */}
        <div className="contact-actions-box">
          <div className="row contact-actions">
            {/* Call Us Directly Box */}
            <div className="col-md-4">
              <div className="contact-box">
                {/* Phone Icon above the title */}
                <div className="icon-box">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h4>Call Us Directly</h4>
                <p>
                  Contact us for immediate assistance. <br /> +94 11 754 4801
                </p>
              </div>
            </div>

            {/* Chat with Our Sales Team Box */}
            <div className="col-md-4">
              <div className="contact-box">
                {/* Message Icon above the title */}
                <div className="icon-box">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <h4>Chat with Our Team</h4>
                <p>Speak to a representative for personalized help.</p>
              </div>
            </div>

            {/* Get a Product Demo Box */}
            <div className="col-md-4">
              <div className="contact-box">
                {/* Calendar Icon above the title */}
                <div className="icon-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h4>Our Location</h4>
                <p>SLIIT Malabe Campus, New Kandy Road, Malabe.</p>
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
