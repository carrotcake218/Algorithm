import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Blacklist from './pages/Blacklist';
import Laptop from './pages/Laptop';
import Lent from './pages/Lent';
import Student from './pages/Student';
import Data from './pages/Data';
import Help from './pages/Help';
import Report from './pages/Report';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Student" element={<Student />} />
            <Route path="/Blacklist" element={<Blacklist />} />
            <Route path="/Laptop" element={<Laptop />} />
            <Route path="/Lent" element={<Lent />} />
            <Route path="/Data" element={<Data />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
