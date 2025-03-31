import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import StudentRegistration from "./components/StudentRegistration/StudentRegistration.jsx";
import FacultyRegistration from "./components/FacultyRegistration/FacultyRegistration.jsx";
import AdminUser from "./components/AdminUser/AdminUser.jsx";
import FacultyUser from "./components/FacultyUser/FacultyUser.jsx";
import StudentUser from "./components/StudentUser/StudentUser.jsx";

function App() {
  const [role, setRole] = useState(null); // State to store the user's role

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={(userRole) => setRole(userRole)} />}
        />
        <Route path="/adminUser/*" element={<AdminUser />} />
        <Route path="/facultyUser" element={<FacultyUser />} />
        <Route path="/studentUser" element={<StudentUser />} />
        <Route path="/studentRegistration" element={<StudentRegistration />} />
        <Route path="/facultyRegistration" element={<FacultyRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;