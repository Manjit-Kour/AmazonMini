const express=require('express');
const router=express.Router();

const {addProduct , deleteProduct, viewProduct}= require('../controller/productController');

router.post('/add',addProduct);
router.delete('/delete/:_id',deleteProduct);
router.get('/view',viewProduct);

module.exports=router;