import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import {Routes,Route,} from "react-router-dom";
import About from './components/About';
import Rwr from './components/Rwr';
import About2 from './components/About2';
import About3 from './components/About3';
import About4 from './components/About4';
import About5 from './components/About5';
import About6 from './components/About6';
import About7 from './components/About7';
import About8 from './components/About8';
import About9 from './components/About9';
import About10 from './components/About10';


const root1 = ReactDOM.createRoot(document.getElementById('root'));
const root2 = ReactDOM.createRoot(document.getElementById('root1'));
root1.render(
  <React.StrictMode>
  <Router>
  <Routes> 
      <Route path="/welcome" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about2" element={<About2 />} />
      <Route path="/about4" element={<About4 />} />
      <Route path="/about5" element={<About5 />} />
      <Route path="/about6" element={<About6 />} />
      <Route path="/about7" element={<About7 />} />
      <Route path="/about8" element={<About8 />} />
      <Route path="/about9" element={<About9 />} />
      <Route path="/about10" element={<About10 />} />
      <Route path="/" element={<App />} />
    </Routes>
    </Router>
  </React.StrictMode>
);

if (root2) {
  root2.render(
    <React.StrictMode>
    <Router>
    <Routes> 
        <Route path="/rwr" element={<Rwr />} />
        <Route path="/about3" element={<About3 />} />
      </Routes>
      </Router>
    </React.StrictMode>
  );
}
