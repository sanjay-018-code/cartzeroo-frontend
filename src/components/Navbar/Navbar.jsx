import React, { useContext, useEffect, useState } from 'react'

import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithicon from './LinkWithicon'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import CartContext from './../../contexts/CartContext';
import { getSuggestionsAPI } from '../../services/productServices'

const Navbar = () => {
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(-1)

  const navigate = useNavigate()

  const { user } = useContext(UserContext)
  const {cart} = useContext(CartContext)

  const handleSubmit = (e)=> {
    e.preventDefault()
    if(search.trim() !== ""){
      navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([])
  }

  const handleKeyDown = (e) => {
    if(selectedItem<suggestions.length){
      if(e.key === "ArrowDown"){
        setSelectedItem(current=> current === suggestions.length -1 ? 0 : current+1)
      }else if(e.key === "ArrowUp"){
        setSelectedItem(current=> current === 0? suggestions.length -1 : current-1)
      }else if(e.key === "Enter" && selectedItem>-1){
        const suggestion = suggestions[selectedItem]
        navigate(`/products?search=${suggestion.title}`)
        setSearch("")
        setSuggestions([])
      }
    }else{
      setSelectedItem(-1)
    }
  }

  useEffect(()=>{
    const delaySuggestions = setTimeout(() => {
      if(search.trim()!==""){
        getSuggestionsAPI(search).then(res => setSuggestions(res.data)).catch(err=>console.log(err)
        )
      }else{
        setSuggestions([])
      }
    }, 300);

    return () => clearTimeout(delaySuggestions)
  },[search])


  return (
    <nav className='aligncenter navbar'>
        <div className="aligncenter" >
            <h1 className='aligncenter nav_heading' >Cartzeroo</h1>
            <form className='aligncenter nav_form' onSubmit={handleSubmit} >
                <input type=" text" className='nav_search' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                <button className='search_button' type=" submit">Search</button>
                {suggestions.length > 0 && <ul className="search_results">
                  {suggestions.map((suggestion, index)=> <li className={selectedItem === index ? "search_suggestion_link active":"search_suggestion_link"} key={suggestion._id} >
                    <Link to={`/products?search=${suggestion.title}`} onClick={()=>{setSearch("");setSuggestions([])}} >{suggestion.title}</Link>
                  </li>)}
                </ul>}
            </form>
        </div>
        <div  className='aligncenter nav_links'>
           <LinkWithicon title="Home"  link="/" emoji={rocket} />
           <LinkWithicon title="Products" link="/products" emoji={star} />
           {!user&&<><LinkWithicon title="LogIn" link="/login" emoji={idButton} />
           <LinkWithicon title="SignUp" link="/signup" emoji={memo} /></>}
           {user && <><LinkWithicon title="My Orders" link="/myorders" emoji={order} />
           <LinkWithicon title="Logout" link="/logout" emoji={lock} />
           <NavLink to="/cart" className='aligncenter'>Cart <p className='aligncenter cart_counts' >{cart.length}</p> </NavLink></>}
        </div>
    </nav>
  )
}

export default Navbar