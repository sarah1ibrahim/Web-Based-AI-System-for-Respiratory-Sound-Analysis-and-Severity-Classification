// src/components/Progress.js
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Progress() {
  const [history, setHistory] = useState([]);
  const [trends, setTrends] = useState([]);
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy data for history (Past Results table)
    const dummyHistory = [
      { _id: '1', created_at: '2025-04-01T10:00:00Z', diagnosis: 'COPD', severity: 'Severe' },
      { _id: '2', created_at: '2025-04-08T10:00:00Z', diagnosis: 'COPD', severity: 'Moderate' },
      { _id: '3', created_at: '2025-04-16T10:00:00Z', diagnosis: 'COPD', severity: 'Moderate' },
      { _id: '4', created_at: '2025-04-23T10:00:00Z', diagnosis: 'COPD', severity: 'Moderate' },
      { _id: '5', created_at: '2025-04-30T10:00:00Z', diagnosis: 'COPD', severity: 'Mild' },
    ];

    // Dummy data for trends (Severity Trends chart)
    const dummyTrends = {
      // daily: [
      //   { _id: '2025-04-01', severity: 'Severe' },
      //   { _id: '2025-04-08', severity: 'Moderate' },
      //   { _id: '2025-04-016', severity: 'Moderate' },
      //   { _id: '2025-04-23', severity: 'Moderate' },
      //   { _id: '2025-04-30', severity: 'Mild' },
      // ],
      weekly:  [
        { _id: '2025-04-01', severity: 'Severe' },
        { _id: '2025-04-08', severity: 'Moderate' },
        { _id: '2025-04-016', severity: 'Moderate' },
        { _id: '2025-04-23', severity: 'Moderate' },
        { _id: '2025-04-30', severity: 'Mild' },
      ],
      monthly: [
        { _id: '2025-03-016', severity: 'Mild' },
        { _id: '2025-03-23', severity: 'Moderate' },
        { _id: '2025-03-30', severity: 'Mild' },
        { _id: '2025-04-01', severity: 'Severe' },
        { _id: '2025-04-08', severity: 'Moderate' },
        { _id: '2025-04-016', severity: 'Moderate' },
        { _id: '2025-04-23', severity: 'Moderate' },
        { _id: '2025-04-30', severity: 'Mild' },
      ],
    };

    // Simulate fetching data
    setHistory(dummyHistory);
    setTrends(dummyTrends[period] || []);
    setLoading(false);
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setLoading(true);
  };

  const trendData = {
    labels: trends.map(trend => trend._id),
    datasets: [
      {
        label: 'Severity',
        data: trends.map(trend => {
          if (trend.severity === 'Mild') return 1;
          if (trend.severity === 'Moderate') return 2;
          if (trend.severity === 'Severe') return 3;
          return 0;
        }),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-wrapper" style={{marginTop:50}}>
      <section className="progress-section">
        <h2>Progress & Tracking</h2>
        <div className="mb-4">
          <label htmlFor="periodSelect" className="form-label">View Trends By: </label>
          <select id="periodSelect" className="form-select w-auto d-inline-block ml-2" value={period} onChange={handlePeriodChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h5>Severity Trends</h5>
            <Line data={trendData} />
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5>Past Results</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {history.map(record => (
                  <tr key={record._id}>
                    <td>{new Date(record.created_at).toLocaleDateString()}</td>
                    <td>{record.diagnosis || 'N/A'}</td>
                    <td>{record.severity || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Progress;