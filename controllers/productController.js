const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const createProduct = asyncHandler(async (req, res) => {
    const { 
        name,
        description, 
        price,
        category,
        countInStock,
        image 
        } = req.body;
        
        const product = await Product.create({
            name,
            description,
            price,
            category,
            countInStock,
            image
        });

    res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("category");
    
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};