import express from 'express';
import Order from '../models/order.js'; // Import the Order model

const router = express.Router();

// GET route to fetch all orders and populate the food details
router.get('/orders', async (req, res) => {
    try {
        // Fetch all orders and populate the food item details
        const orders = await Order.find()
            .populate('foodItem.food') // Populating the 'food' field inside foodItem
            .exec(); // Execute the query

        // Send the fetched orders as the response
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;
