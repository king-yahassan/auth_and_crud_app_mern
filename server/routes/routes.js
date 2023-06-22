const router = require("express").Router() ;
const auth = require("../controllers/auth");
const product = require("../controllers/product");

//Authentification
router.post("/signup", auth.signUP) ;
router.post("/signin", auth.signIn);

//crud Product
router.post("/newproduct",product.newProduct);
router.get('/products',product.getAllProducts);
router.get("/showproduct/:id" ,product.singleProductById)
router.put('/update/:id',product.updateProduct);
router.delete('removeproduct/:id',product.removeProduct);

module.exports = router