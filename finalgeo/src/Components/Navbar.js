import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
//import { AuthContext } from "./Contexts/Context/AuthContext";

const MyNavbar = () => {
  //const [dropdown, setDropdown] = useState(false);
  // const [click, setClick] = useState(false)

  //const { logout, isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    //sign out
    event.preventDefault();
    await fetch("http://localhost:3001/logout", {
      method: "GET",

      // body: JSON.stringify(state),
    });
  };

  const navLinks = (
    <>
      <Nav className=" navbar-collapse ms-5">
        <ul className="navbar-nav mr-auto">
          <Nav.Link href="/home" className="nav-item ms-5 fs-5">
            Home
          </Nav.Link>
          <Nav.Link href="/about" className="nav-item ms-5 fs-5">
            About
          </Nav.Link>
          <NavDropdown
            menuVariant="dark"
            className="nav-item ms-5 fs-5"
            title="Services"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/geotag" className="fs-5">
              GeoTag
            </NavDropdown.Item>
            <NavDropdown.Item href="/geofence" className="fs-5">
              GeoFence
            </NavDropdown.Item>
            <NavDropdown.Item href="/routes" className="fs-5">
              Routes
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login" className="nav-item ms-5 fs-5">
            Login
          </Nav.Link>
          <Nav.Link href="/signup" className="nav-item ms-5 fs-5">
            SignUp
          </Nav.Link>
        </ul>
        <div>
          <p id="userName"></p>
        </div>
      </Nav>
    </>
  );

  return (
    <>
      <div className="">
        <Navbar
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          variant="dark"
          bg="dark"
          expand="lg"
        >
          <Navbar.Brand className="fs-2 fw-bold text-white ms-4" href="/home">
            GIS Application
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            {/* {isAuthenticated ? navLinks : null} */}
            {navLinks}
          </Navbar.Collapse>
          <form className="form-inline mx-3">
            <button
              type="button"
              className="btn btn-outline-light float-right my-2 my-sm-0"
              onClick={handleSubmit}
            >
              Sign Out
            </button>
          </form>
        </Navbar>
      </div>
    </>
  );
};

export default MyNavbar;
