
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { RegisterUser } from '../../apicalls/users.js';
import { message } from 'antd'; // Assuming you are using antd for messages

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle successful registration here (e.g., send data to server)
      console.log('Form submitted successfully', formData);
      try {
        const response = await RegisterUser(formData);
        if (response.success) {
          message.success(response.message);
          navigate('/login');
          console.log(response.message);
        } else {
          message.error(response.message);
          console.log(response.message);
        }
      } catch (err) {
        message.error(err.message || 'Something went wrong');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Welcome! Register Here</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">Register</button>
          <p className="login-link" onClick={() => navigate('/login')}>
            Already have an account? Log in here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;


