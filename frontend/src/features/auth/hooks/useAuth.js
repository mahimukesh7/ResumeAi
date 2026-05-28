/* eslint-disable no-unused-vars */
 import { useContext} from "react";
 import { AuthContext } from "../auth.context";
 import { login,logout,register,getme } from "../services/auth.api";

 export const useAuth =()=>{
  const context = useContext(AuthContext)
  const {user, setuser, loading, setloading}=context

  const handlelogin = async({email, password})=>{
    setloading(true)
    try{
    const data= await login ({email, password})
    setuser(data.user)
    }catch(err){
        console.log("Login failed",err.response?.data?.message)
    }finally {
    setloading(false) 
    }
  }
  
  const handleregister = async ({username, email, password })=>{
    setloading(true)
    try{
    const data= await register({username, email, password })
    setuser(data.user)//backend user data set
    }catch(err){
      console.log(err)
    }

  }
  const handlelogout = async ()=>{
    setloading(true)
    try{
    const data = await logout ()
    setuser (null)
    }catch(err){
      console.log(err)
    }finally{
    setloading(false)
    }
  }
  return{user, loading, handlelogin, handlelogout, handleregister}
 }

