// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from '../services/axios'; // using your configured axios instance

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs/all-jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>All Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job._id}>
              <strong>{job.company}</strong> - {job.position} ({job.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
