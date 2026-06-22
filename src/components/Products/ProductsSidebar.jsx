import React from 'react'
import { useState, useEffect } from 'react'

import './ProductsSidebar.css'
import LinkWithicon from '../Navbar/LinkWithicon'
import apiClient from '../../utils/api-client'
import useData from './../../hooks/useData';
import config from '../../config.json'

const ProductsSidebar = () => {
  const {data: categories ,error} =useData("/category")

  return (
    <aside className="products_sidebar">
        <h2>Category</h2>

        <div className="aligncenter category_links">
          {error && <em className='form_error'>{error}</em> }
          {categories && categories.map(category => 
            <LinkWithicon 
            id={category._id}
            key={category._id}
            title={category.name}
            link={`/products?category=${category.name}`} 
            emoji={`${config.backendUrl}/category/${category.image}`}
            sidebar = {true} 
            /> )}
        </div>
    </aside>
  )
}

export default ProductsSidebar