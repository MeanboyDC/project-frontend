import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import Spinner from './elements/Spinner'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import { Link, Navigate } from 'react-router-dom'
import BooksCard from './home/Bookscard'
import BooksTable from './home/BooksTable'
import Footer from './Footer/Footer';
import Navbar2 from './navbar2'
import './navbar.css'
import BorrowedBook from './home/BorrowedBook'

import R from '../assets/R.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')
    // const [showCard, setShowCard] = useState('card')
    const token = localStorage.getItem('token')
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
        <ExitToAppIcon className='text-blue-500 text-8xl'/>
        </Link>

        </div>
    </nav>
        <br></br>
        <br></br>
        <br></br>
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 '>BOOK LIST</h1>
       
        
    </div>
    {
        loading ? <Spinner/>: showType === "table" ? (<BooksTable books={books}/>) : (<BooksCard books={books}/>)           
    }




   
   



    
    <div className=' fixed bottom-0 w-full'>
        <Footer/>
    </div>

    </div>
    
  )
}

export default Home