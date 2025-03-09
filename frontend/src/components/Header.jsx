import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="pb-1">
      <div className="header-content mx-auto d-flex">
        <img
          src="https://i.imgur.com/WHoCqFA.png"
          className="header-Logo rounded-3"
          alt="Logo image"
        />
        <nav className="navbar navbar-expand-lg ms-auto bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item px-4">
                  <Link
                    className="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item px-4">
                  <Link
                    className="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item px-4">
                  <Link
                    className="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Contact
                  </Link>
                </li>
                <li className="nav-item px-4">
                  <Link
                    className="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <button
          type="button"
          className="btn header-signin my-auto ms-5 fw-semibold"
        >
          Sign In
        </button>
      </div>
    </header>
  );
};
