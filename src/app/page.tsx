'use client';
import React from 'react';
import { useState } from 'react';
import HomePage from './Home';

export default function Home() {
  // let isLogin = true;

  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(true);
  };

  return (
    <>
      <HomePage />
    </>
  );
}
