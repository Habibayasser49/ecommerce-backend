const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Price cannot be negative"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Count in stock cannot be negative"],
    },
    image: {
        type: String,
        default: "",
    },
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model("Product", productSchema);