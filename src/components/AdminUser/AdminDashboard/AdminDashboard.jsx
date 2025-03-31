import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeStudents, setActiveStudents] = useState(0);
    const [inactiveStudents, setInactiveStudents] = useState(0);
    const [activeFaculties, setActiveFaculties] = useState(0);
    const [inactiveFaculties, setInactiveFaculties] = useState(0);
    const [collegeBasedFaculties, setCollegeBasedFaculties] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://localhost:5000/admin/dashboard");
                const data = await response.json();

                setStudents(data.students);
                setFaculties(data.faculties);
                setTasks(data.tasks);

                setActiveStudents(data.students.filter(student => student.isActive === 1).length)
                setInactiveStudents(data.students.filter(student => student.isActive === 0).length)
                setActiveFaculties(data.faculties.filter(faculty => faculty.isActive === 1).length)
                setInactiveFaculties(data.faculties.filter(faculty => faculty.isActive === 0).length)

                const distinctColleges = [...new Set(data.faculties.map(faculty => faculty.college))];
                const collegeBasedNoOfFaculties = distinctColleges.map(college => [
                    college,
                    data.faculties.filter(faculty => faculty.college === college).length
                ]);
                setCollegeBasedFaculties(collegeBasedNoOfFaculties);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const activeInactiveStudentChartData = [
        ["Active", "Status", { role: "style" }],
        ["Active", activeStudents, "green"],
        ["In-Active", inactiveStudents, "red"]
    ]

    const activeInactiveStudentChartOptions = {
        title: "STUDENT ACTIVE STATUS",
        titleTextStyle: {
            fontSize: 30,
            bold: true,
            color: "#333",
        },
        vAxis: {
            title: "Number of Students",
            viewWindow: {
                min: 0,
            },
            format: "0",
        },
        hAxis: {
            title: "Active",
        },
        legend: "none",
    };

    const activeInactiveFacultyChartData = [
        ["Active", "Status", { role: "style" }],
        ["Active", activeFaculties, "green"],
        ["In-Active", inactiveFaculties, "red"]
    ]

    const activeInactiveFacultyChartOptions = {
        title: "FACULTY ACTIVE STATUS",
        titleTextStyle: {
            fontSize: 30,
            bold: true,
            color: "#333",
        },
        vAxis: {
            title: "Number of Faculties",
            viewWindow: {
                min: 0,
            },
            format: "0",
        },
        hAxis: {
            title: "Active",
        },
        legend: "none",
    };

    const domainBasedStudentChartData = [
        ["Domain", "Number of Students"],
        ["Web", students.filter(student => student.internshipDomain === "Web").length],
        ["AI/ML", students.filter(student => student.internshipDomain === "AI/ML").length],
        ["Cyber Security", students.filter(student => student.internshipDomain === "Cyber Security").length],
    ];

    const domainBasedStudentChartOptions = {
        legend: "none",
        pieSliceText: "label",
        title: "DOMAINWISE STUDENTS",
        pieStartAngle: 100,
        titleTextStyle: {
            fontSize: 30,
            bold: true,
            color: "#333",
        },
    };

    const collegeBasedFacultyChartData = [
        ["College", "Number of Faculties"],
        ...collegeBasedFaculties,
    ];

    const collegeBasedFacultyChartOptions = {
        legend: "none",
        pieSliceText: "label",
        title: "COLLEGEWISE FACULTIES",
        pieStartAngle: 100,
        titleTextStyle: {
            fontSize: 30,
            bold: true,
            color: "#333",
        },
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.chartRow}>
                <div className={styles.chartCard}>
                    <Chart
                        chartType="ColumnChart"
                        width="650px"
                        height="500px"
                        data={activeInactiveStudentChartData}
                        options={activeInactiveStudentChartOptions}
                    />
                </div>
                <div className={styles.chartCard}>
                    <Chart
                        chartType="ColumnChart"
                        width="650px"
                        height="500px"
                        data={activeInactiveFacultyChartData}
                        options={activeInactiveFacultyChartOptions}
                    />
                </div>
            </div>
            <div className={styles.chartRow}>
                <div className={styles.chartCard}>
                    <Chart
                        chartType="PieChart"
                        data={domainBasedStudentChartData}
                        options={domainBasedStudentChartOptions}
                        width={"650px"}
                        height={"500px"}
                    />
                </div>
                <div className={styles.chartCard}>
                    <Chart
                        chartType="PieChart"
                        data={collegeBasedFacultyChartData}
                        options={collegeBasedFacultyChartOptions}
                        width={"650px"}
                        height={"500px"}
                    />
                </div>
            </div>
        </div >
    );
};

export default AdminDashboard;