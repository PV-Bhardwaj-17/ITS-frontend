import React, { useEffect, useState } from "react";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
    const [students, setStudents] = useState([]); // State to store students data
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch students data from the API
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/students"); // Replace with your API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch students data");
                }
                const data = await response.json();
                setStudents(data); // Set the fetched students data
            } catch (err) {
                setError(err.message); // Handle errors
            }
        };

        fetchStudents();
    }, []);

    // Handle Delete Student
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/students/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete student");
            }
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id)); // Remove student from state
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle Activate/Deactivate Student
    const handleToggleStatus = async (id, currentStatus) => {
        const action = currentStatus === 0 ? "activate" : "deactivate"; // Determine action
        try {
            const response = await fetch(`http://localhost:5000/students/${id}/toggle-active`, {
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error(`Failed to ${action} student`);
            }
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === id ? { ...student, isActive: currentStatus === 0 ? 1 : 0 } : student
                )
            ); // Update student's status in state
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>STUDENTS INFORMATION</h2>
            {error && <p className={styles.error}>{error}</p>} {/* Display error if any */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Internship Domain</th>
                        <th>College</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.address}</td>
                                <td>{student.internshipDomain}</td>
                                <td>{student.college}</td>
                                <td className={student.isActive === 0 ? styles.inactive : styles.active}>
                                    {student.isActive === 0 ? "INACTIVE" : "ACTIVE"}
                                </td>
                                <td>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${student.isActive === 0 ? styles.activateButton : styles.deactivateButton
                                            }`}
                                        onClick={() => handleToggleStatus(student.id, student.isActive)}
                                    >
                                        {student.isActive === 0 ? "Activate" : "Deactivate"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className={styles.noData}>
                                No students found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;