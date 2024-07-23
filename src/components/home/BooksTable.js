import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const BooksTable = ({ books }) => {
  
  const [booksData, setBooksData] = useState(books);
  
  const [br, setBr] = useState([])
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const geturl = process.env.REACT_APP_GET_BOOK
  const surl = process.env.REACT_APP_SELECT_URL;
  
  
  
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
  
  const bookchecked = (book) => {
    setBr(prevState =>{

      // if the boook is already checked, remove it 
      if(prevState.some(b =>b._id === book._id)){

        return prevState.filter(b =>b._id !== book._id);
      }else{

        // if the book is not checked
        return[...prevState, book, ]
      }
    });
    

  }
  useEffect(()=>{
    
  }, [br])

  const selectBook = () => {
    
    
    
    
    axios
    .post(`${surl}/select`, br, { headers })
    .then(() => {
      toast.success('Selected Successfully');
      setTimeout(()=>{
        navigate('/books')
      }, 3000)
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
                <div className='flex justify-center gap-x-4 items-center'>
                  <Link to={`/book/details/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  
                  <div>
                  <FormGroup>
      <FormControlLabel control={<Checkbox  />} onChange={()=>{bookchecked(book)}} label="" />
        </FormGroup>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex flex-row w-full'>
      <Button onClick={selectBook} variant="contained" endIcon={<SendIcon />}>
        Borrow Books
      </Button>

      <div className='float-right '>
      <Link to='/books'>
      <Button   variant="outlined" startIcon={<MenuBookIcon />}>
        View Books
      </Button>
      </Link>
      </div>
      </div>
      
      <br></br>
      	
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
            
          </tr>
        </thead>
        <tbody>
          {br.map((bk, index) => (
            <tr key={bk._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{bk.title}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{bk.author}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{bk.publishedYear}</td>
              
            </tr>
          ))}
        </tbody>
      </table>



      <ToastContainer />
    </div>
  );
};

export default BooksTable;
