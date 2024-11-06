import express from 'express';
import Food from '../models/food.js'; // Import the Food model
import Order from '../models/order.js'; // Import the Order model

const router = express.Router();

// POST route to handle new orders (inserting only name, image, and price)
router.post('/orders', async (req, res) => {
    try {
        const { foodItemId } = req.body;  // foodItemId should be an ObjectId from the Food collection

        // Find the food item by its ID
        const food = await Food.findById(foodItemId);

        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Create a new order document with only name, image, and price
        const newOrder = new Order({
            foodItem: {
                food: food._id,  // Reference to the food item
                name: food.name,  // Store the food name
                imageUrl: food.imageUrl, // Store the food image URL
                price: food.price // Store the price
            }
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Send back the saved order as the response
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
