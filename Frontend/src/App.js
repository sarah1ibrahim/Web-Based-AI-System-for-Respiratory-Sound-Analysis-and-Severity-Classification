// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import RecordingPage from './pages/RecordingPage';
import ResultsPage from './pages/ResultsPage';
import ProgressPage from './pages/ProgressPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-0">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/record-upload" element={<RecordingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <div >
        <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;