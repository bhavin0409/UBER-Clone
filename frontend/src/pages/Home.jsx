import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div> 
        <div className='bg-[url("src/assets/home-img.jpg")] bg-cover bg-center pt-8 h-screen flex justify-between flex-col'>
          <img className='w-20 mt-4 ml-9' src="src/assets/Uber-logo.png" alt="" />

          <div className='bg-white pb-7 py-6 px-4'>
              <h2 className='text-3xl font-bold '>Get Started With Uber</h2>
              <Link to='/login' className='flex items-center justify-center w-full text-white text-xl  bg-black py-3 rounded mt-8'>Continue</Link>
          </div>
        </div>
    </div>
  )
}

export default Home