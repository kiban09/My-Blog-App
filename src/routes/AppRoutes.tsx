import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Trash from '../pages/Trash';
import Home from '../pages/Home';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trash" element={
        <ProtectedRoute>
          <Trash />
        </ProtectedRoute>
      } />
      <Route path="/home" element={ 
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
