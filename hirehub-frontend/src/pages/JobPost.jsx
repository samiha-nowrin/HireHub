import React, { useState } from 'react';
import './JobPost.css';

function JobPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You must log in first.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          company,
          location,
          salary: Number(salary),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Job posted successfully.');
        setTitle('');
        setDescription('');
        setCompany('');
        setLocation('');
        setSalary('');
      } else {
        setMessage(data.message || 'Failed to post job.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="jobpost-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handlePost}>
        <label>Job Title</label>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label>Job Description</label>
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <label>Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />

        <label>Salary in Tk (optional)</label>
        <input
          type="number"
          placeholder="Salary in Tk"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />

        <button type="submit">Post Job</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default JobPost;
