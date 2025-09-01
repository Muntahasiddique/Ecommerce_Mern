import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state,setstate] = useState("Login")
  const [formData , setformData] = useState({
    name:"",
    password:"",
    email:"",
  })

const ChangeHandler = (e) =>{
  setformData({
    ...formData,[e.target.name]:e.target.value
  })
}

  const login = async()=>{
console.log("Login fucn executed" ,formData )
console.log(" Signup fucn executed" ,formData )
    let responseData ;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body : JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }

  }
//signup
    const signup = async()=>{
    console.log(" Signup fucn executed" ,formData )
    let responseData ;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body : JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        
        <div className="loginsignup-fields">
          
            {state==="Signup"?<input 
              type="text" 
              name="name" value={formData.name} onChange={ChangeHandler}
              placeholder='Your Name' />:<></>}
       
          <input 
            type="email" 
            name="email"value={formData.email} onChange={ChangeHandler}
            placeholder='Email Address' 
        
          />
          <input 
            type="password" 
            name="password" value={formData.password} onChange={ChangeHandler}
            placeholder='Password' 
       
          />
        </div>

        <button className='loginsignup-button'  onClick={()=>{state === "Login" ?login():signup()}} >
          Continue
        </button>
            {
              state === "Signup" ? <p className="loginsignup-login">
         Already have an account? 
         <span onClick={()=>{setstate("Login")}} >Login here</span>
        </p> : <p className="loginsignup-login">
       Create an Account
         <span onClick={()=>{setstate("Signup")}} >Click here</span>
        </p>
            }
     
          <div className="loginsignup-agree">
            <input type="checkbox" id='agree' />
            <label htmlFor='agree'>
              By continuing, I agree to the terms of use & privacy policy
            </label>
          </div>
      
      </div>
    </div>
  )
}

export default LoginSignup