const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Cart is empty");
    }

    let totalPrice = 0;

    cart.items.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
    });

    const order = await Order.create({
        items: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        })),
        totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("items.product");
    
    res.json(orders);
});

module.exports = {
    createOrder,
    getOrders,
};