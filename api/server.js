import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import foodRoutes from './routes/insertfood.js'; 
import fetchRoutes from './routes/fetchfood.js';// Adjust the path as necessary

const app = express(); // Initialize the Express application

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 5000; // Define the port for the server

// Use the routes defined in insertfood.js
app.use('/api', foodRoutes);
app.use('/api', fetchRoutes);

// MongoDB connection string
const mongoURI = "mongodb+srv://order:order@cluster0.1txir.mongodb.net/"; // Replace with your actual database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
   
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
