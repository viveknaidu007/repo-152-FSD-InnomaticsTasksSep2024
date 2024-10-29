// src/pages/StudentList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Pagination, Container, Form } from 'react-bootstrap';
import { deleteStudent, updateStudent, addStudent } from '../redux/studentSlice';

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sortOrder, setSortOrder] = useState('name'); // default sorting by name

  const studentsPerPage = 5;

  // Calculate indices for current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  // Filter, sort, and paginate students
  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass ? student.class === selectedClass : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.class.localeCompare(b.class);
      }
    });

  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete handler
  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  // Update handler - modify this based on how you want to update the student
  const handleUpdate = (id) => {
    // Logic for updating a student, this function is just a placeholder
    dispatch(updateStudent(id)); 
  };

  // Add handler - modify this based on how you want to add a new student
  const handleAdd = (studentData) => {
    // Logic for adding a student, this function is just a placeholder
    dispatch(addStudent(studentData));
  };

  return (
    <Container className="mt-4">
      <h3>Student List</h3>

      {/* Search and Filter Section */}
      <Form.Group controlId="search" className="mb-3">
        <Form.Control 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="classFilter" className="mb-3">
        <Form.Label>Filter by Class</Form.Label>
        <Form.Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All Classes</option>
          <option value="10th Grade">10th Grade</option>
          <option value="11th Grade">11th Grade</option>
          <option value="12th Grade">12th Grade</option>
          {/* Add more classes as needed */}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="sortOrder" className="mb-3">
        <Form.Label>Sort by</Form.Label>
        <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="name">Name</option>
          <option value="class">Class</option>
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email || 'N/A'}</td>
              <td>{student.course || 'N/A'}</td>
              <td>{student.class || 'N/A'}</td>
              <td>
                <Link to={`/students/${student.id}`} className="btn btn-info btn-sm">View</Link>{' '}
                <Link to={`/edit/${student.id}`} className="btn btn-warning btn-sm">Edit</Link>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default StudentList;
