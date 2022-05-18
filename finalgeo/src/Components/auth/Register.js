import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

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
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <img
              src="https://animewallz.com/wp-content/uploads/2022/04/Anime-Landscape-Laptop-Wallpaper.jpg"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <form>
                  <legend>Register</legend>
                  <div className="mb-3">
                    <label for="email" className="form-label">
                      Email address
                    </label>
                    <input
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
                    <div className="invalid-feedback">
                      <small>{errorState.email["msg"]}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="name" className="form-label">
                      Name
                    </label>
                    <input
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
                  <div className="mb-3">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
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

                    <div className="invalid-feedback">
                      <small>{errorState.password["msg"]}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="cpassword" class="form-label">
                      Password
                    </label>
                    <input
                      className={
                        errorState.cpassword.error
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="password"
                      id="cpassword"
                      value={state.cpassword}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">
                      <small>{errorState.cpassword["msg"]}</small>
                    </div>
                  </div>
                  <center>
                    <button
                      onClick={handleSubmitClick}
                      className="btn btn-primary"
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
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
