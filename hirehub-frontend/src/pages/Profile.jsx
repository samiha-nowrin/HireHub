import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must login first.');
        setMessageType('error');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setProfile(data);
          setSkills(data.skills ? data.skills.join(', ') : '');
          setExperience(data.experience || '');
          setMessage('');
          setMessageType('');
        } else {
          setMessage(data.message || 'Failed to fetch profile');
          setMessageType('error');
        }
      } catch (error) {
        setMessage('Error fetching profile: ' + error.message);
        setMessageType('error');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must login first.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skills: skills.split(',').map(s => s.trim()),
          experience,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully');
        setMessageType('success');
        setProfile(data);
      } else {
        setMessage(data.message || 'Failed to update profile');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
      setMessageType('error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!profile) {
    return <div className="profile-loading">{message || 'Loading...'}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>

      <form onSubmit={handleUpdate}>
        <label>Skills (comma separated):</label>
        <input
          type="text"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="e.g. JavaScript, React"
        />
        <label>Experience:</label>
        <textarea
          value={experience}
          onChange={e => setExperience(e.target.value)}
          placeholder="Describe your experience"
        />
        <button type="submit">Update Profile</button>
      </form>

      {message && (
        <p className={`message ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
