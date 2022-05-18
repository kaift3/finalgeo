import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
//import { AuthContext } from "../Contexts/Context/AuthContext";
import CustomInput from "../UI/CustomInput";
import { AuthContext } from "../Contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const { login, isAuthenticated, loading } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [errorState, setErrorState] = useState({
    email: {
      error: false,
      msg: "",
    },
    password: {
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

    if (state.email === "" && state.password === "") {
      setErrorState((prevErrorState) => ({
        ...prevErrorState,
        email: {
          error: true,
          msg: "Email Field should not be empty.",
        },
        password: {
          error: true,
          msg: "Password Field should not be empty.",
        },
      }));
    } else if (state.email === "" || state.password === "") {
      if (state.email === "") {
        setErrorState((prevErrorState) => ({
          ...prevErrorState,
          email: {
            error: true,
            msg: "Email Field should not be empty.",
          },
          password: {
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
        }));
      }
    } else {
      login(state.email, state.password);
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
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 my-4 pb-5">
                    <h2 className="form-title fw-bold mb-2 text-uppercase">
                      Login
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter your credentials
                    </p>

                    <div className="form-outline mb-2">
                      {/* <h6>
                        <label className="form-label" for="password">
                          Email
                        </label>
                      </h6> */}
                      <CustomInput
                        // type="email"
                        labelText="Email"
                        // className="form-control form-control-lg mb-4 "
                        // id="email"
                        // value={state.email}
                        // handleChange={handleChange}
                        // aria-describedby="emailHelp"
                        // autoFocus="true"
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

                    <div className="form-outline form-white mb-5">
                      {/* <h6>
                        <label className="form-label" for="password">
                          Password
                        </label>
                      </h6> */}
                      <CustomInput
                        // type="password"
                        labelText="Password"
                        // className="form-control form-control-lg mb-5"
                        // value={state.password}
                        // handleChange={handleChange}
                        // id="password"
                        // autoFocus="true"
                        className={
                          errorState.password.error
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        type="password"
                        id="password"
                        value={state.password}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-3"
                      type="submit"
                      onClick={handleSubmitClick}
                    >
                      {loading ? (
                        <>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          &nbsp; Logging In...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <div>
                    <div id="emailHelp" className="form-text">
                      Don't have an account? Sign Up{" "}
                      <Link to="/signup">here</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- */}
    </>
  );
};

export default Login;
