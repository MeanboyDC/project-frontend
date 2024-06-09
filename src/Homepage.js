import React from 'react'
import Nav from './components/navbar'
import Hero from './components/Hero'
import Books from './components/Books/books'
import Footer from './components/Footer/Footer'
const Homepage = () => {
  return (
    <div>
        <Nav/>
        <Hero/>
        <Books/>
        <Footer/>
    </div>
  )
} 

export default Homepage