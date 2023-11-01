import React from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <div className='max-w-md mx-auto'>
    <h1 className='font-semibold text-center my-7 text-3xl'> Sign In</h1>
    <form className='flex flex-col flex-grow gap-4'>
      <input type="text" placeholder="Username" className='border rounded-lg p-3' id='username' />
      <input type="email" placeholder="Email" className='border rounded-lg p-3' id='email'/>
      <input type="password" placeholder="Password" className='border rounded-lg p-3' id='password'/>
      <button className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-95'>SIGN IN</button>
    </form>
    <h2 className='text-center p-4 font-medium mt-3'>  Dont have an account ?  <Link to = '/signup' >
      <span className='text-blue-700'> Sign Up</span></Link></h2>
  </div>
  )
}

export default SignIn