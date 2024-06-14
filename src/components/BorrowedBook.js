import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const BorrowedBook = ({id}) => {

    const [borrowed, setBorrowed] = useState([])
    const token = localStorage.getItem('token');
    const headers = {
    Authorization: `Bearer ${token}`

  };


  useEffect(()=>{
    console.log(id, "id")
    //   toggleSelectBook()
      
  },[])

  const toggleSelectBook = (id) => {
    if(!id){
      return(
        <div>
          <p>Loading...</p>
        </div>
      )
     
    }
    axios.get(`http://localhost:3001/api/book/${id}`, {headers})
    .then((res)=>{
      console.log(res.data.data, "borrowed book")
      
     setBorrowed(res.data.data)
     
    })
    .catch((error)=>{
      toast.error('Error', error)
    })
    
  };

  return (
    <div>
        <p>Borrowed Book Component</p>
        <ToastContainer/>
    </div>
    
  )
}

export default BorrowedBook