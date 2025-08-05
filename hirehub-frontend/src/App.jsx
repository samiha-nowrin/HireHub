import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './Register';
import Profile from './pages/Profile';
import JobSearch from './pages/JobSearch';
import JobPost from './pages/JobPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/job-post" element={<JobPost />} />
      </Routes>
    </Router>
  );
}

export default App;
