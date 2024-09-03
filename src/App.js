import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Aboutus from './Components/About/Aboutus';
import Homepage from './Components/Home/Homepage';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup/Signup';
import MainProfile from './Components/UserProfile/MainProfile';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/profile" element={<MainProfile />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
