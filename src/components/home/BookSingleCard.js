import React, { useState } from 'react'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {BiUserCircle, BiShow} from 'react-icons/bi'
import { MdOutlineDelete} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import BookModal from './BookModal'
import DeleteBook from '../deletebook'


const BookSingleCard = ({book}) => {


    const [showModal, setShowModal] = useState(false);
    const [deleteBook, setDeleteBook] = useState(false)

  return (
    <div key={book._id}
    className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
     <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
       {book.publishedYear}
     </h2>
     <h4 className='my-2 text-gray-500'>
       {book._id}
     </h4>
     <div className='flex justify-start items-center gap-x-2'>
     <PiBookOpenTextLight className='text-red-600 text-2xl'/>
     <h2 className='my-1'>{book.title}</h2>
     </div>
     <div className='flex justify-start items-center gap-x-2' >
     <BiUserCircle className='text-red-300 text-2xl'/>
     <h2 className='my-1'>{book.author}</h2>
     </div>
     <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>

        <BiShow className='text-3xl text-blue-300 hover:text-black cursor-pointer'
        onClick={()=>setShowModal(true)}/>

       <Link to={`/book/details/${book._id}`}>
       <BsInfoCircle className='text-2xl text-green-800 hover:text-black cursor-pointer'/>
       </Link>
       <Link to={`/book/edit/${book._id}`}>
       <AiOutlineEdit className='text-2xl text-yellow-300 hover:text-black cursor-pointer'/>
       </Link>
       
       <MdOutlineDelete className='text-2xl text-red-600 hover:text-black cursor-pointer'
       onClick={()=>setDeleteBook(book._id)}/>
       
     </div>
    {
        showModal && (<BookModal book={book} onClose={()=>setShowModal(false)}/>)
    }
   {
    deleteBook && (<DeleteBook book={book} onClose={()=>setDeleteBook(false)}/>)
   }
    </div>
  )
}

export default BookSingleCard