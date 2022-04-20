import React, { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import './scss/styles.scss'
import Home from './components/home'
import Navbar from './components/navbar'
import Dashboard from './components/dashboard';
import MarketData from './components/marketData/marketData'
import Footer from './components/footer'
import { apiURL } from './components/config'
import { UsersApp } from './components/users/users';
import { RegisterForm } from './components/users/registerForm'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['cookies'])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    removeCookie('access_token')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn)
    if ('access_token' in cookies) {
        if (cookies.access_token !== 'removed') {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false )
        }
    }

    fetch(apiURL + '/api/alpaca/CSRF/',
    {
      'mode':'cors',
      'credentials':'include',
      headers: {
          'Content-Type':'application/json'
      }
    })
  })

  return(
    <div className="app">
      <CookiesProvider>
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />

          <Routes>
            <Route path="/project08/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/project08/users/register" element={<RegisterForm />} />
            <Route path="/project08/users" element={<UsersApp isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
            <Route path="/project08/market" element={<MarketData />} />
            <Route path="/project08/home" element={<Home />} />
            <Route path="/project08/" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  )
}

export default withCookies(App);