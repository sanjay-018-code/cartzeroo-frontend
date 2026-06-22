import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../Home/HomePage';
import ProductsPage from '../Products/ProductsPage';
import SingleProductPage from '../SingleProduct/SingleProductPage';
import CartPage from '../Cart/CartPage';
import MyOrderPage from '../MyOrder/MyOrderPage';
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Login/SignupPage';
import Logout from '../Login/Logout'
import ProtectedRoutes from './ProtectedRoutes';

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/products' element={<ProductsPage/>} />
        <Route path='/product/:id' element={<SingleProductPage  />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path='/cart' element={<CartPage />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/myorders' element={<MyOrderPage/>} />
        </Route>
    </Routes>
  )
}

export default Routing