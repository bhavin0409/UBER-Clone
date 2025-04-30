import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password
    })

    console.log(captainData);
    
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-24 mt-2 mb-10' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2 '>What's our Captain's email</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 mb-7 w-full text-lg placeholder:text-sm'
            placeholder='email@example.com'
            required />

          <h3 className='text-xl mb-2'>Enter your password</h3>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2  border border-gray-300 mb-8 w-full text-lg placeholder:text-sm'
            placeholder='password'
            required />

          <button className='bg-[#111] mb-2 text-white font-semibold rounded px-4 py-2 w-full text-lg'>Login</button>
        </form>

          <p className='text-center text-gray-600 mb-5'>
            Want to join a fleet? <Link to='/captain-signup' className='text-blue-600'>Create new Account</Link>
          </p>
      </div>
      <div>
      <Link to='/login' className=' flex items-center justify-center bg-[#d5622d] text-white font-semibold rounded px-4 py-2 w-full text-lg'>Sign in as User</Link>
       
      </div>
    </div>
  )
}

export default CaptainLogin