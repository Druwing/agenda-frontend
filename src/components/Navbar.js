import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      </div>
    </nav>
  );
}

export default Navbar;