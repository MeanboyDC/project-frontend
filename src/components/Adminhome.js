import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import Spinner from './elements/Spinner'

import {MdOutlineAddBox} from 'react-icons/md'
import { Link} from 'react-router-dom'
import BooksCard from './home/Bookscard'

import Footer from './Footer/Footer';

import './navbar.css'
import AdminTable from './home/AdminTable'

import R from '../assets/R.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'

const Adminhome = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')
    
    
    const navigate = useNavigate()
    const geturl = process.env.REACT_APP_GET_BOOK

    useEffect(()=>{
        setLoading(true)
        Axios.get(`${geturl}`)
        .then((res)=>{
            setBooks(res.data.data)
            
             setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    }, [])
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        setTimeout(()=>{
            navigate('/')
          }, 1000)
            }
  return (
    <div className='p-4'>
        <nav id='container'>
        <img src={R} alt='' className='logo'/>
        <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-blue-600 hover:bg-gray-600 px-4 py-1 rounded-lg'
        onClick={()=>setShowType('table')}
        >
            Table
        </button>
        <button className='bg-blue-600 hover:bg-gray-600 px-4 py-1 rounded-lg'
        onClick={()=>setShowType('card')}>
            Card
        </button>
        <Link onClick={handleLogout}>
        <ExitToAppIcon className='text-blue-300 text-8xl'/>
        </Link>

        </div>
    </nav>
        <br></br>
        <br></br>
        <br></br>
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 '>BOOK LIST</h1>
        <Link to='/book/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
        
    </div>
    {
        loading ? <Spinner/>: showType === "table" ? (<AdminTable books={books}/>) : (<BooksCard books={books}/>)           
    }




   
   



    
    <div className=' fixed bottom-0 w-full'>
        <Footer/>
    </div>

    </div>
    
  )
}

export default Adminhome