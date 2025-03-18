import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/imageSlider.css";

const ImageSlider = () => {
  return (
    <Carousel
      data-bs-theme="dark"
      className="image-slider mx-auto"
      pause={false}
    >
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1613843351058-1dd06fda7c02?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="bg-dark bg-gradient bg-opacity-75 p-3 rounded-3">
            <h5 className="text-light">Image of Topaz</h5>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1626784214536-d859187e0bd0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
        <Carousel.Caption>
          <div className="bg-dark bg-gradient bg-opacity-75 p-3 rounded-3">
            <h5 className="text-light">Image of Presious Ring</h5>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1605821771565-35e0d046a2fb?q=70&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className="bg-dark bg-gradient bg-opacity-75 p-3 rounded-3">
            <h5 className="text-light">Image of Blue Sapphire</h5>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageSlider;
