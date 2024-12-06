const mongoose = require("mongoose")


function Dbconnect() {
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("db is connected");
        
    }).catch((err)=>{
        console.log("something went wrong");
    })
}


module.exports = Dbconnect      