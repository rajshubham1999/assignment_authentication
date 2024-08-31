
import React, { useEffect, useState } from 'react';
import './Home.css';
import { GetCurrentUser, ChangePassword } from '../../apicalls/users';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const response = await ChangePassword({ email, newPassword });
      if (response.success) {
        setError('');
        alert(response.message); // You might want to use a better alert or notification system
        setShowModal(false);

      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred while changing the password.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const userResponse = await GetCurrentUser();
      if (userResponse.success) {
        setEmail(userResponse.data.email);
      } else {
        console.error("Error fetching user:", userResponse.message);
      }
    } catch (err) {
      console.error("Error fetching user:", err.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Home Page</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={() => setShowModal(true)} className="reset-password-button">Reset Password</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-button" onClick={() => setShowModal(false)}>X</button>
            <h2>Reset Password</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              readOnly
              className="modal-input"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="modal-input"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleResetPassword} className="change-password-button" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
