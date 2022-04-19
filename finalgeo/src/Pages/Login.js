import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { AuthContext } from "../Contexts/Context/AuthContext";
import CustomInput from "../UI/CustomInput";
import "./Login.css";

export default function Login() {
  //const { login, isAuthenticated } = useContext(AuthContext);
  //const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value, //object keeps updating as we keep typing
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    // login(state.email, state.password).then((response) => {
    //   console.log(response);
    //   if (response.data.message === "Login Successful") {
    //     navigate("/home");
    //     isAuthenticated = true;
    //   } else {
    //     alert(response.data.message);
    //   }
    // });
    if (state.email == "") {
      alert("Enter the Email");
    } else if (!validateEmail(state.email)) {
      alert("Email is invalid");
    } else if (state.password == "") {
      alert("Enter the Password");
    }
    // else if (!validatePassword(state.password)) {
    //   alert("Password should be atleast 8 characters");
    // }
    else {
      await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }).then((req, res) => {
        console.log(res);
      });
      console.log(state);
    }
  };

  // if (localStorage.getItem("user")) {
  //   return <Navigate replace to="/home" />;
  // }

  return (
    <>
      {/* {isAuthenticated.toString()}
        <br />
        {state.email + " " + state.password}
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={state.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={state.password}
            onChange={handleChange}
            id="password"
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        <br /> */}
      {/* <button className="btn btn-primary" onClick={logout}>
        Logout
      </button> */}
      {/* <div id="emailHelp" className="form-text">
          Don't have an account? Sign Up <Link to="/signup">here</Link>
        </div> */}
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
                        type="email"
                        labelText="Email"
                        className="form-control form-control-lg mb-4 "
                        id="email"
                        value={state.email}
                        handleChange={handleChange}
                        aria-describedby="emailHelp"
                        autoFocus="true"
                      />
                    </div>

                    <div className="form-outline form-white mb-5">
                      {/* <h6>
                        <label className="form-label" for="password">
                          Password
                        </label>
                      </h6> */}
                      <CustomInput
                        type="password"
                        labelText="Password"
                        className="form-control form-control-lg mb-5"
                        value={state.password}
                        handleChange={handleChange}
                        id="password"
                        autoFocus="true"
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-3"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
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
}
