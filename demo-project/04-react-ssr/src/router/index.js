import React from 'react';
import Aboutt from '../pages/About';
import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <Aboutt />
  }
]

export default routes