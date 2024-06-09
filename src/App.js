import React from 'react'
import {Routes, Route} from 'react-router-dom';
import ShowBook from './components/showbooks.js';
import DeleteBook from './components/deletebook.js';
import EditBook from './components/editbook.js';
import CreateBooks from './components/createbook.js';
import Home from './components/home.js';
import Login from './components/authcomponent/Login.js';
import Signup from './components/authcomponent/Signup.js';
import Homepage from './Homepage.js';
import PrivateRoute from './components/authcomponent/PrivateRoute.js';


function App () {
  return(
 <Routes>
  {/* Public Routes */}
  <Route path='/' element={<Homepage/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Signup/>}/>
 

  {/* Private route */}
  <Route element={<PrivateRoute/>}>
  <Route path='/home' element={<Home/>}/>
  <Route path='/book/create' element={<CreateBooks/>}/>
  <Route path='/book/details/:id' element={<ShowBook/>}/>
  <Route path='/book/edit/:id' element={<EditBook/>}/>
  <Route path='/book/delete/:id' element={<DeleteBook/>}/>
  </Route>

</Routes>
 )
 }

export default App