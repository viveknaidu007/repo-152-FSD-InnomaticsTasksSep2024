// src/pages/EditStudent.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { updateStudent } from '../redux/studentSlice';

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.list);

  // Find the student to edit
  const student = students.find((student) => student.id === Number(id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        age: student.age,
        class: student.class,
        address: student.address || '',
        phone: student.phone || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id, ...formData })); // Dispatch the update action
    navigate('/students'); // Redirect after successful update
  };

  if (!student) {
    return <p>Student not found!</p>;
  }

  return (
    <Container>
      <h2>Edit Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="class">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditStudent;
