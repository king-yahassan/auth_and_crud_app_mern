const mongoose = require("mongoose") ;
const validator = require("validator")

const userSchema = new mongoose.Schema(
    {
        pseudo : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true,
            validate:{
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
        },
        password : {
            type : String,
            require : true
        }
    }
)
module.exports=mongoose.model('User',userSchema);
