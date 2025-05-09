import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Header from './components/Header'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
<Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/project" element={<Project/>} />
</Routes>
</BrowserRouter>

  )
}

export default App
