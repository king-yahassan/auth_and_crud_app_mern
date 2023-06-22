const mongoose = require("mongoose") ;

const productSchema = new mongoose.Schema(
    {
        name: { 
            type : String ,
            require : true 
        },
        price:{
            type:Number,
            require:true
        },
        imagePath : {
            type : String , 
            require : true
        }
    },
    {
        timestamps:true
    }
)
module.exports= mongoose.model('Product',productSchema);