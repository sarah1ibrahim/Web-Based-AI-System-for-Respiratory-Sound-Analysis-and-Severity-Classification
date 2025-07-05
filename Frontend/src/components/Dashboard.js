import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DashboardPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const totalStats = [
    { label: 'Respiratory Wellness', value: 'Stable', unit: '' },
    { label: 'Breathing Rate', value: 16, unit: 'breaths/min' },
    { label: 'Exercise Duration', value: 30, unit: 'min' },
  ];

  const progressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Breathing Rate (breaths/min)',
        data: [18, 17.5, 17, 16.5, 16.5, 16, 16], // Interpolated from 18 (Severe) to 16 (Mild)
        borderColor: '#6B48FF',
        backgroundColor: 'rgba(107, 72, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Exercise Duration (min)',
        data: [25, 26, 27, 28, 29, 29.5, 30], // Interpolated from 25 (Severe) to 30 (Mild)
        borderColor: '#FF6584',
        backgroundColor: 'rgba(255, 101, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Severity (3=Severe, 2=Moderate, 1=Mild)',
        data: [3, 2.5, 2, 2, 1.5, 1.5, 1], // Interpolated from Severe (3) to Mild (1)
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const recentDiagnoses = [
    { date: '2025-04-01', diagnosis: 'COPD', severity: 'Severe' },
    { date: '2025-04-15', diagnosis: 'COPD', severity: 'Moderate' },
    { date: '2025-04-30', diagnosis: 'COPD', severity: 'Mild' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content" style={{ marginTop: 70 }}>
        <section className="dashboard-section">
          <h2>Total Stats</h2>
          <div className="stats-grid">
            {totalStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h5>{stat.label}</h5>
                <p className="stat-value">{stat.value} {stat.unit}</p>
              </div>
            ))}
          </div>

          <div className="row mt-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h5>Progress and Tracking</h5>
                  <Line data={progressData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>Recent Diagnoses</h5>
                  <ul className="diagnoses-list">
                    {recentDiagnoses.map((record, index) => (
                      <li key={index} className="diagnosis-item">
                        <div>
                          <strong>{record.date}</strong>
                          <p>{record.diagnosis} - {record.severity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;