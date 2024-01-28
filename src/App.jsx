import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Password from './Pages/Password';
import Profile from './Pages/Profile';
import SignUp from './Pages/SignUp';
function App() {


  return (
    <div>
      <Routes>
        <Route index path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/ForgotPassword' element={<Password/>} />
      </Routes>
    </div>


  );
}

export default App
