import {  createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
export const AuthProvider =({children})=>{
  const [user, setuser]= useState(null)
  const [loading,setloading]=useState(false)
  useEffect(()=>{
    const getAndSetUser =async()=>{
      try{
        const data =await getme()
        setuser(data.user)
      }
      catch(err){console.log(err) } finally{
        setloading(false)
      }
    }
    getAndSetUser() 
  },[])


  return(
    <AuthContext.Provider value={{user,setuser, loading, setloading}}>
      {children}
      </AuthContext.Provider>
  )
}