import React, { useState } from 'react'

import { Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'


export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        return
      }
      
      setLoading(false)
      setError(null)
      //navigate to sign in page is not working

      navigate('/sign-in')
      

    } catch (error) {
      
      setLoading(false)
      setError(error.message)
      
    }


 
  }

  console.log(formData)
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='font-semibold text-center my-7 text-3xl'> Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col flex-grow gap-4'>
        <input type="text" placeholder="Username" className='border rounded-lg p-3' id='userName' onChange={handleChange}/>
        <input type="email" placeholder="Email" className='border rounded-lg p-3' id='email' onChange={handleChange}/>
        <input type="password" placeholder="Password" className='border rounded-lg p-3' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80'>{loading ? 'LOADING' :'SIGN UP'}</button>
        <OAuth />
      </form>
      <h2 className='text-center p-4 font-medium mt-3'> Have an account ?  <Link to = '/sign-in' >
        <span className='text-blue-700'> Sign In</span></Link></h2>

      {error && <h2 className='text-center p-4 font-medium mt-3 text-red-500'>{error}</h2>}
    </div>
  )
}

