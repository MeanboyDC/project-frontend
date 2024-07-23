import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const BooksTable = ({ books }) => {
  const [booksData, setBooksData] = useState(books);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [br, setBr] = useState([])
  const [loading, setLoading] = useState(false)
  const surl = process.env.REACT_APP_SELECT_URL;
  

  const headers = {
    Authorization: `Bearer ${token}`
}
  
  

  const bookchecked = (book) => {
    setBr(prevState =>{

      if (prevState.includes(book._id)) {
        // If already checked, remove it from state
        return prevState.filter(id => id !== book._id);
      } else {
        // If not checked, add the book id to state
        return [...prevState, book._id]
      }
    });
    

  }
  useEffect(()=>{

    
  }, [br])

  

  const setDeleteBook = (id) => {
    axios
      .delete(`${surl}/select/${id}`, {headers} )
      .then(() => {
        toast.success('Deleted Successfully');
        // Remove the deleted book from the state
        setBooksData((prevBooks) => prevBooks.filter((book) => book._id !== id));
        setLoading(false)
        setTimeout(()=>{
          navigate('')
        }, )
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
            <th className='border border-slate-600 rounded-md'>Title</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Published Year</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>            
          </tr>
        </thead>
        <tbody>
          {booksData.map((data, index) => (data.books.map((book, bookIndex) => (
            <tr key={book._id} className='h-8'>
              
              <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishedYear}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4 item-center'>
                  
                  <KeyboardReturnIcon
                  className='text-2xl text-red-600 hover:text-black cursor-pointer'
                   onClick={() => setDeleteBook(book._id)}
                   
                  />
                  <p className=' hover:text-red-500'>Return Book</p>
                  
                </div>
              </td>
              </tr>
          ))))}
        </tbody>
      </table>
      
      <ToastContainer />
      <br />
    
    </div>
  );
};

export default BooksTable;
