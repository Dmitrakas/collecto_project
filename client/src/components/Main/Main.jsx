import React from 'react';
import { useSelector } from 'react-redux';

export default function Main() {
  const isAuth = useSelector((state) => state.isAuth);

  return (
    <div>
      <p>isAuth: {isAuth ? 'true' : 'false'}</p>
      <p>User ID : {localStorage.getItem('userId')}</p>
    </div>
  );
}
