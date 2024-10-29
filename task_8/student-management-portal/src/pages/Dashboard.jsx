// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css'

const Dashboard = () => {
  // Get the total number of students from the Redux store
  const studentCount = useSelector((state) => state.students.list.length);

  return (
    <div className="text-center mt-5" >
      <h2 className="text-center text-info-emphasis my-4 glow">Student Management Portal</h2>
      <p>
        <Link to="/register" className="btn btn-info m-3">Register New Student</Link>
        <Link to="/students" className="btn btn-success m-2">View Student List</Link>
      </p>
      <h4>Total Students Registered: {studentCount}</h4> {/* Display student count */}
    </div>
  );
};

export default Dashboard;
