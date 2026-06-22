import React, { useState, useEffect, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/Navbar/Navbar';
import Routing from './components/Routing/Routing';
import setAuthToken from './utils/setAuthToken';
import { getJWT } from './services/userServices';
import { addToCartAPI, getCartApi, increaseProductAPI, decreaseProductAPI, removeFromCartAPI } from './services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UserContext from './contexts/UserContext';
import CartContext from './contexts/CartContext';
import { Navigate, useNavigate } from 'react-router-dom';

setAuthToken(getJWT())


const App = () => {

  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const navigate = useNavigate();

  useEffect(()=> {
    if(user){
      getCart()
    }
  },[user])

  useEffect(()=>{
    try {
      const jwt = localStorage.getItem("token")
      const jwtUser = jwtDecode(jwt)
      if(Date.now()>= jwtUser.exp*1000){
        localStorage.removeItem("token")
        window.location.reload()
      }else{
        setUser(jwtUser);
      }
    } catch (error) {}
  },[])

  const addToCart = useCallback((product, quantity, loc) => {
    if(!getJWT()){
      navigate('/signup', { state: loc });
      console.log('redirecting to login with state:', loc);
      return;
    }

    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product && item.product._id === product._id)

    if(productIndex === -1){
      updatedCart.push({product, quantity})
    }else{
      updatedCart[productIndex].quantity += quantity
    }
    setCart(updatedCart)
    addToCartAPI(product._id, quantity).then(res => 
      {
        toast.success("Product Added to Cart Successfully!!")
      }
    ).catch(err => {
      toast.error("Failed to Add Product!")
      setCart(cart)
    })
  },[cart])


  const getCart = useCallback(() => {
    getCartApi().then(res => {
      setCart(res.data)
    }).catch(err => {
      toast.error("Something Went Wrong!!")
    })
  },[user])

  const removeFromCart = useCallback((id) => {
    const oldCart = [...cart]
    const newCart = oldCart.filter((item) => item.product._id !== id)
    setCart(newCart)

    removeFromCartAPI(id).catch(err=> {toast.error("Something Went Wrong!!!")
      setCart(oldCart)
    })
  },[cart])

  const updateCart = useCallback((type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex((item)=>item.product && item.product._id === id)
    if(type === "increase"){
        updatedCart[productIndex].quantity += 1
        setCart(updatedCart)
        increaseProductAPI(id).catch(err=>{
          toast.error("Someting Went Wrong!!!")
          setCart(oldCart)
        })
    }
    if(type === "decrease"){
        updatedCart[productIndex].quantity -= 1
        setCart(updatedCart)

        decreaseProductAPI(id).catch(err=>{
          toast.error("Someting Went Wrong!!!")
          setCart(oldCart)
        })
    }
  },[cart])

  return (
    <UserContext.Provider value={{ user, setUser }} >
      <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}} >
        <div className='app'>
          <Navbar />
          <main className='main_panel' >
            <ToastContainer position='bottom-right' />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App