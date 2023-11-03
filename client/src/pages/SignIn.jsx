import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInSstart, signInFailure, signInSuccess } from '../redux/user/userSlice'

function SignIn() {
    const [formData, setFormData] = useState({})
    const {loading, error} = useSelector(state => state.user)
  
    const navigate = useNavigate();
    const dispatch = useDispatch()
   

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          dispatch(signInSstart())
          const res = await fetch('/api/auth/signin', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(formData),
          })
          const data = await res.json()
          if(data.success === false){
            dispatch(signInFailure(data.message))
            return
          }
          dispatch(signInSuccess(data))
          //navigate to sign in page is not working
          
          navigate('/')
    
        } catch (error) {
          
          dispatch(signInFailure(error.message))
          
        }
     
      }
  
    return (
    <div className='max-w-md mx-auto'>
    <h1 className='font-semibold text-center my-7 text-3xl'> Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col flex-grow gap-4'>
      <input type="email" placeholder="Email" className='border rounded-lg p-3' id='email' onChange={handleChange}/>
      <input type="password" placeholder="Password" className='border rounded-lg p-3' id='password' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-95'>{ loading ? 'LOADING' : 'SIGN IN'}</button>
    </form>
    <h2 className='text-center p-4 font-medium mt-3'>  Dont have an account ?  <Link to = '/sign-up' >
      <span className='text-blue-700'> Sign Up</span></Link></h2>
      {error && <h2 className='text-center p-4 font-medium mt-3 text-red-500'>{error}</h2>}
     
  </div>
  )
}

export default SignIn