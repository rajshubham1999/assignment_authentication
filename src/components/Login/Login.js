import React, { useEffect, useState } from 'react';
 import { useNavigate } from 'react-router-dom';
import './Login.css';
import { LoginUser } from '../../apicalls/users.js'
import { message } from 'antd'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
   const navigate = useNavigate();

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); 
    } 
  
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      
      console.log('Login successful', formData);
      try{
        const response = await LoginUser(formData);
        console.log("response=>",response)
        if(response.success){
          message.success(response.message);
          localStorage.setItem('token', response.data);
          navigate('/');
        }
        else{
          message.error(response.message);
          console.log(response.message)
        }
      }catch(err){
        message.error(err);
      }

    }
  };

  return (
    <div className="login-container">
      <h2>Welcome! Login Here</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <div className="form-footer">
          <button type="submit" className="submit-button">Login</button>
          <p className="register-link" onClick={() => navigate('/register')}>
            Don't have an account? Register here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
