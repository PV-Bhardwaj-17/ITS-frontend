import React, { useEffect, useState } from "react";
import styles from "./FacultyDashboard.module.css";

const FacultyDashboard = () => {
    const [faculties, setFaculties] = useState([]); // State to store faculties data
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch faculties data from the API
        const fetchFaculties = async () => {
            try {
                const response = await fetch("http://localhost:5000/faculties"); // Replace with your API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch faculties data");
                }
                const data = await response.json();
                setFaculties(data); // Set the fetched faculties data
            } catch (err) {
                setError(err.message); // Handle errors
            }
        };

        fetchFaculties();
    }, []);

    // Handle Delete Student
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/faculties/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete faculty");
            }
            setFaculties((prevStudents) => prevStudents.filter((faculty) => faculty.id !== id)); // Remove faculty from state
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle Activate/Deactivate Student
    const handleToggleStatus = async (id, currentStatus) => {
        const action = currentStatus === 0 ? "activate" : "deactivate"; // Determine action
        try {
            const response = await fetch(`http://localhost:5000/faculties/${id}/toggle-active`, {
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error(`Failed to ${action} faculty`);
            }
            setFaculties((prevStudents) =>
                prevStudents.map((faculty) =>
                    faculty.id === id ? { ...faculty, isActive: currentStatus === 0 ? 1 : 0 } : faculty
                )
            ); // Update faculty's status in state
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>FACULTY INFORMATION</h2>
            {error && <p className={styles.error}>{error}</p>} {/* Display error if any */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>College</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.length > 0 ? (
                        faculties.map((faculty) => (
                            <tr key={faculty.id}>
                                <td>{faculty.name}</td>
                                <td>{faculty.email}</td>
                                <td>{faculty.address}</td>
                                <td>{faculty.college}</td>
                                <td className={faculty.isActive === 0 ? styles.inactive : styles.active}>
                                    {faculty.isActive === 0 ? "INACTIVE" : "ACTIVE"}
                                </td>
                                <td>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(faculty.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${faculty.isActive === 0 ? styles.activateButton : styles.deactivateButton
                                            }`}
                                        onClick={() => handleToggleStatus(faculty.id, faculty.isActive)}
                                    >
                                        {faculty.isActive === 0 ? "Activate" : "Deactivate"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className={styles.noData}>
                                No faculties found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyDashboard;