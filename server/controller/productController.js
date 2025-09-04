const Product = require('../models/Product');

const addProduct=async(req,res)=>{
    try{
        const productsData = Array.isArray(req.body) ? req.body : [req.body];

        const formatProduct= productsData.map(product=>({
            ImageUrl: product.ImageUrl,
            Title: product.Title,
            Description: product.Description ,
            Price: product.Price 
        }));
        const products= await Product.create(formatProduct);
        res.status(201).json(products);
    }
    catch(err){
        res.status(500).json({error: "Something went wrong"});
    }
}

const deleteProduct=async(req,res)=>{
    try{
        await Product.deleteOne({_id: req.params._id});
        res.status(201).json({message:"deleted successfully"});
    }
    catch(err){
        res.status(500).json({error: "Delete went wrong"});
    }
}

const viewProduct=async(req,res)=>{
    try{
        const productData=await Product.find();
        res.status(200).json(productData);
    }
    catch(err){
        res.status(500).json({error: "View went wrong"});
    }
}

module.exports={
    addProduct,
    deleteProduct,
    viewProduct
}
