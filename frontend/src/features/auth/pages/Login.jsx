import React, { useState } from "react";
import{useNavigate,Link}from "react-router";
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth";

const Login = ()=>{
  const{loading, handlelogin}=useAuth()
  const navigate = useNavigate()
 const [email, setemail]=useState("")
 const [password, setpassword]=useState("")

   const handleSubmit=  async (e)=>{
   e.preventDefault()
   await handlelogin({email, password})
   navigate("/")
   }
   if(loading){
    return(
      <main>
        <h1>Loading...</h1>
      </main>
    )
   }
   

  return (
   <main>
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <div className="input-group">
          <label htmlFor="Email">Email</label>
          <input 
          onChange={(e)=>{setemail(e.target.value)}}
          
          type="email" id="email" name="email" placeholder="enter your email" />
        </div>
         <div className="input-group">
          <label htmlFor="Password">Password</label>
          <input
          onChange={(e)=>{setpassword(e.target.value)}}
          
          type="password" id="password" name="password" placeholder="enter your password" />
        </div>
        <button className="button primary-button">Login</button>
        <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
        
        
        


      </form>

    </div>
   </main>
  )
}
export default Login