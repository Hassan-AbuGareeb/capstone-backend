const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    category: {
        type: [String],
        enum: ["Asian", "Bakery", "Beverages", "Breakfast", "Brunch", "Burgers", "Cafe", "Desserts", "Donuts", "Fast Food", "Grill", "Ice Cream", "Indian", "Italian", "Juices", "Middle Eastern", "Mexican", "Pastries", "Pizza", "Salads", "Sandwiches", "Seafood", "Smoothies", "Snacks", "Soups", "Traditional", "Vegan", "Vegetarian", "Wraps"],
    }})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category