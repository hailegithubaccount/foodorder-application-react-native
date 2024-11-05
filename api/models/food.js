// models/food.js
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});

const Food = mongoose.model('Food', foodSchema);

export default Food; // Make sure this is correct
