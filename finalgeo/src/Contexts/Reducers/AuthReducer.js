const AuthReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};

		case "LOAD_USER":
			return {
				...state,
				token: JSON.parse(localStorage.getItem("token")),
				user: JSON.parse(localStorage.getItem("user")),
				isAuthenticated: true,
				loading: false,
			};

		case "SU_SUCCESS":
		case "LOGIN_SUCCESS":
			localStorage.setItem("token", JSON.stringify(action.payload.token));
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			return {
				...state,
				token: action.payload.token,
				user: action.payload.user,
				isAuthenticated: true,
				loading: false,
			};

		case "SU_FAIL":
		case "AUTH_ERROR":
		case "LOGIN_FAIL":
		case "LOGOUT":
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};

		default:
			return state;
	}
};

export default AuthReducer;
