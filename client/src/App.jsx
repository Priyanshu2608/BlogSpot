import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRouter from './components/PrivateRouter';

const AppWrapper = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/signup', '/signin'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRouter/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/project" element={<Project />} />
        
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
