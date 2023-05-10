import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';

const Main = () => {
  return (
    <>
      <div>메인 페이지</div>
      <Navigation />
    </>
  );
};

export default Main;
