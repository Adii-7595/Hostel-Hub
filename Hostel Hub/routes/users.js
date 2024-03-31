// database setup
const mongoose=require("mongoose");

const plm = require("passport-local-mongoose");

// connect DataBase
mongoose.connect("mongodb+srv://patelshiv3123:68059931@cluster0.is5nucp.mongodb.net/authenticate?retryWrites=true&w=majority&appName=Cluster0");






// storage structure
const userSchema =  mongoose.Schema({

  name:String,

  username:{
    type : String,
    required : true,
    unique : true
  },

  password : String
  
});

userSchema.plugin(plm);

module.exports=mongoose.model("user",userSchema);
