import { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getItems } from './store/slice/storeSlice.js'
import { restore } from './store/slice/cartSlice.js'
import { AuthContext } from './context/AuthProvider.jsx'
import { ThemeContext } from './context/ThemeProvider.jsx'

import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import User from './pages/User.jsx'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import './App.css'


function App() {

  const location = useLocation();                     // to scroll to top of the page on navigate
  const dispatch = useDispatch();                     // to dispatch store & cart actions on load
  const { restore_login } = useContext(AuthContext);  // to dispatch user actions on load

  const { darkTheme } = useContext(ThemeContext);


  /* on load */
  useEffect(() => {

    /* restore logged user (if any) */
    let logged_user = localStorage.getItem('logged_user');
    if (logged_user)
      restore_login(JSON.parse(logged_user));

    /* retrieve store items */
    dispatch(getItems());

    /* restore cart items (if any) */
    dispatch(restore());
    
  }, []);

  /* on navigate */
  useEffect(() => {

    /* scroll to top of the page (React has an annoying habit of NOT scrolling to top when navigating pages.
      Seriously, who decided that scroll should be left as it is when navigating? Who !?) */
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  }, [location.pathname])


  return (
    <div id='main' className={ darkTheme ? 'theme-dark' : 'theme-light'}>
      <Header />

      {/* header has a fixed position (as opposed to sticky) to prevent the body from overflowing because of the minicart
        hence the added empty element here, it has the same height as the header (i.e.: to compensate) */}
      <span className="fixed-header-height"></span>

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route exact path={'/product/:id'} element={<Product />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/user'} element={<User />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />

        <Route path={'*'} element={<div>Not found!</div>} /> {/* too lazy to style it.. */}
      </Routes>
    </div>
  )
}

export default App
