import React, {useState} from 'react'
import './navbar.css'
import Login from './authcomponent/Login'
import Signup from './authcomponent/Signup'
import R from '../assets/R.png';

import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const navbar = () =>{
  
  const [login, setLogin] =  useState(false);
  const [register, setRegister] = useState(false)

  return (
    <nav id='container'>
        <img src={R} alt='' className='logo'/>
        <ul className='justify-center items-center'>
            
            <li><LoginIcon className='hover:text-black text-6xl' onClick={()=>setLogin(true)}/></li>
            <li className='text-6xl hover:text-black \' ><HowToRegIcon onClick={()=>setRegister(true)}/></li>
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