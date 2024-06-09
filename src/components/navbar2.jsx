import React from 'react'
import './navbar.css'

import R from '../assets/R.png';
import { Link } from 'react-router-dom';
const navbar = () => {
  return (
    <nav id='container'>
        <img src={R} alt='' className='logo'/>
        
    </nav>
  )
}

export default navbar