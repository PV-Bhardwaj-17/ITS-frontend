import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import styles from './FacultyUser.module.css';

const FacultyUser = () => {
    const location = useLocation();
    const facultyInfo = location.state || {}; // Retrieve faculty info from state
    const [students, setStudents] = useState([]); // State to store students data
    const [tasks, setTasks] = useState([]); // State to store tasks data
    const [error, setError] = useState(null); // State to handle errors
    const [showTaskForm, setShowTaskForm] = useState(false); // State to toggle task form visibility
    const [newTask, setNewTask] = useState({ name: '', description: '' }); // State for new task data

    // Fetch students and tasks data
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/students?internshipDomain=${facultyInfo.internshipDomain}`);
                if (!response.ok) throw new Error("Failed to fetch students data");
                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tasks?facultyId=${facultyInfo.id}`);
                if (!response.ok) throw new Error("Failed to fetch tasks data");
                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStudents();
        fetchTasks();
    }, [facultyInfo.internshipDomain, facultyInfo.id]);

    // Handle task form submission
    const handleTaskFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    internshipDomain: facultyInfo.internshipDomain,
                    faculty: facultyInfo.name,
                    ...newTask
                }),
            });

            if (!response.ok) throw new Error("Failed to save the task");

            // Fetch updated tasks list
            const updatedResponse = await fetch(`http://localhost:5000/tasks?facultyId=${facultyInfo.id}`);
            if (!updatedResponse.ok) throw new Error("Failed to fetch tasks data");
            const updatedTasks = await updatedResponse.json();
            setTasks(updatedTasks);

            // Reset form and hide
            setNewTask({ name: '', description: '' });
            setShowTaskForm(false);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <NavBar facultyInfo={facultyInfo} />
            <div className={styles.mainContainer}>
                {/* Left Section: Students */}
                <div className={styles.leftSection}>
                    <h2 className={styles.sectionTitle}>{facultyInfo.internshipDomain || "Unknown"} Students</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>College</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.college}</td>
                                        <td>{student.isActive ? "ACTIVE" : "INACTIVE"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className={styles.noData}>No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Right Section: Tasks */}
                <div className={styles.rightSection}>
                    <h2 className={styles.sectionTitle}>Tasks</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Faculty</th>
                                <th>Domain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.faculty}</td>
                                        <td>{task.internshipDomain}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className={styles.noData}>No tasks assigned</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button
                        className={styles.addTaskButton}
                        onClick={() => setShowTaskForm(!showTaskForm)}
                    >
                        Add New Task
                    </button>
                    {showTaskForm && (
                        <form onSubmit={handleTaskFormSubmit} className={styles.taskForm}>
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={newTask.name}
                                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Task Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                required
                            />
                            <button type="submit" className={styles.submitTaskButton}>
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacultyUser;