import express from 'express';
import Food from '../models/food.js'; // Import your Food model

const router = express.Router();

// Route to get food items by name
router.get('/foods/name/:name', async (req, res) => {
    const { name } = req.params; // Extract name from request parameters
    try {
        const foods = await Food.find({ name: new RegExp(name, 'i') }); // Fetch food items that match the name (case-insensitive)
        
        if (foods.length === 0) {
            return res.status(404).json({ message: 'No food items found with that name' });
        }
        
        res.status(200).json(foods); // Send the found food items as a response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food items', error });
    }
});

export default router;
