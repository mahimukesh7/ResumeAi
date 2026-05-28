
const { default: mongoose } = require("mongoose")

async function connecToDB(){
  try{
  mongoose.connect(process.env.MONGO_URI)
  console.log("database connected")
  }
  catch(err){
    console.log(err);
  }
}
module.exports = connecToDB
