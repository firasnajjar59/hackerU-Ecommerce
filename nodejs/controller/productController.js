const Products = require("../models/product")
const functionsFactory=require("./functionsFactory")


const createProduct =  functionsFactory.createDocumant(Products)
const getAllProducts =  functionsFactory.getAllDocumants(Products)
const deleteProduct =  functionsFactory.deleteDocumant(Products)
const getProductByID =  functionsFactory.getDocumantByID(Products)

  module.exports={createProduct,getAllProducts,deleteProduct,getProductByID}

 