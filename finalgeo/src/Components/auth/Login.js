import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "../../Assets/css/Login.css";
import { AuthContext } from "../../Contexts/AuthContext";

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
			<div className="vh-auto wh-auto gradient-custom">
				<div className="container mt-4">
					<div className="row align-items-center">
						<div className="col text-center">
							<img
								src="https://giffiles.alphacoders.com/137/137438.gif"
								style={{ width: "60%" }}
							/>
						</div>
						<div className="col">
							<div className="card">
								<div className="card-body">
									<form>
										<legend>Login</legend>
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												Email Address
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
											<label htmlFor="password" class="form-label">
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
														&nbsp; Logging In...
													</>
												) : (
													"Login"
												)}
											</button>
										</center>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
