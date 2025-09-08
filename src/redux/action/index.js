// For Add Item to Cart
export const addCart = (product) => {
	return {
		type: "ADDITEM",
		payload: product,
	};
};

// For Delete Item to Cart
export const delCart = (product) => {
	return {
		type: "DELITEM",
		payload: product,
	};
};

// For User Authentication
export const loginUser = (user) => {
	return {
		type: "LOGIN_USER",
		payload: user,
	};
};

export const logoutUser = () => {
	return {
		type: "LOGOUT_USER",
	};
};

export const registerUser = (user) => {
	return {
		type: "REGISTER_USER",
		payload: user,
	};
};
