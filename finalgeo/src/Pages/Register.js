import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import CustomInput from "../UI/CustomInput";
import "./Login.css";

const Register = () => {
  const { adduser, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    error: "",
  });
  const [errorState, setErrorState] = useState({
    name: {
      error: false,
      msg: "",
    },
    email: {
      error: false,
      msg: "",
    },
    password: {
      error: false,
      msg: "",
    },
    cpassword: {
      error: false,
      msg: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (state.email === "" && state.password === "" && state.cpassword === "") {
      setErrorState((prevErrorState) => ({
        ...prevErrorState,
        email: {
          error: true,
          msg: "email Field should not be empty.",
        },
        password: {
          error: true,
          msg: "Password Field should not be empty.",
        },
        cpassword: {
          error: true,
          msg: "Confirm Password Field should not be empty.",
        },
      }));
    } else if (
      state.email === "" ||
      state.password === "" ||
      state.cpassword === ""
    ) {
      if (state.email === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: true,
            msg: "email Field should not be empty.",
          },
          password: {
            error: false,
            msg: "",
          },
          cpassword: {
            error: false,
            msg: "",
          },
        }));
      }
      if (state.password === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: false,
            msg: "",
          },
          password: {
            error: true,
            msg: "Password Field should not be empty.",
          },
          cpassword: {
            error: false,
            msg: "",
          },
        }));
      }
      if (state.cpassword === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: false,
            msg: "",
          },
          password: {
            error: false,
            msg: "",
          },
          cpassword: {
            error: true,
            msg: "Password Field should not be empty.",
          },
        }));
      }
      if (state.cpassword === "" || state.password === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: false,
            msg: "",
          },
          password: {
            error: true,
            msg: "Password Field should not be empty.",
          },
          cpassword: {
            error: true,
            msg: "Password Field should not be empty.",
          },
        }));
      }
      if (state.email === "" || state.password === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: true,
            msg: "email Field should not be empty.",
          },
          password: {
            error: true,
            msg: "Password Field should not be empty.",
          },
          cpassword: {
            error: true,
            msg: "",
          },
        }));
      }
      if (state.email === "" || state.cpassword === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: true,
            msg: "email Field should not be empty.",
          },
          password: {
            error: false,
            msg: "",
          },
          cpassword: {
            error: true,
            msg: "Password Field should not be empty.",
          },
        }));
      }
    } else if (state.password !== state.cpassword) {
      setErrorState((prevErrorState) => ({
        ...prevErrorState,
        email: {
          error: false,
          msg: "",
        },
        password: {
          error: true,
          msg: "Passwords do not match.",
        },
        cpassword: {
          error: true,
          msg: "Passwords do not match.",
        },
      }));
    } else {
      adduser(state.name, state.email, state.password);
      navigate("/login");
      setErrorState((prevErrorState) => ({
        ...prevErrorState,
        email: {
          error: false,
          msg: "",
        },
        password: {
          error: false,
          msg: "",
        },
        cpassword: {
          error: false,
          msg: "",
        },
      }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/geofence" />;
  }
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
                      <div className="mb-2">
                        <CustomInput
                          required
                          //   type="text"
                          labelText="Name"
                          //   className="form-control login-email form-control-lg mb-4"
                          //   value={state.name}
                          //   handleChange={handleChange}
                          //   id="name"
                          className={
                            errorState.name.error
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          type="text"
                          id="name"
                          aria-describedby="nameHelp"
                          value={state.name}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          <small>{errorState.name["msg"]}</small>
                        </div>
                      </div>

                      <div className="mb-2">
                        <CustomInput
                          required
                          //   type="email"
                          labelText="Email"
                          //   className="form-control form-control-lg mb-4"
                          //   id="email"
                          //   value={state.email}
                          //   handleChange={handleChange}
                          //   aria-describedby="emailHelp"
                          className={
                            errorState.email.error
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          type="email"
                          id="email"
                          aria-describedby="emailHelp"
                          value={state.email}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="mb-2">
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
                      </div> */}
                      <div className="mb-5">
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
                      <div className="invalid-feedback">
                        <small>{errorState.password["msg"]}</small>
                      </div>
                      <div className="mb-5">
                        <CustomInput
                          required
                          type="password"
                          labelText="Confirm Password"
                          className="form-control form-control-lg mb-4"
                          value={state.password}
                          handleChange={handleChange}
                          id="cpassword"
                        />
                      </div>
                      <div className="invalid-feedback">
                        <small>{errorState.cpassword["msg"]}</small>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        onClick={handleSubmitClick}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp; Registering...
                          </>
                        ) : (
                          "Register"
                        )}
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
    </>
  );
};
export default Register;
