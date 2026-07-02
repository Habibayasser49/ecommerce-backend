const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"],
                }
            }
        ],

        totalPrice: {
            type: Number,
            required: true,
            min: [0, "Total price cannot be negative"],
        },

        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Order", orderSchema);