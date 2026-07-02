const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Category name is required");
    }
    
    const category = await Category.create({
        name,
    });

    res.status(201).json(category);
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
        if (!category ) {
            res.status(404);
            throw new Error("Category not found");
        }
    res.json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    
    await category.deleteOne();
    res.json({
        message: "Category removed", 
        });
});
module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}