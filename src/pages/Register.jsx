import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/action";
import toast from "react-hot-toast";
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.handleAuth);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            // Check if user already exists before dispatching
            const storedUser = localStorage.getItem("user");
            let authData = storedUser ? JSON.parse(storedUser) : { users: [] };
            
            const existingUser = authData.users.find(user => user.email === formData.email);
            if (existingUser) {
                toast.error("User already exists with this email");
                setLoading(false);
                return;
            }

            dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }));
            
            toast.success("Registration successful! Welcome!");
            navigate("/"); // Redirect to home page
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        {auth.error && (
                            <div className="alert alert-danger" role="alert">
                                {auth.error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button 
                                    className="my-2 mx-auto btn btn-dark" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register