const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

connectDB();

const seedData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();

        const category = await Category.create({ 
            name: "Clothes" 
        });

        await Product.create([
            {
                name: "Oversized Hoodie",
                description: "Comfortable oversized cotton hoodie",
                price: 650,
                category: category._id,
                countInStock: 25,
                image:"hoodie.jpg"
            },
            {
                name: "straight leg jeans",
                description: "Blue jeans with a relaxed straight leg fit",
                price: 765,
                category: category._id,
                countInStock: 40,
                image: "jeans.jpg"
            },
        ]);

        console.log("Sample data inserted successfully");

        mongoose.connection.close();

    } catch (error) {
        console.error(error);

        mongoose.connection.close();
    }
};

seedData();
