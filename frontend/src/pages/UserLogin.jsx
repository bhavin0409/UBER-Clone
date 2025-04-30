import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      email: email,
      password: password
    })

    console.log(userData);
    
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mt-2 mb-10' src="src/assets/Uber-logo.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2 '>What's your email</h3>

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

          <p className='text-center text-gray-600 mb-3'>
            Don't have an account? <Link to='/signup' className='text-blue-600'>Create new Account</Link>
          </p>
      </div>
      <div>
      <Link to='/captain-login' className=' flex items-center justify-center bg-[#10b461] text-white font-semibold rounded px-4 py-2 w-full text-lg'>Sign in as captain</Link>
       
      </div>
    </div>
  )
}

export default UserLogin