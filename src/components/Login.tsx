import React from 'react'
import '../App.css'


const Login = () => {
  return (
    <>
    <div className='base-color'>
      <p className='title-login position'>PAPER</p>
      <p className='position login-sentence'>この文章カチカチやね</p>
    <div className='position login-button-position'>
      <button type="submit" className='google_auth'>Google</button>
    </div>
    </div>
    </>
  )
}

export default Login