import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          React Image Rendering
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Image 1
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/image2">
                Bootstrap Image
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/image3">
                useffect Image
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/image4">
                Material UI Image
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
