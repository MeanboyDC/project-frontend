import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import Spinner from './elements/Spinner'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import { Link, Navigate } from 'react-router-dom'
import BooksCard from './home/Bookscard'
import UserTable from './home/UserTable'
import Footer from './Footer/Footer';
import Navbar2 from './navbar2'
import './navbar.css'
import { ToastContainer, toast } from 'react-toastify';

import R from '../assets/R.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BackButton from './elements/BackButton'
import { BiBookmarks } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')
    const [load, setLoad] = useState([])
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const surl = process.env.REACT_APP_SELECT_URL;

    

    useEffect(()=>{
        if(!token){
            toast.error('Authorization required')
            return;
        }
        const headers = {
            Authorization: `Bearer ${token}`
        }
        setLoading(true)
        Axios.get(`${surl}/select`, {headers})
        .then((res)=>{
            
            const booksArrays = res.data.data;
            let combinedArray = [];
            combinedArray = combinedArray.concat(booksArrays)
            
            
            
                        
            
            setBooks(combinedArray)

  
            
           
            
            
           
            
                    
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
        <BackButton/>
        
    </div>
    {
        loading ? <Spinner/>: showType === "table" ? (<UserTable books={books}/>) : (<BooksCard books={books}/>)           
    }
    <div className=' fixed bottom-0 w-full'>
        <Footer/>
    </div>

    </div>
    
  )
}

export default Home