import React from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import FacultyDashboard from "./FacultyDashboard/FacultyDashboard";
import TaskDashboard from "./TaskDashboard/TaskDashboard";
import styles from "./AdminUser.module.css";

const AdminUser = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Navigate back to the login page
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link to="/adminUser/dashboard">Dashboard</Link></li>
                    <li className={styles.navItem}><Link to="/adminUser/students">Students</Link></li>
                    <li className={styles.navItem}><Link to="/adminUser/faculties">Faculties</Link></li>
                    <li className={styles.navItem}><Link to="/adminUser/tasks">Tasks</Link></li>
                </ul>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Log Out
                </button>
            </nav>
            <div className={styles.content}>
                <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="students" element={<StudentDashboard />} />
                    <Route path="faculties" element={<FacultyDashboard />} />
                    <Route path="tasks" element={<TaskDashboard />} />
                    <Route path="*" element={<AdminDashboard />} /> {/* Default route */}
                </Routes>
            </div>
        </div>
    );
};

export default AdminUser;