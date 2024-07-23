import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



const BorrowedBook = ({ books }) => {
  
  const [booksData, setBooksData] = useState(books);
  
  const token = localStorage.getItem('token');
  const geturl = process.env.REACT_APP_GET_BOOK
  
  
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const setDeleteBook = (id) => {
    axios
      .delete(`${geturl}/${id}`)
      .then(() => {
        toast.success('Deleted Successfully');
        // Remove the deleted book from the state
        setBooksData((prevBooks) => prevBooks.filter((book) => book._id !== id));
      })
      .catch((error) => {
        toast.error('Error', error);
      });
  };
  


  
 
 
 

  return (
    <div>
      <table className='w-full border-separate border-spacing-'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Published Year</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {booksData.map((book, index) => (
            <tr key={book._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishedYear}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/book/details/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/book/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-400' />
                  </Link>
                  <MdOutlineDelete
                    className='text-2xl text-red-600 hover:text-black cursor-pointer'
                    onClick={() => setDeleteBook(book._id)}
                  />
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      



      <ToastContainer />
    </div>
  );
};

export default BorrowedBook;