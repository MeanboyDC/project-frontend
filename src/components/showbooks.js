import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
// import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import BackButton from './elements/BackButton'




const ShowBooks = () => {

    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
    const geturl = process.env.REACT_APP_GET_BOOK

    
        useEffect(()=>{
            setLoading(true)
            axios.get(`${geturl}/${id}`)
            .then((response)=>{
                setBook(response.data)
                setLoading(false)
            }) 
            .catch((error)=>{
                
                setLoading(false)
            })
        }, [])
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Show Book</h1>
        {
            loading ? (
                <Spinner/>
            ):(
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                {/* <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Id:</span>
                <span>
                {book._id}
                </span>
                </div> */}
                <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Title:</span>
                <span>
                {book.title}
                </span>
                </div>
                <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Author:</span>
                <span>
                {book.author}
                </span>
                </div>
                <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Published Year:</span>
                <span>
                {book.publishedYear}
                </span>
                </div>
                {/* <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Created:</span>
                <span>
                {new Date(book.createdAt).toString()}
                </span>
                </div>
                <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>
                    Updated:</span>
                <span>
                {new Date(book.updatedAt).toString()}
                
                </span>
               
                </div> */}
                
                </div>
            )
        }
    
    </div>
  )
}

export default ShowBooks