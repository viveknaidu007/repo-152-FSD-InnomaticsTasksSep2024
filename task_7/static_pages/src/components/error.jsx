// src/components/error.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
<div class="container mt-5 text-center">
    <h1 class="display-1 fw-bold text-danger">404</h1>
    <h2 class="fw-bold">Page Not Found</h2>
    <p class="lead">The page does not exist.</p>
    <p>is temporarily unavailable.</p>
    <NavLink className="btn btn-danger btn-lg mt-4" to="/" exact activeClassName="active">Go to Homepage</NavLink>
</div>
    </div>
  );
};

export default NotFound;