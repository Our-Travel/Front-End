import React from 'react';
import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <nav>네비게이션</nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
