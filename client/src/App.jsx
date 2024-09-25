import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />} >
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}