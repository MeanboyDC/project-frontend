import React, {useState, usestate} from 'react'
import './navbar.css'
import Login from './authcomponent/Login'
import Signup from './authcomponent/Signup'
import R from '../assets/R.png';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const navbar = () =>{
  
  const [login, setLogin] =  useState;
  const [register, setRegister] = useState

  return (
    <nav id='container'>
        <img src={R} alt='' className='logo'/>
        <ul>
            
            <li><LoginIcon className='text-black hover:text-black text-3xl' onClick={()=>setLogin(true)}/></li>
            <li className='text-6xl hover:text-black ' ><HowToRegIcon onClick={()=>setRegister(true)}/></li>
        </ul>
    {
        login && (<Login onClose={()=>setLogin(false)}/>)
    }
    {
        register && (<Signup onClose={()=>setRegister(false)}/>)
    }
    </nav>
  )
}

export default navbar