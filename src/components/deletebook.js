import React, {useState} from 'react'
import BackButton from './elements/BackButton'
import Spinner from './elements/Spinner'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'


const DeleteBook = ({onClose}) => {

  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()
  const geturl = process.env.REACT_APP_GET_BOOK


  const handleDelete = () =>{
    setLoading(true)
    axios.delete(`${geturl}/${id}`)
    .then(()=>{
      setLoading(false)
      toast.success('Deleted Successfully')
      setTimeout(()=>{
        navigate('/admin')
      }, 2000)
    }).catch((error)=>{
      toast.error("Error", error)
      setLoading(false)
    })
  }

  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
    onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'>
      
      <BackButton/>
      
      <h1 className='text-3xl my-8 absolute items'>Delete Book</h1>
      {
        loading ? (
          <Spinner/>
        ): (
          <div  className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-full p-4 mx-auto my-10'>
            <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
            <button className='p-4 bg-red-600 text-white m-8 w-[500px] ' onClick={handleDelete}>Yes</button>
          </div>
        )
      }

      <ToastContainer/>
      </div>

    </div>
  )
}

export default DeleteBook