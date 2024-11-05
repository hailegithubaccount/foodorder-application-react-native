import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

// Import your local images
const burgerImage = require('../../assets/images/dd.png'); // Adjust the path as necessary
const pastaImage = require('../../assets/images/dd.png'); 
const aastaImage = require('../../assets/images/dd.png'); 
const bastaImage = require('../../assets/images/dd.png'); 
const castaImage = require('../../assets/images/dd.png'); 
const dastaImage = require('../../assets/images/dd.png'); 
const pizzaImage = require('../../assets/images/dd.png'); // New image
const saladImage = require('../../assets/images/dd.png'); // New image
const sushiImage = require('../../assets/images/dd.png'); // New image
const sandwichImage = require('../../assets/images/dd.png'); // New image
const tacoImage = require('../../assets/images/dd.png'); // New image

export default function FoodList() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch food items by name
    const fetchFoodByName = async (foodName) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://10.141.221.60:5000/api/foods/name/${foodName}`); // Adjust the URL as necessary
            setFoods(response.data);
        } catch (error) {
            setError('Error fetching food items');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Array of food names with their corresponding local images
    const foodItems = [
        { name: 'jjj', imageUrl: burgerImage },
        { name: 'Pasta', imageUrl: pastaImage },
        { name: 'Aasta', imageUrl: aastaImage },
        { name: 'Basta', imageUrl: bastaImage },
        { name: 'Casta', imageUrl: castaImage },
        { name: 'Dasta', imageUrl: dastaImage },
        { name: 'Pizza', imageUrl: pizzaImage }, // New image
        { name: 'Salad', imageUrl: saladImage }, // New image
        { name: 'Sushi', imageUrl: sushiImage }, // New image
        { name: 'Sandwich', imageUrl: sandwichImage }, // New image
        { name: 'Taco', imageUrl: tacoImage }, // New image
    ];

    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            <ScrollView horizontal>
                <View style={styles.imageContainer}>
                    {foodItems.map((food) => (
                        <TouchableOpacity key={food.name} onPress={() => fetchFoodByName(food.name)} style={styles.imageWrapper}>
                            <Image source={food.imageUrl} style={styles.image} />
                            <Text style={styles.imageText}>{food.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <FlatList
                data={foods}
                keyExtractor={(item) => item._id} // Assuming your Food model has an _id field
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                        <Text style={styles.stock}>{item.inStock ? 'In Stock' : 'Out of Stock'}</Text>
                    </View>
                )}
                numColumns={2} // Display items in 2 columns
                columnWrapperStyle={styles.columnWrapper} // Style for the columns
                contentContainerStyle={styles.listContainer} // Style for the FlatList
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow wrapping to new lines
        justifyContent: 'center', // Center the images
        marginVertical: 20,
    },
    imageWrapper: {
        alignItems: 'center', // Center the text below the image
        margin: 10, // Add space between items
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50, // Make the image circular
        marginBottom: 5,
    },
    imageText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderWidth:2,
        width:300,
        height:200,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Space between columns
    },
    listContainer: {
        paddingBottom: 20,
    },
    name: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: 'gray',
    },
    stock: {
        fontSize: 14,
        color: 'green',
    },
});
