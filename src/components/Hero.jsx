import React from 'react'
import '../components/Hero.css'
import bg from '../assets/Stockholm-Public-Library-Alamy.png'

const Hero = () => {
  return (
    <div className='hero'>
        <img src={bg} className='w-full min-w-24 bg-gradient-to-br bg-cover ease-linear opacity-100'/>

    </div>
  )
}

export default Hero