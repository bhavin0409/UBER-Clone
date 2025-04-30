import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email: email,
      password: password
    })

    console.log(userData);

    setFirstName('')
    setLastName('')
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
          <h3 className='text-xl mb-2 '>What's your name</h3>
          <div className='flex gap-4 mb-5'>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-1/2 text-lg placeholder:text-sm'
            placeholder='First Name'
            required />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-1/2 text-lg placeholder:text-sm'
            placeholder='Last Name'
            required />

          </div>

          <h3 className='text-xl mb-2 '>What's your email</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 mb-5 w-full text-lg placeholder:text-sm'
            placeholder='email@example.com'
            required />

          <h3 className='text-xl mb-2'>Enter your password</h3>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] rounded px-4 py-2  border border-gray-300 mb-5 w-full text-lg placeholder:text-sm'
            placeholder='password'
            required />

          <button className='bg-[#111] mb-2 text-white font-semibold rounded px-4 py-2 w-full text-lg'>Login</button>
        </form>

        <p className='text-center text-gray-600 mb-3'>
          Already have an account? <Link to='/login' className='text-blue-600'>Login Here</Link>
        </p>
      </div>
      <div>
        <p className='text-xs leading-tight'> By Processing, your consent to got call , Whatapp and SMS message, including by automated means, from Uber and its affiliates to number provided. </p>
      </div>
    </div>
  )
}

export default UserSignup