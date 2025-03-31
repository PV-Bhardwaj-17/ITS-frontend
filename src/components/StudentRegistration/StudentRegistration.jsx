import React, { useState } from "react";
import { validate } from "../../helpers/Validator";
import styles from "./StudentRegistration.module.css";

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        address: "",
        email: "",
        internshipDomain: "Web",
        college: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [apiMessage, setApiMessage] = useState("");

    const handleApiMessage = (message) => {
        setApiMessage(message);
        setTimeout(() => {
            setApiMessage(""); // Clear the message after 5 seconds
        }, 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({});
        setApiMessage("");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (validate(formData, setErrors)) {
            try {
                const response = await fetch("http://localhost:5000/students", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.status === 201) {
                    setApiMessage("Registration is successful!");
                    setFormData({
                        name: "",
                        mobile: "",
                        address: "",
                        email: "",
                        internshipDomain: "Web",
                        college: "",
                        password: "",
                    });
                    setErrors({});
                } else {
                    const errorData = await response.json();
                    handleApiMessage(`Registration failed: ${errorData.message || "Unknown error"}`);
                }
            } catch (error) {
                handleApiMessage(`Registration failed: ${error.message}`);
            }
        }
    };

    return (
        <div className={styles.container}>
            {apiMessage && (
                <div className={styles.apiMessage}>
                    {apiMessage}
                </div>
            )}
            <h2 className={styles.heading}>Student Registration</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <p className={styles.error}>{errors.address}</p>}
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
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="internshipDomain">Internship Domain</label>
                    <select
                        id="internshipDomain"
                        name="internshipDomain"
                        value={formData.internshipDomain}
                        onChange={handleChange}
                    >
                        <option value="Web">Web</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="college">College</label>
                    <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                    />
                    {errors.college && <p className={styles.error}>{errors.college}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Create Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default StudentRegistration;