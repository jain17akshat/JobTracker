import { useEffect, useState } from 'react';
import axios from '../services/axios';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs/all-jobs');
        setJobs(res.data);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.position}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500 mt-2">Location: {job.location}</p>
            <p className="text-sm text-gray-500">Status: {job.status}</p>
            <p className="text-sm text-gray-500">Type: {job.jobType}</p>
            <p className="text-xs text-gray-400 mt-2">Job ID: {job.jobId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
