// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ServiceDetail from './components/ServiceDetail';
import NotFound from './components/error';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />}>
            <Route path="design" element={<ServiceDetail service="Design" />} />
            <Route path="development" element={<ServiceDetail service="Development" />} />
          </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  );
};

export default App;