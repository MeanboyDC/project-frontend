import React, { useState } from 'react'
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const CreateBooks = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const geturl = process.env.REACT_APP_GET_BOOK

  const handleSaveBook = () => {
    if(!title || !author || !publishedYear){
      toast.error('Fill all details')
      return
    }

    const data = {
      title: title,
      author: author,
      publishedYear: publishedYear
    } 
    setLoading(true)

    axios.post(`${geturl}`, data)
    .then(()=>{
      setLoading(false)
      toast.success("Book Added Successfully")
      setTimeout(()=>{
        navigate('/admin')
      }, 3000)
      
    }).catch((error)=>{
      console.log(error)
      toast.error('Error', error)
      
    })
  }
  return ( 


    <div className='p-4'>
      <BackButton/>
    <h1 className='text-3xl my-4'>Create Book</h1>
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
    
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Title</label>
    <input type='text' value={title} required onChange={(e)=>setTitle(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />
    </div>
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Author</label>
    <input type='text' value={author} required onChange={(e)=>setAuthor(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />
    </div>
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Published Year</label>
    <input type='number' value={publishedYear} required onChange={(e)=>setPublishedYear(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />
    </div>
    <button className='p-2 bg-sky-300 m-8'
    onClick={handleSaveBook}>
      Save
    </button>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default CreateBooks