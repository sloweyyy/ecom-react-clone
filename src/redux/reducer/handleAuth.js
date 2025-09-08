/**
 * Authentication Reducer for React E-commerce App
 *
 * Features implemented:
 * - User registration with validation
 * - User login with credential verification
 * - Logout functionality
 * - Persistent authentication state via localStorage
 * - Demo user account (email: demo@example.com, password: demo123)
 * - Protected routes (checkout requires authentication)
 *
 * Mock functionality:
 * - All user data is stored in localStorage (no real backend)
 * - Simple password storage (in real app, passwords would be hashed)
 * - Simulated API delays for better UX demonstration
 */

// Retrieve initial auth state from localStorage if available
const getInitialAuth = () => {
	const storedUser = localStorage.getItem("user");
	const defaultState = {
		isAuthenticated: false,
		user: null,
		users: [
			{
				id: 1,
				name: "Demo User",
				email: "demo@example.com",
				password: "demo123",
				createdAt: new Date().toISOString(),
			},
		],
		error: null,
	};

	if (storedUser) {
		const parsed = JSON.parse(storedUser);
		// Ensure demo user exists in stored data
		if (!parsed.users.find((user) => user.email === "demo@example.com")) {
			parsed.users.push(defaultState.users[0]);
		}
		return parsed;
	}

	return defaultState;
};

const handleAuth = (state = getInitialAuth(), action) => {
	let updatedState;

	switch (action.type) {
		case "REGISTER_USER":
			const newUser = {
				id: Date.now(), // Simple ID generation for mocking
				name: action.payload.name,
				email: action.payload.email,
				password: action.payload.password, // In real app, this would be hashed
				createdAt: new Date().toISOString(),
			};

			// Check if user already exists
			const existingUser = state.users.find(
				(user) => user.email === newUser.email
			);
			if (existingUser) {
				return { ...state, error: "User already exists with this email" };
			}

			updatedState = {
				...state,
				users: [...state.users, newUser],
				isAuthenticated: true,
				user: { id: newUser.id, name: newUser.name, email: newUser.email },
				error: null,
			};

			localStorage.setItem("user", JSON.stringify(updatedState));
			return updatedState;

		case "LOGIN_USER":
			const { email, password } = action.payload;

			// Find user in stored users
			const foundUser = state.users.find(
				(user) => user.email === email && user.password === password
			);

			if (!foundUser) {
				return { ...state, error: "Invalid email or password" };
			}

			updatedState = {
				...state,
				isAuthenticated: true,
				user: {
					id: foundUser.id,
					name: foundUser.name,
					email: foundUser.email,
				},
				error: null,
			};

			localStorage.setItem("user", JSON.stringify(updatedState));
			return updatedState;

		case "LOGOUT_USER":
			updatedState = {
				...state,
				isAuthenticated: false,
				user: null,
				error: null,
			};

			localStorage.setItem("user", JSON.stringify(updatedState));
			return updatedState;

		default:
			return state;
	}
};

export default handleAuth;
