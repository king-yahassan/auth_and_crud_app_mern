const Product = require("../models/product.model")

//new product
module.exports.newProduct = async(req,res)=>{
    const {name, price, imagePath} = req.body;
    const newProduct=await Product.create({name,price,imagePath});
    res.status(201).json({message : "New product created with successfully!", newProduct})
}

//All products
module.exports.getAllProducts =async (req,res) =>{
    const allProducts= await Product.find()
    !allProducts ? "No Products Found!" :
    res.status(200).json({ message:"Successfully fetched the data",allProducts});
}

//Single product by id
module.exports.singleProductById =  async (req , res ) => {
    const singleProduct = await Product.findById(req.params.id);
    //if no such user exists in db then send error response
    !singleProduct ?  "Product Not found":
    res.status(200).json({message:'successfully found a product!',singleProduct})
}
//Update product
module.exports.updateProduct =   async (req,res)=>{
    const updatedProduct = await Product.findOneAndUpdate(
        {_id : req.params.id},
        {
            $set:{
            name:req.body.name,
            price:req.body.price,
            imagePath:req.body.imagePath,
        }
    },
        //{ new : true } //or used :
    );

    if(!updatedProduct){
        return res.send('product not found');
    };
    //returning the new data to client side for display in UI we need only id and other details are irrelevant so sending just required fields
    const newProductUpdate= {
    _id: updatedProduct._id ,
    name : updatedProduct.name,
    price : updatedProduct.price,
    imagePath : updatedProduct.imagePath,
    };
    res.status(200).json({message :" Successfully update product", newProductUpdate   });
}

// Delete a single product from database by its ID
module.exports.removeProduct = (req,res) => {
        Product.remove({_id : req.params.id});
    res.status(204).json("Successfully delete")
} 