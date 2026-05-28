
 require("dotenv").config()
const dns = require("dns"); dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app"); 
const connecToDB = require("./config/database")
connecToDB()

 


app.listen(5000, ()=>{
  console.log("server is running on port 3000");
})