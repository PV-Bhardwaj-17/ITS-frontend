import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Student", // Default role
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const { email } = data;

                if (formData.role === "Admin") {
                    navigate("/adminUser");
                } else if (formData.role === "Faculty") {
                    navigate("/facultyUser");
                } else if (formData.role === "Student") {
                    navigate("/studentUser");
                } else {
                    setErrorMessage("Invalid role received from the server.");
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Login</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="role">Select role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button type="submit" className={styles.submitButton}>
                    Login
                </button>
            </form>
            <div className={styles.registrationLinks}>
                <p>
                    New here? <Link to="/studentRegistration">Register as Student</Link> or <Link to="/facultyRegistration">Register as Faculty</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;