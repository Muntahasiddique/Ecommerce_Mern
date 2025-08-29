import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        
        <div className="loginsignup-fields">
          {!isLogin && (
            <input 
              type="text" 
              name="name"
              placeholder='Your Name' 
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input 
            type="email" 
            name="email"
            placeholder='Email Address' 
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            name="password"
            placeholder='Password' 
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className='loginsignup-button'>
          {isLogin ? 'Login' : 'Continue'}
        </button>

        <p className="loginsignup-login">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>

        {!isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" id='agree' />
            <label htmlFor='agree'>
              By continuing, I agree to the terms of use & privacy policy
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginSignup