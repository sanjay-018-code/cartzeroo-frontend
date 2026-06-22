import React,{memo, useContext} from 'react'

import './ProductCard.css'
import iphone from '../../assets/iphone.jpg'
import star from '../../assets/white-star.png'
import basket from '../../assets/basket.png'
import { NavLink } from 'react-router-dom'
import CartContext from './../../contexts/CartContext';
import UserContext from '../../contexts/UserContext'


const ProductCard = ({product}) => {

    const {addToCart} = useContext(CartContext)
    const { user } = useContext(UserContext)
  return (
    <article className="product_card">
        <div className="product_image">
            <NavLink to={`/product/${product?._id}`}><img src={`http://localhost:5000/products/${product?.images[0]}`} alt="" /></NavLink>
        </div>
        <div className="product_details">
            <h3 className='prorduct_price' >${product?.price}</h3>
            <p className="product_title">{product?.title}</p>

            <footer className="aligncenter product_footer">
                <div className="aligncentre">
                    <p className='aligncenter product_rating' >
                        <img className='aligncenter' src={star} alt="star" />
                        {product?.reviews.rate}
                    </p>
                    <p className='aligncenter product_review_count' >
                        {product?.reviews.counts}
                    </p>
                </div>

                {product?.stock > 0 && user && <button className="aligncenter add_to_cart">
                    <img src={basket} onClick={()=>addToCart(product,1)} alt="basket" />
                </button>}
            </footer>
        </div>
    </article>
  )
}

export default memo(ProductCard)