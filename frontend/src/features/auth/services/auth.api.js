import axios from "axios"
const api = axios.create({
  baseURL:"http://localhost:5000",
  withCredentials:true
})

export async function register ({email,password,username}){
  try {
  const response=await api.post("/api/auth/register",{
    email,password,username
  })
  return response.data
}catch(err){
  console.log(err)
}

 
}
export async function login ({email,password}){
  try {
  const response=await api.post("/api/auth/login",{
    email,password
  })
 return  response.data
}catch(err){
  console.log(err.response?.data)
  throw err
}
}
export async function logout (){
  try {
  const response=await api.get("/api/auth/logout",{
   
  })
 return  response.data
}catch(err){
  console.log(err)
}
}
export async function getme (){
  try {
  const response=await api.get("/api/auth/getme",{
   
  })
 return response.data
}catch(err){
  console.log(err)
}
}

