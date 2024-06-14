import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import BorrowedBook from '../BorrowedBook';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BooksTable = ({ books }) => {
  const [booksData, setBooksData] = useState(books);
  const [borrowed, setBorrowed] = useState()
  const token = localStorage.getItem('token');
  
  // if (!token) {
  //   toast.error('Authorization required');
  //   return null;
  // }
  
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const setDeleteBook = (id) => {
    axios
      .delete(`http://localhost:3001/api/book/${id}`)
      .then(() => {
        toast.success('Deleted Successfully');
        // Remove the deleted book from the state
        setBooksData((prevBooks) => prevBooks.filter((book) => book._id !== id));
      })
      .catch((error) => {
        toast.error('Error', error);
      });
  };

  const selectBook = (id) => {
    
    // const selectedBooks = booksData.filter((book) => book.selected);
    // const selectedBooksData = selectedBooks.map(({ title, author, publishedYear }) => ({
    //   title,
    //   author,
    //   publishedYear
    // }));
    
    axios
      .get(`http://localhost:3001/api/book/${id}`, { headers })
      .then((res) => {
        
        setBorrowed(res.data)
        console.log(borrowed.title)
      })
      .catch((error) => {
        toast.error('Server error', error);
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
                  <input
                    type='checkbox'
                    checked={book.selected}
                    onChange={() => selectBook(book._id)}
                    className='text-4xl text-blue-600'
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={selectBook}>Borrow Books</button>
      
      <div className='flex justify-between items-center mt-10'>
        <h1 className='text-3xl my-8 '>BORROWED BOOK LIST</h1>
        
    </div>
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
        {/* <tbody>
          
            <tr  className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>1</td>
              <td className='border border-slate-700 rounded-md text-center'>{borrowed?.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{borrowed.author}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{borrowed.publishedYear}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/book/details/${borrowed._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/book/edit/${borrowed._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-400' />
                  </Link>
                  <MdOutlineDelete
                    className='text-2xl text-red-600 hover:text-black cursor-pointer'
                    onClick={() => setDeleteBook(borrowed._id)}
                  />
                
                </div>
              </td>
            </tr>
          
        </tbody> */}
      </table>



      <ToastContainer />
    </div>
  );
};

export default BooksTable;
