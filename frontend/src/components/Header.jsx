import React from "react";
import "../styles/Header.css";

export const Header = () => {
  return (
    <header className="pt-1 pb-1">
      <div className="header-content mx-auto d-flex">
        <img
          src="https://i.imgur.com/WHoCqFA.png"
          className="header-Logo rounded-3"
          alt="Logo image"
        />
        <nav class="navbar navbar-expand-lg ms-auto bg-body-tertiary">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item px-4">
                  <a
                    class="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li class="nav-item px-4">
                  <a
                    class="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li class="nav-item px-4">
                  <a
                    class="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
                <li class="nav-item px-4">
                  <a
                    class="nav-link header-nav-link fw-semibold"
                    aria-current="page"
                    href="#"
                  >
                    Service
                  </a>
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
