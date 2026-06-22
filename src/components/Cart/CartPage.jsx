import React, { useMemo, useState, useContext, memo } from 'react'
import { toast } from 'react-toastify';

import './CartPage.css'
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext';

import remove from '../../assets/remove.png'
import { checkoutAPI } from '../../services/orderServices';


const CartPage = () => {

    const {cart, removeFromCart, updateCart, setCart} = useContext(CartContext)
    // const [subTotal, setSubTotal] = useState(0)
    const { user } = useContext(UserContext)

    const checkout = () => {
        const oldCart = [...cart]
        checkoutAPI().then(()=>{
            setCart([])
            toast.success("Order Placed Successfully!!!")
        }).catch(()=>{
            toast.error("Something Went Wrong!!!")
            setCart(oldCart)
        })
    }

    const subTotal = useMemo(()=>{
        let total = 0
        cart.forEach((item) => {
            total+=item.product.price*item.quantity;
        });
        return total
    },[cart])

  return (
    <section className="aligncenter cart_page">
        <div className="aligncenter user_info">
            <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user profile" />
            <div>
                <p className="user_name">Name: {user?.name} </p>
                <p className="user_email">Email: {user?.email} </p>
            </div>
        </div>

        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]} >
            <tbody>
                {cart.map(({product, quantity}) => 
                <tr key={product._id} >
                    <td> {product.title}</td>
                    <td> {product.price} </td>
                    <td className='aligncenter table_quantity_input' >
                        <QuantityInput quantity={quantity} stock={product.stock} setQuantity={updateCart} cartPage={true} productId={product._id} />
                    </td>
                    <td>${quantity*product.price}</td>
                    <td>
                        <img className='removeicon' src={remove} alt="remove icon" onClick={()=>removeFromCart(product._id)} />
                    </td>
                </tr>
                )}
            </tbody>
        </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${subTotal}</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart_bill_final' >
                    <td>Total</td>
                    <td>${(subTotal+5)}</td>
                </tr>
            </tbody>
        </table>

        <button className="search_button checkout_button" onClick={checkout} >Check Out</button>
    </section>
  )
}

export default memo(CartPage)