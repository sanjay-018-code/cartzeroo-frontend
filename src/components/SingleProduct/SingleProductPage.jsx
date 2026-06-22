import React, { memo, useContext, useState } from 'react'
import useData from '../../hooks/useData';

import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import { useParams, useLocation } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';


const SingleProductPage = () => {
    const location = useLocation()

    const loc={from : location.pathname}
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const {id} = useParams()
    const {addToCart} = useContext(CartContext)
    const { user } = useContext(UserContext)

    const {data: product, error, isLoading} = useData(`/products/${id}`)
    
    return (
        <section className='aligncenter single_product' >
            {error && <em className='form-error' >{error.message}</em> }
            {product && <><div className="aligncenter">
                <div className="single_product_thumbnails">
                    {
                        product.images.map((image, index)=> <img src={`http://localhost:5000/products/${image}`} alt={product.title} className={selectedImage === index ? "selected_image" : ""} onClick={()=> setSelectedImage(index)} />)
                    }
                </div>
                <img src={`http://localhost:5000/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display' />
            </div>
            <div className="single_product_details">
                <h1 className="single_product_title">{product.title}</h1>
                <p className="single_product_description">{product.description}</p>
                <p className="single_product_price">${product.price.toFixed(2)}</p>
                
                <h2 className="quantity_title">Quantity</h2>
                <div className="aligncenter quantity_input">
                   <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                </div>
                
                <button className="search_button add_cart" onClick={()=> {addToCart(product, quantity, loc);
                }} >Add to Cart</button>
            </div></>}
        </section>
    )
}

export default memo(SingleProductPage)