import React, { useState, useEffect } from 'react'
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useParams } from 'react-router-dom'

const EditBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const [Editedbook, setEditedBook] = useState ([])

  const navigate = useNavigate()
  const geturl = process.env.REACT_APP_GET_BOOK

  useEffect(()=>{
    setLoading(true)
    axios.get(`${geturl}/${id}`)
    .then((res)=>{
      setEditedBook(res.data)
     setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
      toast.error('Error', error)
    })
   
  })

  const handleEditBook = () => {
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

    axios.put(`${geturl}/${id}`, data)
    .then(()=>{
      setLoading(false)
      toast.success("Book Updated Successfully")
      setTimeout(()=>{
        navigate('/admin') 
      }, 2000)
       
    }).catch((error)=>{
      console.log(error)
      toast.error('Error', error)
      
    })
  }
  return ( 


    <div className='p-4'>
      <BackButton/>
    <h1 className='text-3xl my-4'>Edit Book</h1>
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
    
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Title</label>
    <input type='text' value={title} placeholder={Editedbook.title} onChange={(e)=>setTitle(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />
    </div>
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Author</label>
    <input type='text' value={author} placeholder={Editedbook.author} onChange={(e)=>setAuthor(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />  
    </div>
    <div className='my-4'>

    <label className='text-xl mr-4 text-gray-500'>Published Year</label>
    <input type='number' value={publishedYear} placeholder={Editedbook.publishedYear} onChange={(e)=>setPublishedYear(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
    />
    </div>
    <button className='p-2 bg-sky-300 m-8'
    onClick={handleEditBook}>
      Save
    </button>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default EditBook