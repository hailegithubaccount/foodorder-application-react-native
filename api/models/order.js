import mongoose from 'mongoose';

// Order schema
const orderSchema = new mongoose.Schema({
    foodItem: {
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        name: { type: String, required: true },  // Store the food name
        imageUrl: { type: String, required: true }, // Store the food image URL
        price: { type: Number, required: true }  // Store the food price
    },
    orderStatus: {
        type: String,
        default: 'Pending', // Default status can be "Pending"
    },
    orderDate: {
        type: Date,
        default: Date.now, // Automatically set the current date when the order is created
    }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
