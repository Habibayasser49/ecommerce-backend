const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const existingProduct = await Product.findById(productId);

if (!existingProduct) {
    res.status(404);
    throw new Error("Product not found");
}

let cart = await Cart.findOne();

if (!cart) {
    cart = await Cart.create({
        items: [],
    });
}

const item = cart.items.find(
    (item) => item.product.toString() === productId
);

if (item) {
    item.quantity += quantity;
} else {
    cart.items.push({
        product: productId,
        quantity,
    });
}

await cart.save();
res.status(201).json(cart);
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne().populate("items.product");

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }
    res.json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne();

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const item = cart.items.find((item) =>
    item.product._id
        ? item.product._id.toString() === productId
        : item.product.toString() === productId
);

    if (!item) {
        res.status(404);
        throw new Error("Item not found in cart");
    }

    item.quantity = quantity;

    await cart.save();
    
    res.json(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne();

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);
});

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
};