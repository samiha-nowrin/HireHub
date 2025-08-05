import React, { useEffect, useState } from 'react';
import './JobSearch.css';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="jobsearch-container">
      <h2>Search Jobs</h2>
      <input
        className="jobsearch-input"
        type="text"
        placeholder="Search by job title"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="job-list">
        {filteredJobs.map(job => (
          <li key={job._id} className="job-item">
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Company:</strong> {job.company || 'N/A'}</p>
            <p><strong>Location:</strong> {job.location || 'N/A'}</p>
            <p><strong>Salary:</strong> {job.salary ? `Tk ${job.salary}` : 'N/A'}</p>
            <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobSearch;
