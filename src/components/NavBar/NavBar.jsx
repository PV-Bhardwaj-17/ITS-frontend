import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NavBar = ({ facultyInfo }) => {
    const [showProfile, setShowProfile] = useState(false); // State to toggle profile details
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Navigate back to the login page
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navLeft}>
                Faculty Dashboard
            </div>
            <div className={styles.navRight}>
                {/* Email - Click to toggle profile details */}
                <p
                    className={styles.profileToggle}
                    onClick={() => setShowProfile(!showProfile)} // Toggle profile visibility
                >
                    {facultyInfo.email || "faculty@example.com"}
                    <span className={styles.arrowIcon}>
                        {showProfile ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                </p>
                {/* Profile Details Dropdown */}
                {showProfile && (
                    <div className={styles.profileDropdown}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td>{facultyInfo.name || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Internship Domain</strong></td>
                                    <td>{facultyInfo.internshipDomain || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td><strong>College</strong></td>
                                    <td>{facultyInfo.college || "Not Available"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mobile</strong></td>
                                    <td>{facultyInfo.mobile || "Not Available"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;