import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../Contexts/Context/AuthContext";
import CustomInput from "../UI/CustomInput";
import "./Login.css";

export default function SignUp() {
  //const { saveUser, isAuthenticated } = useContext(AuthContext);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  //const navigate = useNavigate();
  const handleSubmit = async (event) => {
    //sign up or register
    event.preventDefault();
    // eslint-disable-next-line no-console
    // if (validateEmail(state.email)) {
    //   saveUser(state.email, state.password, state.name).then((response) => {
    //     console.log(response);
    //     if (response.data.message === "success") {
    //       navigate("/login");
    //     } else {
    //       alert("User already exists");
    //     }
    //   });
    // }
    if (!validateEmail(state.email)) {
      alert("Email is invalid");
    } else if (!validateName(state.name)) {
      alert("Invalid name");
    }
    // else if (!validatePassword(state.password)) {
    //   alert("Password should be atleast 8 characters");
    // }
    else {
      await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      console.log(state);
    }
  };

  return (
    <>
      <section className="vh-auto wh-auto gradient-custom">
        <div className="container py-5 h-80">
          <div className="row d-flex justify-content-center align-items-center h-auto w-auto">
            <div className="col-12 col-md-7 col-lg-6 col-xl-4">
              <div className="black-card card bg-dark text-white">
                <div className="card-body p-2 text-center">
                  <div className="mb-md-0 mt-md-4 pb-5">
                    <h2 className="form-title fw-bold mb-2 text-uppercase mt-5">
                      Sign Up
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter your details
                    </p>
                    <Container component="main" maxWidth="xs">
                      {/* {isAuthenticated.toString()}
        <br />
        {state.email + " " + state.password + " " + state.designation} */}
                      <div className="mb-2">
                        {/* <label for="designation" className="form-label">
                          Name
                        </label> */}
                        <CustomInput
                          required
                          type="text"
                          labelText="Name"
                          className="form-control login-email form-control-lg mb-4"
                          value={state.name}
                          handleChange={handleChange}
                          id="name"
                        />
                      </div>
                      <div className="mb-2">
                        {/* <label for="email" className="form-label">
                          Email Address
                        </label> */}
                        <CustomInput
                          required
                          type="email"
                          labelText="Email"
                          className="form-control form-control-lg mb-4"
                          id="email"
                          value={state.email}
                          handleChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-2">
                        <CustomInput
                          required
                          type="text"
                          labelText="Phone"
                          className="form-control form-control-lg mb-4"
                          id="phone"
                          //value={state.email}
                          //handleChange={handleChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-5">
                        {/* <label for="password" className="form-label">
                          Password
                        </label> */}
                        <CustomInput
                          required
                          type="password"
                          labelText="Password"
                          className="form-control form-control-lg mb-4"
                          value={state.password}
                          handleChange={handleChange}
                          id="password"
                        />
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>
                      <br />
                      <div id="emailHelp" className="form-text mt-5 mb-0">
                        Already have an account? Log in{" "}
                        <Link to="/login">here</Link>
                      </div>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------------- */}
      {/* <section className="vh-auto wh-auto gradient-custom">
        <div className="container py-5 h-80">
          <div className="row d-flex justify-content-center align-items-center h-150 w-150">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="black-card card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-white-50 mb-5">Please enter your details</p>

                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control form-control-lg"
                        type="designation"
                        id="designation"
                        value={state.designation}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                      <h5>
                        <label className="form-label " for="typeEmailX">
                          Name
                        </label>
                      </h5>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        id="email"
                        value={state.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                      />
                      <h5>
                        <label className="form-label " for="typeEmailX">
                          Email
                        </label>
                      </h5>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={state.password}
                        onChange={handleChange}
                        id="password"
                      />
                      <h5>
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                      </h5>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="text-white-50 fw-bold">
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
